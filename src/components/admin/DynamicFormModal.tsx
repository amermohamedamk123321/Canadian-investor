/**
 * DynamicFormModal Component
 * Reusable modal form for CRUD operations on dynamic content
 */

import { ReactNode } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Loader2 } from 'lucide-react';

export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'number' | 'textarea' | 'select' | 'custom';
  placeholder?: string;
  required?: boolean;
  options?: Array<{ value: string; label: string }>;
  value?: string | number;
  onChange?: (value: string | number) => void;
  custom?: ReactNode;
}

interface DynamicFormModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  fields: FormField[];
  onSubmit: (formData: Record<string, any>) => Promise<void> | void;
  isLoading?: boolean;
  submitLabel?: string;
}

export function DynamicFormModal({
  isOpen,
  onOpenChange,
  title,
  fields,
  onSubmit,
  isLoading = false,
  submitLabel = 'Save',
}: DynamicFormModalProps) {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData: Record<string, any> = {};
    const formElement = e.currentTarget;
    const formElements = formElement.elements as HTMLFormControlsCollection;

    Array.from(formElements).forEach((element: Element) => {
      const input = element as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
      if (input.name) {
        formData[input.name] = input.value;
      }
    });

    try {
      await onSubmit(formData);
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          {fields.map((field) => (
            <div key={field.name}>
              <label className="text-sm font-medium block mb-1">{field.label}</label>
              {field.type === 'custom' ? (
                field.custom
              ) : field.type === 'select' ? (
                <Select
                  value={field.value?.toString() || ''}
                  onValueChange={(value) => field.onChange?.(value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                  <SelectContent>
                    {field.options?.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : field.type === 'textarea' ? (
                <Textarea
                  name={field.name}
                  placeholder={field.placeholder}
                  required={field.required}
                  defaultValue={field.value}
                  rows={4}
                  className="resize-none"
                />
              ) : (
                <Input
                  name={field.name}
                  type={field.type}
                  placeholder={field.placeholder}
                  required={field.required}
                  defaultValue={field.value}
                />
              )}
            </div>
          ))}
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? <Loader2 className="animate-spin mr-2" size={16} /> : null}
            {submitLabel}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
