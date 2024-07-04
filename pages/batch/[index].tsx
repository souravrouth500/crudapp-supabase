import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { ColDef } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
// React Grid Logic
import "ag-grid-community/styles/ag-grid.css";
// Core CSS
import "ag-grid-community/styles/ag-theme-quartz.css";
import { useState } from "react";

import { useQuery } from '@tanstack/react-query'
import { getBatchWiseData } from '../api/crud'
import { useRouter } from 'next/router'
import TableCourseRendere from '@/components/TableCourseRendere';


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
  action: any
}


function Batch() {

  const router = useRouter()
  const slug = router.query.index
  const { data: batchWiseDataResponse } = useQuery({
    queryKey: ['batchWiseData', slug],
    queryFn: (slug) => getBatchWiseData(slug)
  })

  console.log(slug);

  console.log(batchWiseDataResponse);

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
  ]);


  return (
    <>
      <h1>Batch Details</h1>

      <div
        className={
          "ag-theme-quartz-dark"
        }
        style={{ width: "100%", height: "100%" }}
      >
        <AgGridReact
          rowData={batchWiseDataResponse?.data}
          columnDefs={colDefs}
          defaultColDef={defaultColDef}
        />
      </div>

    </>
  )
}

export default Batch