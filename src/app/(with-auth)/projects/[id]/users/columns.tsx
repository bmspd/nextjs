import { useMemo } from 'react'
import { IUserInProject } from '@/http/services/ProjectsService'
import { IdType } from '@/types/common'
import { ColumnDef } from '@tanstack/react-table'
import { DefaultCell } from '@/components/Table/CustomCell'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const Columns = (id: IdType): ColumnDef<IUserInProject>[] => {
  return useMemo(
    () => [
      { header: 'ID', accessorKey: 'id', cell: DefaultCell },
      { header: 'Username', accessorKey: 'username', cell: DefaultCell },
      { header: 'Email', accessorKey: 'email', cell: DefaultCell },
    ],
    []
  )
}
