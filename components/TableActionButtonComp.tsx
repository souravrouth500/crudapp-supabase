import React from 'react'
import { CustomCellRendererProps } from 'ag-grid-react';
import Swal from 'sweetalert2';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { removeStudent } from '@/pages/api/crud';
import { toast } from 'react-toastify';
import { Button, Tooltip, Modal, Box, Popover, Typography, Stack } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import EditStudent from './EditStudent';
import Link from 'next/link';
import DeleteIcon from '@mui/icons-material/Delete';

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


function TableActionButtonComp(params: CustomCellRendererProps) {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // popover

    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

    const handleClickPopover = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClosePopover = () => {
        setAnchorEl(null);
    };

    const openPopover = Boolean(anchorEl);
    const id = openPopover ? 'simple-popover' : undefined;


    // popover

    const queryClient = useQueryClient()

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
                mutate(payload?.value)
                Swal.fire("Deleted!", "User has been deleted successfully", "success");
            } else if (result.isDenied) {
                Swal.fire("Cancelled the deletion of the user", "", "info");
            }
        });
        // mutate(payload)
    }

    const handleModal = (id: any) => {
        handleOpen()
    }

    // console.log(params);

    return (
        <>
            {/* {params.value} */}
            <Button variant='contained' sx={{ bgcolor: 'transparent', color: 'white', boxShadow: 'none', '&:hover': { height: 0, width: 0, boxShadow: 'none', bgcolor: 'transparent' } }} onClick={() => { handleModal(params.value) }}><Tooltip title={'Quick Edit'} placement='top'><EditIcon sx={{ borderRadius: '50%', fontSize: '20px', '&:hover': { bgcolor: 'grey' } }} /></Tooltip></Button>
            {/* <Button variant='contained' color='error' onClick={() => { handleRemove(params) }}>Delete</Button> */}
            <Button onClick={handleClickPopover}><i className="fa-solid fa-ellipsis-vertical" style={{ color: "black" }} ></i></Button>

            <Popover
                id={id}
                open={openPopover}
                anchorEl={anchorEl}
                onClose={handleClosePopover}
                anchorOrigin={{
                    vertical: 'center',
                    horizontal: 'left',
                }}
            >
                <Stack sx={{ borderRadius: '0', overflow: 'hidden', border: 'none' }}>
                    <Link href={`/edit/${params.value}`}style={{textDecoration: 'none',}}>
                        <Box sx={{ padding: '5px', bgcolor: 'color-mix(in srgb, #fff, #182230 97%)', color: 'white', '&:hover': { bgcolor: 'black', } }}>
                            <EditIcon style={{ marginRight: "5px", fontSize: '20px', verticalAlign: 'middle' }} /> Edit
                        </Box>
                    </Link>

                    <Box onClick={() => { handleRemove(params) }} sx={{ padding: '5px',bgcolor: 'color-mix(in srgb, #fff, #182230 97%)', color: '#FF5630', '&:hover': { bgcolor: 'black', } }}><DeleteIcon style={{ marginRight: '5px', fontSize: '20px', verticalAlign: 'middle' }} />Delete</Box>
                </Stack>

            </Popover>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={modalstyle}>
                    {/* <Typography variant='h5'>hrshrs</Typography> */}
                    <EditStudent id={params.value} />
                </Box>
            </Modal>
        </>
    )
}

export default TableActionButtonComp