'use client'
import React, { useId, useMemo, useRef } from 'react'
import MainBlock from '@/components/Blocks/MainBlock'
import { useTypedDispatch, useTypedSelector } from '@/hooks/typedStoreHooks'
import { selectProjectLogos, selectProjects } from '@/store/reducers/ProjectsSlice/selectors'
import { Button } from '@mui/material'
import { openModal } from '@/store/reducers/ModalSlice/ModalSlice'
import { CreateProjectModal } from '@/components/Modals/CreateProjectModal'
import { setProjects } from '@/store/reducers/ProjectsSlice/ProjectSlice'
import { IProject } from '@/http/services/ProjectsService'
import ProjectCard from './ProjectCard'
import styles from './styles.module.scss'
import { getProjectLogo } from '@/store/reducers/ProjectsSlice/asyncThunks'
import ProjectsViewControls from './ProjectsViewControls'
import { selectProjectsView } from '@/store/reducers/InterfaceSlice/selectors'
import { TProjectsViewVariants } from '@/store/reducers/InterfaceSlice/InterfaceSlice'
const formProjectStyles = (view: TProjectsViewVariants): React.CSSProperties => {
  if (view === 'col') {
    return { display: 'flex', flexDirection: 'column' }
  } else if (view == 'double-row') {
    return { display: 'grid', gridTemplateColumns: '1fr 1fr' }
  } else {
    return { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr' }
  }
}
const Projects: React.FC<{ serverProjects: IProject[] }> = ({ serverProjects }) => {
  const projects = useTypedSelector(selectProjects)
  const dispatch = useTypedDispatch()
  const projectsLogos = useTypedSelector(selectProjectLogos)
  const initialized = useRef(false)
  if (!initialized.current) {
    initialized.current = true
    if (!projects.length) dispatch(setProjects(serverProjects))
    serverProjects.forEach((el) => {
      if (el.logo && !projectsLogos[el.id]) {
        dispatch(getProjectLogo({ id: el.id }))
      }
    })
  }
  const projectsView = useTypedSelector(selectProjectsView)
  const projectStyles = useMemo(() => formProjectStyles(projectsView), [projectsView])
  const formId = useId()
  return (
    <div>
      <MainBlock>
        <div className={styles.projectsPageHeader}>
          <Button
            variant="contained"
            onClick={() => {
              dispatch(openModal(CreateProjectModal(formId)))
            }}
          >
            Add new project
          </Button>
          <ProjectsViewControls />
        </div>
        {!!projects.length && (
          <div style={projectStyles} className={styles.projectBoard}>
            {projects.map((project) => (
              <ProjectCard key={project.id} {...project} />
            ))}
          </div>
        )}
      </MainBlock>
    </div>
  )
}

export default Projects
