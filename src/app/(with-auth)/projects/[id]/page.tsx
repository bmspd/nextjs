import { serverSideRequest } from '@/utils/serverSideReq'
import Project from './Project'
import { createQueryParams } from '@/utils/createQueryParams'
import { ITaskWithPagination } from '@/http/services/TaskService'

export default async function Page({ params }: { params: { id: string } }) {
  const defParams = { page: '1', per_page: '2' }
  const serializedTasks = await serverSideRequest<ITaskWithPagination>({
    url: `projects/${params.id}/tasks` + createQueryParams(defParams),
  })
  return <Project id={params.id} serverTasks={serializedTasks} />
}
