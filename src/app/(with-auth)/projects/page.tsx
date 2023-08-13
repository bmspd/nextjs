import { IProject } from '@/http/services/ProjectsService'
import Projects from './Projects'
import { serverSideRequest } from '@/utils/serverSideReq'
export default async function Home() {
  const serialized = await serverSideRequest<IProject[]>({ url: 'projects/personal' })
  return <Projects serverProjects={serialized} />
}
