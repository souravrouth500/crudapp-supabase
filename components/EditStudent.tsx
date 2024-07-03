'use client'
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Link from 'next/link'
import { useForm } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { addStudent, getStudentDetails, updateStudent } from '@/pages/api/crud';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

const defaultTheme = createTheme();

function EditStudent({id, status}: any) {

    const router = useRouter()
    const queryClient = useQueryClient()
    // console.log(id);
    
    const { register, handleSubmit, formState: { errors }, setValue } = useForm({
        defaultValues: {
            name: '',
            batch: '',
            url: '',
            score: ''
        }
    })

    const {data: singleUser} = useQuery({
        queryKey: ['fetchSingleStudent', id],
        queryFn: (id) => getStudentDetails(id)
    })

    const {mutate, data: updateStudentDetail} = useMutation({
        mutationFn: (payload) => updateStudent(payload),
        onSuccess: (res) => {
            if (res?.status === 204) {
                queryClient.invalidateQueries({
                    queryKey: ['fetchAllStudents']
                  })
                toast.success("student data updated successfully");
                (() => {
                    router.push('/')
                })()
                console.log(res);

            } else {
                toast.error(res?.error?.message)
            }
        }
    })

    const onSubmit = (data: any) => {
        const userData = {...data, id: id}
        mutate(userData)
    }
    console.log('id',id);
    console.log(updateStudentDetail);
    React.useEffect(() => {
        if(singleUser?.data){
            console.log(singleUser.data);
            
            setValue('name', singleUser?.data[0]?.student_name)
            setValue('batch', singleUser?.data[0]?.batch_name)
            setValue('url', singleUser?.data[0]?.submit_url)
            setValue('score', singleUser?.data[0]?.score)
        }
    }, [id, singleUser])
    
    
    return (
        <>
            <ThemeProvider theme={defaultTheme}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Update Student
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
                            {/* <Box sx={{mb: 1, width: '100%'}}> */}

                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="name"
                                // label="Name"
                                autoComplete="name"
                                autoFocus
                                {...register('name', { required: true })}
                                sx={{ mb: 0 }}
                            />
                            {errors.name?.type === 'required' && <span style={{ color: 'red' }}>name is required</span>}
                            {/* </Box> */}

                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="batch"
                                // label="Batch"
                                autoComplete="batch"
                                autoFocus
                                {...register('batch', { required: true })}
                                sx={{ mb: 0 }}
                            />
                            {errors.batch?.type === 'required' && <span style={{ color: 'red' }}>batch is required</span>}

                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="url"
                                // label="Url"
                                autoComplete="url"
                                autoFocus
                                {...register('url', { required: true })}
                                sx={{ mb: 0 }}
                            />
                            {errors.url?.type === 'required' && <span style={{ color: 'red' }}>url is required</span>}

                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="score"
                                // label="Score"
                                autoComplete="score"
                                autoFocus
                                {...register('score', { required: true })}
                                sx={{ mb: 0 }}
                            />
                            {errors.score?.type === 'required' && <span style={{ color: 'red' }}>score is required</span>}

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Update
                            </Button>

                        </Box>
                    </Box>
                </Container>
            </ThemeProvider>
        </>
    )
}

export default EditStudent