import { serverSideRequest } from '@/utils/serverSideReq'
import ProjectSettings from './ProjectSettings'
import { IProject } from '@/http/services/ProjectsService'

export default async function Page({ params }: { params: { id: string } }) {
  const project = await serverSideRequest<IProject>({
    url: `projects/${params.id}`,
  })
  return <ProjectSettings id={params.id} serverProject={project.serialized} />
}
