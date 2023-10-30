import { IProject } from '@/http/services/ProjectsService'
import Projects from './Projects'
import { serverSideRequest } from '@/utils/serverSideReq'
export default async function Home() {
  const data = await serverSideRequest<IProject[]>({ url: 'projects/personal' })
  // TODO: здесь проикнуть date, чтобы в сторе сверяться
  return <Projects serverProjects={data.serialized} raw={data.response} />
}
