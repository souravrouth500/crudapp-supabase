export interface ResponseObj {
    error: null | string,
    data: StudentsResponse[],
    count: number | null,
    status: number | null,
    statusText: string | null,
}
export interface StudentsResponse {
    id: number,
    student_name: string,
    batch_name: string,
    course: string,
    submit_url: string,
    score: number,
    year: number,
    action: any
}