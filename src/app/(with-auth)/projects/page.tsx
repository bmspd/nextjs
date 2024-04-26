import { IProject } from '@/http/services/ProjectsService'
import Projects from './Projects'
import { serverSideRequest } from '@/utils/serverSideReq'
import { withRefresh } from '@/hocs/withRefresh/withRefresh'
export default async function Home() {
  const data = await serverSideRequest<IProject[]>({ url: 'projects/personal' })
  const RefreshProjects = withRefresh(Projects, data.isRefresh)
  return <RefreshProjects serverProjects={data.serialized} />
}
