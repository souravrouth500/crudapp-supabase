
import { redirect } from 'next/navigation'

import { createClient } from '@/supabase/client'


export const Login = async (payload: any) => {
  const supabase = createClient()
  return await supabase.auth.signInWithPassword(payload)

  // if(data.user !== null) return data;
  // if(error !== null) return error
}

export const Register = async (payload: any) => {
  const supabase = createClient()

  const options = {
    email: payload.email,
    password: payload.password,
    options: {
      data: {
        name: payload.name,
        age: payload.age,
        course: payload.course,
        year: payload.year
      }
    }
  }
  return await supabase.auth.signUp(options)

  // if(data.user !== null) return data;
  // if(error !== null) return error
}