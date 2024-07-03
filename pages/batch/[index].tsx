import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { useQuery } from '@tanstack/react-query'
import { getBatchWiseData } from '../api/crud'
import { useRouter } from 'next/router'

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


function index() {

  const router = useRouter()
  const slug = router.query.index
  const {data: batchWiseDataResponse} = useQuery({
    queryKey: ['batchWiseData', slug],
    queryFn: (slug) => getBatchWiseData(slug)
  })

  console.log(slug);
  
  console.log(batchWiseDataResponse);
  
    
  return (
    <>
    <h3>Batch Details</h3>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>#</StyledTableCell>
            <StyledTableCell align="right">Student</StyledTableCell>
            <StyledTableCell align="right">Course</StyledTableCell>
            <StyledTableCell align="right">Year</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {batchWiseDataResponse?.data?.map((row: any, index: any) => (
            <StyledTableRow key={row.id}>
              <StyledTableCell component="th" scope="row">
                {index +1}
              </StyledTableCell>
              <StyledTableCell align="right">{row.student_name}</StyledTableCell>
              <StyledTableCell align="right">{row.course}</StyledTableCell>
              <StyledTableCell align="right">{row?.year}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  )
}

export default index