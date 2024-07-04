import * as React from 'react';
// Theme
import { ColDef } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
// React Grid Logic
import "ag-grid-community/styles/ag-grid.css";
// Core CSS
import "ag-grid-community/styles/ag-theme-quartz.css";
import { useState } from "react";

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { fetchStudents, removeStudent } from './api/crud'
import { Box, Button, Modal, Stack, TextField, Tooltip, Typography } from '@mui/material';
import Link from 'next/link';
import { toast } from 'react-toastify';
import EditStudent from '@/components/EditStudent';
import Swal from 'sweetalert2';
import TableActionButtonComp from '@/components/TableActionButtonComp';
import TableBatchRenderer from '@/components/TableBatchRenderer';
import { ResponseObj, StudentsResponse } from '@/typescript/type';
import TableCourseRendere from '@/components/TableCourseRendere';



const modalstyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    // border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

function Home() {
    const [currId, setCurrId] = React.useState(false)
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [searchInput, setSearchInput] = React.useState<string>("")
    const [studentList, setStudentList] = React.useState<any | ResponseObj>([])
    const queryClient = useQueryClient()
    const { data: studentsListResponse }: any | ResponseObj = useQuery({
        queryKey: ['fetchAllStudents'],
        queryFn: () => fetchStudents(),
        refetchInterval: 10000
    })

    const { mutate, data: removeStudentResponse } = useMutation({
        mutationFn: (payload) => removeStudent(payload),
        onSuccess: (res) => {
            if (res?.status === 204) {
                toast.success("student removed successfully");
                queryClient.invalidateQueries({
                    queryKey: ['fetchAllStudents']
                })
            } else {
                toast.error(res?.error?.message)
            }
        }
    })

    const handleRemove = (payload: any) => {
        Swal.fire({
            title: "Do you want to delete this user?",
            icon: 'question',
            showDenyButton: true,
            // showCancelButton: true,
            confirmButtonText: "Delete",
            denyButtonText: `Cancel`
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                mutate(payload?.id)
                Swal.fire("Deleted!", "User has been deleted successfully", "success");
            } else if (result.isDenied) {
                Swal.fire("Cancelled the deletion of the user", "", "info");
            }
        });
        // mutate(payload)
    }

    const handleModal = (id: any) => {
        setCurrId(id)
        handleOpen()
    }

    console.log(studentsListResponse);
    // console.log(studentList);

    const defaultColDef = React.useMemo<ColDef>(() => {
        return {
          flex: 1,
        };
      }, []);

    const [colDefs, setColDefs] = useState<ColDef<StudentsResponse>[]>([
        {
            field: "student_name",
            headerName: "Name"
        },
        {
            field: "batch_name",
            headerName: "Batch",
            cellRenderer: TableBatchRenderer
        },
        { field: "course",
            cellRenderer: TableCourseRendere
         },
        {
            field: "submit_url",
            headerName: "URL"
        },
        { field: "score" },
        { field: "year" },
        {
            field: "id",
            headerName: "Actions",
            flex: 1.2,
            cellRenderer: TableActionButtonComp
        }
    ]);

    React.useEffect(() => {

        setStudentList(studentsListResponse)
    }, [studentsListResponse])

    React.useEffect(() => {
        if (searchInput.length > 1) {
            const filtered = studentList?.data?.filter((item: StudentsResponse) => {
                // console.log(item);

                return item.student_name.toLowerCase().includes(searchInput)
            }
            )
            console.log(filtered);

            setStudentList({ ...studentList, data: filtered })
        } else if (searchInput.length < 2) {
            setStudentList(studentsListResponse)
        }

    }, [searchInput])
    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1>Students List</h1>
                <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} spacing={1}>
                    <TextField
                        margin="normal"
                        required
                        id="name"
                        label="Search Student"
                        autoComplete="name"
                        autoFocus
                        size='small'
                        onChange={(e) => setSearchInput(e.target.value)}
                        sx={{ mb: 0 }}
                    />
                    <Link href={`/add`} ><Button variant='contained' color='primary'>Add Student</Button></Link>
                </Stack>
            </div>

            <div
                className={
                    "ag-theme-quartz-dark"
                }
                style={{ width: "100%", height: "100%" }}
            >
                <AgGridReact
                    rowData={studentList?.data}
                    columnDefs={colDefs}
                    defaultColDef={defaultColDef}
                />
            </div>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={modalstyle}>
                    {/* <Typography variant='h5'>hrshrs</Typography> */}
                    <EditStudent id={currId} />
                </Box>
            </Modal>
        </>
    )
}

export default Home