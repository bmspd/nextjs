export default async function Page({ params }: { params: { id: string; taskId: string } }) {
  return <h1>{params.taskId} task</h1>
}
