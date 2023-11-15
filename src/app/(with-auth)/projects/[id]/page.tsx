import { serverSideRequest } from '@/utils/serverSideReq'
import Project from './Project'
import { createQueryParams } from '@/utils/createQueryParams'
import { ITaskWithPagination } from '@/http/services/TaskService'
import { IProject } from '@/http/services/ProjectsService'

export default async function Page({ params }: { params: { id: string } }) {
  const defParams = { page: '1', per_page: '10' }
  const tasksPromise = serverSideRequest<ITaskWithPagination>({
    url: `projects/${params.id}/tasks` + createQueryParams(defParams),
  })
  const projectPromise = serverSideRequest<IProject>({
    url: `projects/${params.id}`,
  })
  const [tasks, project] = await Promise.all([tasksPromise, projectPromise])
  return (
    <Project id={params.id} serverTasks={tasks.serialized} serverProject={project.serialized} />
  )
}
