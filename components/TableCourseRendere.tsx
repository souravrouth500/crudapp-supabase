import React from 'react'
import { CustomCellRendererProps } from 'ag-grid-react';
import Link from 'next/link';

function TableCourseRendere(params: CustomCellRendererProps) {
  return (
    <>
    <Link href={`/course/${params.value}`} style={{textDecoration: 'none', color: 'white'}}>{params.value}</Link>
    </>
  )
}

export default TableCourseRendere