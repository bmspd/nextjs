import { serverSideRequest } from '@/utils/serverSideReq'
import Task from './Task'
import { ITask } from '@/http/services/TaskService'

export default async function Page({ params }: { params: { id: string; taskId: string } }) {
  const serverTask = await serverSideRequest<ITask>({
    url: `projects/${params.id}/tasks/${params.taskId}`,
  })
  return <Task projectId={params.id} taskId={params.taskId} serverTask={serverTask.serialized} />
}
