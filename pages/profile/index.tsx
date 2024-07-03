import { Grid, Typography } from '@mui/material'
import { grey } from '@mui/material/colors';
import React from 'react'
import { Interface } from 'readline'

interface User {
    name: string | null;
    course: string | null;
    email: string | null;
    age: string | null;
    year: string | null;
}

function Profile() {

    const user: any = JSON.parse(window.localStorage.getItem('user'))

    return (
        <>
        <h3 style={{ textAlign: 'center'}}>User's Dashboard</h3>
            <Grid container maxWidth={'md'} mx={'auto'} sx={{ border: '1px solid grey', borderRadius: '10px', mt: '80px', overflow: 'hidden' }}>
                <Grid item xs={12} sm={6} sx={{ bgcolor: '#ffffffb3', p: 2, height: '100%' }}>
                    <Typography>Email: {user?.email}</Typography>
                </Grid>
                <Grid item xs={12} sm={6} sx={{ bgcolor: 'rgb(34, 58, 102)', p: 2, color: 'white' }}>
                    <Typography>Name: {user?.name}</Typography>
                    <Typography>Email: {user?.email}</Typography>
                    <Typography>Course: {user?.course}</Typography>
                    <Typography>Age: {user?.age}</Typography>
                    <Typography>Year: {user?.year}</Typography>
                </Grid>

            </Grid>
        </>
    )
}

export default Profile