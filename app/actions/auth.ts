'use server';

import { createClient } from '@/app/lib/supabase-server';
import { redirect } from 'next/navigation';

export type AuthState = {
  error?: string;
};

export async function signUp(_prev: AuthState, formData: FormData): Promise<AuthState> {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const fullName = formData.get('fullName') as string;

  if (!email || !password || !fullName) {
    return { error: 'All fields are required.' };
  }

  if (password.length < 6) {
    return { error: 'Password must be at least 6 characters.' };
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: fullName },
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SUPABASE_URL ? 'https://verdantlabs.app' : 'http://localhost:3000'}/auth/callback`,
    },
  });

  if (error) {
    return { error: error.message };
  }

  redirect('/login?message=Check your email to confirm your account');
}

export async function signIn(_prev: AuthState, formData: FormData): Promise<AuthState> {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!email || !password) {
    return { error: 'Email and password are required.' };
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return { error: error.message };
  }

  redirect('/account');
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect('/');
}
