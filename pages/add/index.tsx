'use client'
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Link from 'next/link'
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { addStudent } from '../api/crud';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

const defaultTheme = createTheme();

function index() {

    const router = useRouter()
    const { register, handleSubmit, formState: { errors } } = useForm()
    const { mutate, data } = useMutation({
        mutationFn: (payload) => addStudent(payload),
        onSuccess: (res) => {
            if (res?.status === 201) {
                toast.success("student added successfully");
                (() => {
                    router.push('/')
                })()
                console.log(res);

            } else {
                toast.error(res?.error?.message)
            }
        },
    })

    const onSubmit = (data: any) => {
        mutate(data)
    }

    console.log(data);



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
                            Add Student
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
                            {/* <Box sx={{mb: 1, width: '100%'}}> */}
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="student_name"
                                label="Name"
                                autoComplete="name"
                                autoFocus
                                {...register('student_name', { required: true })}
                                sx={{ mb: 0 }}
                            />
                            {errors.student_name?.type === 'required' && <span style={{ color: 'red' }}>name is required</span>}
                            {/* </Box> */}

                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="batch_name"
                                label="Batch"
                                autoComplete="batch"
                                autoFocus
                                {...register('batch_name', { required: true })}
                                sx={{ mb: 0 }}
                            />
                            {errors.batch_name?.type === 'required' && <span style={{ color: 'red' }}>batch name is required</span>}

                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="submit_url"
                                label="Url"
                                autoComplete="url"
                                autoFocus
                                {...register('submit_url', { required: true })}
                                sx={{ mb: 0 }}
                            />
                            {errors.submit_url?.type === 'required' && <span style={{ color: 'red' }}>url is required</span>}

                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="score"
                                label="Score"
                                autoComplete="score"
                                autoFocus
                                {...register('score', { required: true })}
                                sx={{ mb: 0 }}
                            />
                            {errors.score?.type === 'required' && <span style={{ color: 'red' }}>score is required</span>}

                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="course"
                                label="course"
                                autoComplete="course"
                                autoFocus
                                {...register('course', { required: true })}
                                sx={{ mb: 0 }}
                            />
                            {errors.course?.type === 'required' && <span style={{ color: 'red' }}>course is required</span>}

                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="year"
                                label="year"
                                autoComplete="year"
                                autoFocus
                                {...register('year', { required: true })}
                                sx={{ mb: 0 }}
                            />
                            {errors.year?.type === 'required' && <span style={{ color: 'red' }}>year is required</span>}

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Add
                            </Button>

                        </Box>
                    </Box>
                </Container>
            </ThemeProvider>
        </>
    )
}

export default index