import { serverSideRequest } from '@/utils/serverSideReq'

export default async function Page() {
  await serverSideRequest({ url: '1' })
  return <div>Just testing...</div>
}
