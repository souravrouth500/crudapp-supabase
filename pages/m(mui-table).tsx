import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import EditIcon from '@mui/icons-material/Edit';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { fetchStudents, removeStudent } from './api/crud'
import { Box, Button, Modal, Stack, TextField, Tooltip, Typography } from '@mui/material';
import Link from 'next/link';
import { toast } from 'react-toastify';
import EditStudent from '@/components/EditStudent';
import Swal from 'sweetalert2';

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
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

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
  const [studentList, setStudentList] = React.useState<any | ResponseObj >([])
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
  
  React.useEffect(()=>{
    
    setStudentList(studentsListResponse)
  }, [studentsListResponse])

  React.useEffect(() => {
    if(searchInput.length > 1){
      const filtered = studentList?.data?.filter((item: StudentsResponse) => {
        // console.log(item);
        
        return item.student_name.toLowerCase().includes(searchInput)}
      )
      console.log(filtered);
      
      setStudentList({...studentList, data: filtered})
    } else if (searchInput.length < 2){
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
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>#</StyledTableCell>
              <StyledTableCell align="right">Student</StyledTableCell>
              <StyledTableCell align="right">Batch Name</StyledTableCell>
              <StyledTableCell align="right">Submit URL</StyledTableCell>
              <StyledTableCell align="right">Score</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {studentList?.data?.map((row: any, index: any) => (
              <StyledTableRow key={row.id}>
                <StyledTableCell component="th" scope="row">
                  {index + 1}
                </StyledTableCell>
                <StyledTableCell align="right">{row.student_name}</StyledTableCell>
                <StyledTableCell align="right"><Link href={`/batch/${row.batch_name}`} style={{ textDecoration: 'none', color: 'green' }}>{row.batch_name}</Link></StyledTableCell>
                <StyledTableCell align="right">{row.submit_url}</StyledTableCell>
                <StyledTableCell align="right">{row.score}</StyledTableCell>
                <StyledTableCell align="right">
                  <Stack direction={'row'} spacing={1} justifyContent={'center'} alignItems={'center'}>
                    {/* <Link href={`/edit/${row.id}`}><Button variant='contained' sx={{bgcolor: '#9999997d', color: 'black'}}><EditIcon /></Button></Link> */}
                    <Button variant='contained' sx={{ bgcolor: 'transparent',color: 'black', boxShadow: 'none', '&:hover': {height: 0, width: 0, boxShadow: 'none', bgcolor: 'transparent'} }} onClick={() => { handleModal(row.id) }}><Tooltip title={'Quick Edit'} placement='top'><EditIcon sx={{borderRadius: '50%', fontSize: '20px', '&:hover': {bgcolor: 'grey'}}} /></Tooltip></Button>
                    <Button variant='contained' color='error' onClick={() => { handleRemove(row) }}>Delete</Button>
                  </Stack>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

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