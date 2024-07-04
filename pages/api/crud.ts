import { createClient } from "@/supabase/client"

export const supabase = createClient()

export const fetchStudents = async () => {
    const supabase = createClient()

    
return await supabase
.from('students')
.select('*')

}

// export const fetchStudents = async () => {
//     try {
//         const res = await supabase.from('students').select("*")
//         console.log(res);
        
//         return res
//     } catch (error) {
//         console.log(error)
        
//         return error
//     }
// }

export const addStudent = async (payload: any) => {
    const supabase = createClient()

    return await supabase.from('students').insert(payload).select()
}

export const getStudentDetails = async (payload: any) => {
    console.log(payload);
    
    const supabase = createClient()

    return await supabase.from('students').select('*').eq('id', payload?.queryKey[1])
}

export const updateStudent = async (payload: any) => {
    const supabase = createClient()
    console.log(payload);
    return await supabase.from('students').update({student_name: payload.name, batch_name: payload.batch, submit_url: payload.url, score: payload.score}).eq('id', payload?.id)
}

export const removeStudent = async (payload: any) => {
    console.log(payload);
    
    const supabase = createClient()

    return await supabase.from('students').delete().eq('id', payload)
}

export const getBatchWiseData = async (payload: any) => {
    const supabase = createClient()

    return await supabase.from('students').select('*').eq('batch_name', payload?.queryKey[1])
}

export const getCourseData = async (payload: any) => {
    const supabase = createClient()

    return await supabase.from('students').select('*').eq('course', payload?.queryKey[1])
}