'use client'
import { useCallback, useRef } from 'react'
import { useTypedDispatch, useTypedSelector } from '@/hooks/typedStoreHooks'
import { IUserInProject, IUserInProjectWithPagination } from '@/http/services/ProjectsService'
import { selectUsersForTableByProject } from '@/store/reducers/ProjectsSlice/selectors'
import { setUsersInProject } from '@/store/reducers/ProjectsSlice/ProjectSlice'
import MainBlock from '@/components/Blocks/MainBlock'
import Table from '@/components/Table/Table'
import { Columns } from './columns'
import { getUsersForTableByProject } from '@/store/reducers/ProjectsSlice/asyncThunks'

const Users: React.FC<{ id: string; serverUsers: IUserInProjectWithPagination }> = ({
  id,
  serverUsers,
}) => {
  const dispatch = useTypedDispatch()
  const initialized = useRef(false)
  if (!initialized.current) {
    dispatch(setUsersInProject({ users: serverUsers, projectId: id }))
  }
  const usersInProject = useTypedSelector(selectUsersForTableByProject(id))
  const usersData = usersInProject?.data ?? []
  const onPaginationChange = useCallback((pageNumber: number, rowsPerPage: number) => {
    dispatch(
      getUsersForTableByProject({
        params: { page: pageNumber, per_page: rowsPerPage },
        projectId: id,
      })
    )
  }, [])
  const columns = Columns(id)

  return (
    <>
      <MainBlock>
        <Table<IUserInProject>
          data={usersData}
          columns={columns}
          onPaginationChange={onPaginationChange}
          pagination={usersInProject?.meta?.pagination}
        />
      </MainBlock>
    </>
  )
}

export default Users
