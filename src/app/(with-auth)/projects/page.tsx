import Projects from './Projects'
import { serverSideRequest } from '@/utils/serverSideReq'
export default async function Home() {
  const serialized = await serverSideRequest({ url: 'projects/personal' })
  return <Projects serverProjects={serialized} />
}
