import { serverSideRequest } from '@/utils/serverSideReq'
import Users from './Users'
import { IUserInProjectWithPagination } from '@/http/services/ProjectsService'
import { createQueryParams } from '@/utils/createQueryParams'

export default async function Page({ params }: { params: { id: string } }) {
  const defParams = { page: '1', per_page: '10' }
  const usersInProject = await serverSideRequest<IUserInProjectWithPagination>({
    url: `projects/${params.id}/users` + createQueryParams(defParams),
    cache: 'no-cache',
  })
  return <Users id={params.id} serverUsers={usersInProject.serialized} />
}
