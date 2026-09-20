export interface LeadSubmission {
  id?: string | number;
  fullName: string;
  whatsapp: string;
  email?: string;
  brandName: string;
  productType?: string;
  productScale: string;
  notes?: string;
  createdAt?: string;
}

export interface SubmissionResponse {
  success: boolean;
  message: string;
  id?: string | number;
  provider?: string;
  whatsappUrl?: string;
}
