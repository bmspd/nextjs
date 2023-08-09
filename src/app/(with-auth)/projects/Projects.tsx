'use client'
import React, { useEffect } from 'react'
import MainBlock from '@/components/Blocks/MainBlock'
import { useTypedDispatch, useTypedSelector } from '@/hooks/typedStoreHooks'
import { selectProjects } from '@/store/reducers/ProjectsSlice/selectors'
import { Button } from '@mui/material'
import { openModal } from '@/store/reducers/ModalSlice/ModalSlice'
import { CreateProjectModal } from '@/components/Modals/CreateProjectModal'
import useId from '@mui/material/utils/useId'
import { setProjects } from '@/store/reducers/ProjectsSlice/ProjectSlice'
import { IProject } from '@/http/services/ProjectsService'
import ProjectCard from './ProjectCard'
import styles from './styles.module.scss'
const Projects: React.FC<{ serverProjects: IProject[] }> = ({ serverProjects }) => {
  const projects = useTypedSelector(selectProjects)
  const dispatch = useTypedDispatch()
  const formId = useId()
  useEffect(() => {
    dispatch(setProjects(serverProjects))
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
