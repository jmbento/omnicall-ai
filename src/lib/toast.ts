
import { toast } from 'sonner';

/**
 * OmniCall AI Notification Engine
 * High-performance semantic notifications for SaaS feedback.
 */
export const notify = {
  success: (message: string, description?: string) => 
    toast.success(message, { description }),
    
  error: (message: string, description?: string) => 
    toast.error(message, { description }),
    
  info: (message: string, description?: string) => 
    toast.info(message, { description }),
    
  loading: (message: string) => 
    toast.loading(message),

  custom: (message: string, options: any) => 
    toast(message, options),

  dismiss: () => toast.dismiss()
};
