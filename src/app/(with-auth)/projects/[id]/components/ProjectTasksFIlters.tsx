import React, { useCallback, useEffect, useState } from 'react'
import { TaskFiltersType } from '../page'
import { getTasksByProject } from '@/store/reducers/ProjectsSlice/asyncThunks'
import { useTypedDispatch } from '@/hooks/typedStoreHooks'
import MainBlock from '@/components/Blocks/MainBlock'
import Select from '@/components/Select/Select'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { TASK_STATUSES_OPTIONS } from '@/constants/tasks.constants'
import DefaultTextField from '@/components/Inputs/DefaultTextField/DefaultTextField'
import { formFiltersToServer } from '@/utils/filters/form'
export type ProjectTasksFiltersProps = {
  parsedFilters: TaskFiltersType
  projectId: string
}
const ProjectTasksFilters: React.FC<ProjectTasksFiltersProps> = ({ parsedFilters, projectId }) => {
  const [filters, setFilters] = useState<TaskFiltersType>(parsedFilters)
  const dispatch = useTypedDispatch()
  const searchParams = useSearchParams()
  const { push, replace } = useRouter()
  const pathname = usePathname()
  const onFiltersChange = useCallback(
    (newFilters: TaskFiltersType) => {
      dispatch(
        getTasksByProject({
          projectId: projectId,
          params: formFiltersToServer(newFilters),
        })
      )
    },
    [projectId]
  )
  useEffect(() => {
    onFiltersChange(filters)
  }, [filters])
  return (
    <MainBlock sx={{ marginTop: 4 }}>
      <Select
        isClearable
        placeholder="Status"
        multiple
        onChange={(event) => {
          const value = event.target.value as unknown as string[]
          const params = new URLSearchParams(searchParams)
          if (value.length) {
            params.set('status', JSON.stringify(value))
          } else {
            params.delete('status')
          }
          push(`${pathname}?${params.toString()}`)
          setFilters((prev) => {
            const newF = { ...prev, status: value }
            return newF
          })
        }}
        value={filters.status}
        options={TASK_STATUSES_OPTIONS}
      />
      <DefaultTextField
        value={filters.title}
        onChange={(e) => {
          const value = e.target.value
          const params = new URLSearchParams(searchParams)
          if (value.length) {
            params.set('title', value)
          } else {
            params.delete('title')
          }
          replace(`${pathname}?${params.toString()}`)
          setFilters((prev) => {
            const newF = { ...prev, title: value }
            return newF
          })
        }}
        label="Title"
      />
    </MainBlock>
  )
}

export default ProjectTasksFilters
