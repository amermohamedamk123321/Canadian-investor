/**
 * FileUploadField Component
 * Drag-drop and file picker for uploading attachments
 */

import { useState } from 'react';
import { Button } from '../ui/button';
import { Upload, X, Loader2 } from 'lucide-react';
import { useToast } from '../../hooks/use-toast';

interface FileUploadFieldProps {
  onFileUpload: (files: File[]) => Promise<void>;
  multiple?: boolean;
  acceptedTypes?: string;
}

export function FileUploadField({
  onFileUpload,
  multiple = true,
  acceptedTypes = '.pdf,.doc,.docx,.xls,.xlsx',
}: FileUploadFieldProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const { toast } = useToast();

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    if (!multiple && files.length > 1) {
      toast({ title: 'Error', description: 'Only one file allowed', variant: 'destructive' });
      return;
    }

    try {
      setIsUploading(true);
      await onFileUpload(files);
      setUploadedFiles((prev) => (multiple ? [...prev, ...files] : files));
      toast({ title: 'Files uploaded successfully' });
    } catch (error: any) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!multiple && files.length > 1) {
      toast({ title: 'Error', description: 'Only one file allowed', variant: 'destructive' });
      return;
    }

    try {
      setIsUploading(true);
      await onFileUpload(files);
      setUploadedFiles((prev) => (multiple ? [...prev, ...files] : files));
      toast({ title: 'Files uploaded successfully' });
    } catch (error: any) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } finally {
      setIsUploading(false);
    }
  };

  const removeFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-3">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition ${
          isDragging
            ? 'border-primary bg-primary/5'
            : 'border-muted-foreground/25 hover:border-primary/50'
        }`}
      >
        <Upload className="mx-auto mb-2 text-muted-foreground" size={24} />
        <p className="font-medium">Drag and drop files here</p>
        <p className="text-sm text-muted-foreground">or click to select</p>

        <input
          type="file"
          multiple={multiple}
          accept={acceptedTypes}
          onChange={handleFileInputChange}
          className="hidden"
          id="file-upload"
          disabled={isUploading}
        />
        <label htmlFor="file-upload">
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="mt-2"
            disabled={isUploading}
            asChild
          >
            <span>
              {isUploading ? <Loader2 className="animate-spin mr-2" size={16} /> : null}
              Select Files
            </span>
          </Button>
        </label>
      </div>

      {uploadedFiles.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-medium">Uploaded files ({uploadedFiles.length})</p>
          {uploadedFiles.map((file, index) => (
            <div key={index} className="flex items-center justify-between p-2 bg-muted rounded">
              <span className="text-sm truncate">{file.name}</span>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removeFile(index)}
              >
                <X size={16} />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
