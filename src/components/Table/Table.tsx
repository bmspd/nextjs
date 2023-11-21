import {
  Box,
  Paper,
  TableContainer,
  Table as MuiTable,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  Typography,
} from '@mui/material'
import {
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  flexRender,
} from '@tanstack/react-table'
import React from 'react'
import { TablePaginationActions } from './TablePaginationActions'
import { ServerPagintion } from '@/types/server'
interface TableProps<T> {
  data: T[]
  columns: ColumnDef<T>[]
  pagination?: ServerPagintion
  onPaginationChange?: (pageNumber: number, rowsPerPage: number) => void
}
type TableComponent = <T>(props: TableProps<T>) => React.ReactElement
const Table: TableComponent = ({ data, columns, pagination, onPaginationChange }) => {
  const formattedPagination = {
    ...pagination,
    pageSize: pagination?.per_page ?? 10,
    pageIndex: (pagination?.page ?? 1) - 1,
  }
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    debugTable: true,
    state: { pagination: formattedPagination },
    pageCount: pagination?.total ?? 0,
    manualPagination: true,
    debugAll: false,
  })
  const { pageSize, pageIndex } = table.getState().pagination
  return (
    <Box sx={{ width: '100%' }}>
      <TableContainer component={Paper}>
        <MuiTable sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableCell
                      sx={{ whiteSpace: 'nowrap' }}
                      key={header.id}
                      colSpan={header.colSpan}
                    >
                      {header.isPlaceholder ? null : (
                        <div>
                          {flexRender(
                            <Typography variant="body1" fontWeight="600" color="gray">
                              {`${header.column.columnDef.header}`}
                            </Typography>,
                            header.getContext()
                          )}
                        </div>
                      )}
                    </TableCell>
                  )
                })}
              </TableRow>
            ))}
          </TableHead>
          <TableBody>
            {table.getRowModel().rows.map((row) => {
              return (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    )
                  })}
                </TableRow>
              )
            })}
          </TableBody>
        </MuiTable>
      </TableContainer>
      {!!pagination && (
        <TablePagination
          rowsPerPageOptions={[10, 20, 30]}
          component="div"
          rowsPerPage={pageSize}
          page={pageIndex}
          sx={{ overflowX: 'hidden', mt: 1 }}
          count={table.getPageCount()}
          ActionsComponent={TablePaginationActions}
          onPageChange={(event, pageNumber) => {
            onPaginationChange && onPaginationChange(pageNumber + 1, pageSize)
          }}
          onRowsPerPageChange={(event) => {
            const perPage = +event.target.value
            onPaginationChange && onPaginationChange(1, perPage)
          }}
        ></TablePagination>
      )}
    </Box>
  )
}

export default Table
