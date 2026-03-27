'use server';

import { z } from 'zod';
import { supabase } from '@/app/lib/supabase';

const registrationSchema = z.object({
  fullName: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name is too long'),
  email: z.string().email('Please enter a valid email address'),
  interestTier: z.enum(['foundation', 'canopy', 'elite'], {
    error: 'Please select a product tier',
  }),
  plantCount: z.enum(['1-5', '6-20', '20+', '']).optional(),
  referralSource: z
    .enum(['social', 'friend', 'search', 'other', ''])
    .optional(),
});

export type RegisterState = {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
};

export async function registerEarlyAccess(
  prevState: RegisterState,
  formData: FormData
): Promise<RegisterState> {
  const raw = {
    fullName: formData.get('fullName'),
    email: formData.get('email'),
    interestTier: formData.get('interestTier'),
    plantCount: formData.get('plantCount') || '',
    referralSource: formData.get('referralSource') || '',
  };

  const validated = registrationSchema.safeParse(raw);

  if (!validated.success) {
    return {
      success: false,
      message: 'Please fix the errors below.',
      errors: validated.error.flatten().fieldErrors,
    };
  }

  const { fullName, email, interestTier, plantCount, referralSource } =
    validated.data;

  try {
    const { error } = await supabase.from('registrations').upsert(
      {
        email,
        full_name: fullName,
        interest_tier: interestTier,
        plant_count: plantCount || null,
        referral_source: referralSource || null,
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'email' }
    );

    if (error) {
      console.error('Supabase insert error:', error.message);
      return {
        success: false,
        message: 'Something went wrong. Please try again.',
      };
    }

    return {
      success: true,
      message: "You're in! We'll reach out when Canopy AI is ready.",
    };
  } catch {
    return {
      success: false,
      message: 'Something went wrong. Please try again.',
    };
  }
}
