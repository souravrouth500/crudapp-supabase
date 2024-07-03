import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { fetchStudents, removeStudent } from './api/crud'
import { Button, Stack } from '@mui/material';
import Link from 'next/link';
import { toast } from 'react-toastify';



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

function Home() {

  const queryClient = useQueryClient()
  const { data: studentsListResponse } = useQuery({
    queryKey: ['fetchAllStudents'],
    queryFn: () => fetchStudents()
  })

  const { mutate, data: removeStudentResponse } = useMutation({
    mutationFn: (payload) => removeStudent(payload?.id),
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
    mutate(payload)
  }

  console.log(studentsListResponse);

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Students List</h1>
        <Link href={`/add`} ><Button variant='contained' color='primary'>Add Student</Button></Link>
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
              <StyledTableCell align="right">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {studentsListResponse?.data?.map((row: any, index: any) => (
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
                    <Link href={`/edit/${row.id}`}><Button variant='contained' color='success'>Edit</Button></Link>
                    <Button variant='contained' color='error' onClick={() => { handleRemove(row) }}>Delete</Button>
                  </Stack>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default Home