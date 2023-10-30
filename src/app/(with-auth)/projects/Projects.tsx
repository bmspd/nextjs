'use client'
import React, { useEffect, useId } from 'react'
import MainBlock from '@/components/Blocks/MainBlock'
import { useTypedDispatch, useTypedSelector } from '@/hooks/typedStoreHooks'
import { selectProjectLogos, selectProjects } from '@/store/reducers/ProjectsSlice/selectors'
import { Button } from '@mui/material'
import { openModal } from '@/store/reducers/ModalSlice/ModalSlice'
import { CreateProjectModal } from '@/components/Modals/CreateProjectModal'
import { setProjects } from '@/store/reducers/ProjectsSlice/ProjectSlice'
import ProjectsService, { IProject } from '@/http/services/ProjectsService'
import ProjectCard from './ProjectCard'
import styles from './styles.module.scss'
import { getProjectLogo } from '@/store/reducers/ProjectsSlice/asyncThunks'
const Projects: React.FC<{ serverProjects: IProject[]; raw: Response }> = (
  {
    /*serverProjects, raw*/
  }
) => {
  const projects = useTypedSelector(selectProjects)
  const logos = useTypedSelector(selectProjectLogos)
  const dispatch = useTypedDispatch()
  const formId = useId()
  useEffect(() => {
    // next js кэширует как урод, надо на сервер сайде править, пока так
    ProjectsService.getProjects().then((res) => {
      const { payload } = dispatch(setProjects(res.data))
      payload.forEach((el, index) => {
        if (el.logo) {
          // посмотреть есть ли уже загруженное лого, сравниваю id, в случае если вдруг поменялось кол-во проектов
          if (projects[index]?.id === el.id && logos[el.id]?.imgSource) return
          dispatch(getProjectLogo({ id: el.id }))
        }
      })
    })
  }, [])
  return (
    <div>
      {JSON.stringify(projects.map((el) => el.name))}
      <MainBlock>
        <Button
          variant="contained"
          onClick={() => {
            dispatch(openModal(CreateProjectModal(formId)))
          }}
        >
          Add new project
        </Button>
        <br />
        <div className={styles.projectBoard}>
          {projects.map((project) => (
            <ProjectCard key={project.id} {...project} />
          ))}
        </div>
      </MainBlock>
    </div>
  )
}

export default Projects
