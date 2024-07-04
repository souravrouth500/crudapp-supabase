import React from 'react'
import { CustomCellRendererProps } from 'ag-grid-react';
import Link from 'next/link';

function TableBatchRenderer(params: CustomCellRendererProps) {
    console.log(params);
    
  return (
    <>
        <Link href={`/batch/${params.value}`} style={{textDecoration: 'none', color: 'white'}}>{params.value}</Link>
    </>
  )
}

export default TableBatchRenderer