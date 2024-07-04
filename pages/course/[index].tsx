import React, { useState } from 'react'

import { ColDef } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
// React Grid Logic
import "ag-grid-community/styles/ag-grid.css";
// Core CSS
import "ag-grid-community/styles/ag-theme-quartz.css";
import { ResponseObj, StudentsResponse } from '@/typescript/type';
import TableBatchRenderer from '@/components/TableBatchRenderer';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { getCourseData } from '../api/crud';
import TableActionButtonComp from '@/components/TableActionButtonComp';

function Course() {

    const [studentList, setStudentList] = React.useState<any | ResponseObj>([])
    const router = useRouter()
    const slug = router.query.index
    const { data: courseWiseData } = useQuery({
        queryKey: ['batchWiseData', slug],
        queryFn: (slug) => getCourseData(slug)
    })

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
        { field: "course" },
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
                    rowData={courseWiseData?.data}
                    columnDefs={colDefs}
                    defaultColDef={defaultColDef}
                />
            </div>
        </>
    )
}

export default Course