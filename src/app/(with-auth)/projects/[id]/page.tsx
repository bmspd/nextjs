import Project from './Project'

export default function Page({ params }: { params: { id: string } }) {
  return <Project id={params.id} />
}
