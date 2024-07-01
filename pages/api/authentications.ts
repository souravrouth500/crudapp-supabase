
import { redirect } from 'next/navigation'

import { createClient } from '@/supabase/client'

export async function login(formData: any) {
  const supabase = createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.email as string,
    password: formData.password as string,
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  console.log(error);
  

  // if (error) {
  //   redirect('/error')
  // }

}

export async function signup(formData: any) {
  const supabase = createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  // const data = {
  //   email: formData.get('email') as string,
  //   password: formData.get('password') as string,
  // }

  const data = {
    email: formData.email as string,
    password: formData.password as string,
  }

  const { error } = await supabase.auth.signUp(data)

  console.log(error);
  // if (error) {
  //   redirect('/error')
  // }

}