'use client'
import React, { useEffect, useId } from 'react'
import MainBlock from '@/components/Blocks/MainBlock'
import { useTypedDispatch, useTypedSelector } from '@/hooks/typedStoreHooks'
import { selectPreloaded, selectProjects } from '@/store/reducers/ProjectsSlice/selectors'
import { Button } from '@mui/material'
import { openModal } from '@/store/reducers/ModalSlice/ModalSlice'
import { CreateProjectModal } from '@/components/Modals/CreateProjectModal'
import { setProjects } from '@/store/reducers/ProjectsSlice/ProjectSlice'
import { IProject } from '@/http/services/ProjectsService'
import ProjectCard from './ProjectCard'
import styles from './styles.module.scss'
import { getProjectLogo } from '@/store/reducers/ProjectsSlice/asyncThunks'
const Projects: React.FC<{ serverProjects: IProject[] }> = ({ serverProjects }) => {
  const projects = useTypedSelector(selectProjects)
  const preloadedProjects = useTypedSelector(selectPreloaded('projects'))
  const dispatch = useTypedDispatch()
  const formId = useId()
  useEffect(() => {
    if (!preloadedProjects) {
      dispatch(setProjects(serverProjects))
      serverProjects.forEach((el) => {
        if (el.logo) {
          dispatch(getProjectLogo({ id: el.id }))
        }
      })
    }
  }, [])
  return (
    <div>
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
