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


import { Register } from '@/pages/api/authentications'
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { Grid, Paper } from '@mui/material';


function Copyright(props: any) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function LoginPage() {

    const { register, handleSubmit, formState: { errors } } = useForm()
    const { mutate, data } = useMutation({
        mutationFn: (payload) => Register(payload),
        onSuccess: (res) => {
            if (!res?.error) {
                toast.success(res?.data?.user?.aud)
                console.log(res);

            } else {
                toast.error(res?.error?.message)
            }
        },
    })

    const onSubmit = (data: any) => {
        mutate(data)
    }

    // console.log(data);


    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="md" sx={{ boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px', borderRadius: '10px', px: 0.5 }}>
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '',
                        py: 1
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main', }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1, border: '' }}>

                        <Grid container maxWidth={'lg'} mx={'auto'}>

                            {/* <Grid item xs={12} md={3} sx={{ boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px', borderRadius: '10px', px: 0.5, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <input type="file" name="profilepic" id="profilepic" style={{}}/>
                            </Grid> */}
                            <Grid item xs={12} md={12} >

                                <Grid container maxWidth={'md'} mx={'auto'}>

                                    <Grid item xs={12} md={6} sx={{ border: '', px: 1 }}>

                                        <TextField
                                            margin="normal"
                                            required
                                            fullWidth
                                            id="name"
                                            label="name"
                                            autoComplete="name"
                                            autoFocus
                                            InputProps={{ style: { borderRadius: '10px' } }}
                                            {...register('name', { required: true })}
                                            sx={{ mb: 0 }}
                                        />
                                        {errors.name?.type === 'required' && <span style={{ color: 'red' }}>name is required</span>}



                                        <TextField
                                            margin="normal"
                                            required
                                            fullWidth
                                            label="Password"
                                            type="password"
                                            id="password"
                                            autoComplete="current-password"
                                            InputProps={{ style: { borderRadius: '10px' } }}
                                            {...register('password', { required: true })}
                                            sx={{ mb: 0 }}
                                        />
                                        {errors.password?.type === 'required' && <span style={{ color: 'red' }}>password is required</span>}

                                        <TextField
                                            margin="normal"
                                            required
                                            fullWidth
                                            id="course"
                                            label="course"
                                            autoComplete="course"
                                            autoFocus
                                            InputProps={{ style: { borderRadius: '10px' } }}
                                            {...register('course', { required: true })}
                                            sx={{ mb: 0 }}
                                        />
                                        {errors.course?.type === 'required' && <span style={{ color: 'red' }}>course is required</span>}


                                    </Grid>
                                    <Grid item xs={12} md={6} sx={{ px: 1 }}>

                                        <TextField
                                            margin="normal"
                                            required
                                            fullWidth
                                            id="email"
                                            label="Email Address"
                                            autoComplete="email"
                                            autoFocus
                                            InputProps={{ style: { borderRadius: '10px' } }}
                                            {...register('email', { required: true })}
                                            sx={{ mb: 0 }}
                                        />
                                        {errors.email?.type === 'required' && <span style={{ color: 'red' }}>email is required</span>}

                                        <TextField
                                            margin="normal"
                                            required
                                            fullWidth
                                            id="age"
                                            label="age"
                                            autoComplete="age"
                                            autoFocus
                                            InputProps={{ style: { borderRadius: '10px' } }}
                                            {...register('age', { required: true })}
                                            sx={{ mb: 0 }}
                                        />
                                        {errors.age?.type === 'required' && <span style={{ color: 'red' }}>age is required</span>}



                                        <TextField
                                            margin="normal"
                                            required
                                            fullWidth
                                            id="year"
                                            label="year"
                                            autoComplete="year"
                                            autoFocus
                                            InputProps={{ style: { borderRadius: '10px' } }}
                                            {...register('year', { required: true })}
                                            sx={{ mb: 0 }}
                                        />
                                        {errors.year?.type === 'required' && <span style={{ color: 'red' }}>year is required</span>}

                                    </Grid>

                                    <Grid item xs={12} alignSelf={'right'} sx={{ display: 'flex', justifyContent: 'flex-end', px: 1 }}>
                                        {/* <Link href={'/login'} >Already have an account ? Login now</Link> */}
                                        <Button
                                            type="submit"
                                            fullWidth
                                            variant="contained"
                                            sx={{ mt: 3, mb: 2, width: 'fit-content' }}
                                        >
                                            Sign Up
                                        </Button>
                                    </Grid>
                                </Grid>

                            </Grid>
                        </Grid>

                        {/* <button formAction={signup}>Sign up</button> */}
                    </Box>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </ThemeProvider>
    )
}