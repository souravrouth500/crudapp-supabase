'use client'
import { Grid, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'

interface User {
    name: string | null;
    course: string | null;
    email: string | null;
    age: string | null;
    year: string | null;
}

function Profile() {

    const [user, setUser] = useState<User | null>(null)

    // const user: any = JSON.parse(localStorage.getItem('user'))

    useEffect(() => {
        const userString = window.localStorage.getItem('user'); // userString is of type 'string | null'

        if (userString !== null) {
            setUser(JSON.parse(userString));
            // Now you can safely use 'user' as an object parsed from JSON
        }
    }, [])


    return (
        <>
            <h3 style={{ textAlign: 'center' }}>User Dashboard</h3>
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