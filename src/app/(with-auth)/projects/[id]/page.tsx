import { serverSideRequest } from '@/utils/serverSideReq'
import Project from './Project'
import { IProject } from '@/http/services/ProjectsService'
import { parseFilters, parseFn } from '@/utils/filters/parse'

export type TaskFiltersType = {
  status: string[]
  title: string
  page: number
  per_page: number
}
export type ParsedTasksFilters = {
  status: { parsed: string[]; server: string }
  title: { parsed: string; server: string }
  page: { parsed: number; server: string }
  per_page: { parsed: number; server: string }
}

export type TasksPageSearchParams = {
  status?: string
  title?: string
  page?: string
}

export default async function Page({
  params,
  searchParams,
}: {
  params: { id: string }
  searchParams: TasksPageSearchParams
}) {
  const filters = parseFilters<TaskFiltersType>(searchParams, {
    status: parseFn.array,
    title: parseFn.string,
    page: parseFn.number(1),
    per_page: parseFn.number(10),
  })

  // TODO: next js рендерит серверный компонент, если сделать router push или replace...
  const projectPromise = serverSideRequest<IProject>({
    url: `projects/${params.id}`,
  })
  const project = await projectPromise
  return <Project id={params.id} serverProject={project.serialized} parsedFilters={filters} />
}
