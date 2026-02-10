/**
 * React Query Hooks for Data Fetching
 * Centralized hooks for all API endpoints
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  Page,
  Opportunity,
  Partner,
  ContactSubmission,
  SiteSettings,
  SEOMetadata,
  PaginatedResponse,
  APIResponse,
  CreateOpportunityInput,
  CreatePageInput,
  CreateContactSubmissionInput,
} from '../types';
import {
  getRequest,
  postRequest,
  putRequest,
  deleteRequest,
} from './client';

// Query Keys for cache management
export const queryKeys = {
  // Pages
  pages: {
    all: ['pages'] as const,
    bySlug: (slug: string) => [...queryKeys.pages.all, 'bySlug', slug] as const,
    published: ['pages', 'published'] as const,
  },

  // Opportunities
  opportunities: {
    all: ['opportunities'] as const,
    bySlug: (slug: string) => [...queryKeys.opportunities.all, 'bySlug', slug] as const,
    featured: ['opportunities', 'featured'] as const,
    published: ['opportunities', 'published'] as const,
    bySector: (sector: string) => [...queryKeys.opportunities.all, 'sector', sector] as const,
  },

  // Partners
  partners: {
    all: ['partners'] as const,
    published: ['partners', 'published'] as const,
  },

  // Settings
  settings: {
    all: ['settings'] as const,
  },

  // SEO
  seo: {
    all: ['seo'] as const,
    bySlug: (slug: string) => [...queryKeys.seo.all, 'bySlug', slug] as const,
  },

  // Contact Submissions
  submissions: {
    all: ['submissions'] as const,
    byStatus: (status: string) => [...queryKeys.submissions.all, 'status', status] as const,
  },
};

// ============ PAGES QUERIES ============

export function usePage(slug: string) {
  return useQuery({
    queryKey: queryKeys.pages.bySlug(slug),
    queryFn: () => getRequest<APIResponse<Page>>(`/pages/${slug}`),
  });
}

export function usePages(published = true) {
  return useQuery({
    queryKey: published ? queryKeys.pages.published : queryKeys.pages.all,
    queryFn: () => getRequest<APIResponse<Page[]>>(`/pages?published=${published}`),
  });
}

// ============ OPPORTUNITIES QUERIES ============

export function useOpportunities(published = true) {
  return useQuery({
    queryKey: published ? queryKeys.opportunities.published : queryKeys.opportunities.all,
    queryFn: () => getRequest<PaginatedResponse<Opportunity>>(`/opportunities?published=${published}`),
  });
}

export function useFeaturedOpportunities() {
  return useQuery({
    queryKey: queryKeys.opportunities.featured,
    queryFn: () => getRequest<APIResponse<Opportunity[]>>('/opportunities/featured'),
  });
}

export function useOpportunityBySlug(slug: string) {
  return useQuery({
    queryKey: queryKeys.opportunities.bySlug(slug),
    queryFn: () => getRequest<APIResponse<Opportunity>>(`/opportunities/${slug}`),
  });
}

export function useOpportunitiesBySector(sector: string) {
  return useQuery({
    queryKey: queryKeys.opportunities.bySector(sector),
    queryFn: () => getRequest<PaginatedResponse<Opportunity>>(`/opportunities?sector=${sector}`),
  });
}

// ============ PARTNERS QUERIES ============

export function usePartners() {
  return useQuery({
    queryKey: queryKeys.partners.all,
    queryFn: () => getRequest<APIResponse<Partner[]>>('/partners'),
  });
}

// ============ SETTINGS QUERIES ============

export function useSiteSettings() {
  return useQuery({
    queryKey: queryKeys.settings.all,
    queryFn: () => getRequest<APIResponse<SiteSettings>>('/settings'),
    staleTime: 1000 * 60 * 60, // Cache for 1 hour
  });
}

// ============ SEO QUERIES ============

export function useSEOMetadata(slug: string) {
  return useQuery({
    queryKey: queryKeys.seo.bySlug(slug),
    queryFn: () => getRequest<APIResponse<SEOMetadata>>(`/seo/${slug}`),
    staleTime: 1000 * 60 * 60, // Cache for 1 hour
  });
}

// ============ CONTACT SUBMISSION MUTATIONS ============

export function useCreateContactSubmission() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateContactSubmissionInput) =>
      postRequest<APIResponse<ContactSubmission>>('/submissions', data),
    onSuccess: () => {
      // Invalidate submissions cache
      queryClient.invalidateQueries({ queryKey: queryKeys.submissions.all });
    },
  });
}

// ============ ADMIN MUTATIONS ============

export function useCreateOpportunity() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateOpportunityInput) =>
      postRequest<APIResponse<Opportunity>>('/admin/opportunities', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.opportunities.all });
    },
  });
}

export function useUpdateOpportunity(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<CreateOpportunityInput>) =>
      putRequest<APIResponse<Opportunity>>(`/admin/opportunities/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.opportunities.all });
    },
  });
}

export function useDeleteOpportunity(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteRequest<APIResponse<void>>(`/admin/opportunities/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.opportunities.all });
    },
  });
}

export function useCreatePage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreatePageInput) =>
      postRequest<APIResponse<Page>>('/admin/pages', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.pages.all });
    },
  });
}

export function useUpdatePage(slug: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<CreatePageInput>) =>
      putRequest<APIResponse<Page>>(`/admin/pages/${slug}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.pages.all });
    },
  });
}

export function useDeletePage(slug: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteRequest<APIResponse<void>>(`/admin/pages/${slug}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.pages.all });
    },
  });
}
