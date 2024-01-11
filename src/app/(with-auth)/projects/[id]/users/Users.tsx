'use client'
import { useEffect, useCallback } from 'react'
import { useTypedDispatch, useTypedSelector } from '@/hooks/typedStoreHooks'
import { IUserInProject, IUserInProjectWithPagination } from '@/http/services/ProjectsService'
import {
  selectPreloaded,
  selectUsersForTableByProject,
} from '@/store/reducers/ProjectsSlice/selectors'
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
  const usersInProject = useTypedSelector(selectUsersForTableByProject(id))
  const usersData = usersInProject?.data ?? []
  const preloadedUsers = useTypedSelector(selectPreloaded(`projects.${id}`))
  const onPaginationChange = useCallback((pageNumber: number, rowsPerPage: number) => {
    dispatch(
      getUsersForTableByProject({
        params: { page: pageNumber, per_page: rowsPerPage },
        projectId: id,
      })
    )
  }, [])
  const columns = Columns(id)
  useEffect(() => {
    if (!preloadedUsers) {
      dispatch(setUsersInProject({ users: serverUsers, projectId: id }))
    }
  }, [])
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
