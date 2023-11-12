import React from 'react'
import ViewListRoundedIcon from '@mui/icons-material/ViewListRounded'
import GridViewRoundedIcon from '@mui/icons-material/GridViewRounded'
import ViewModuleRoundedIcon from '@mui/icons-material/ViewModuleRounded'
import styles from './styles.module.scss'
import { useTypedDispatch, useTypedSelector } from '@/hooks/typedStoreHooks'
import { selectProjectsView } from '@/store/reducers/InterfaceSlice/selectors'
import {
  TProjectsViewVariants,
  setProjectsView,
} from '@/store/reducers/InterfaceSlice/InterfaceSlice'
const ProjectsViewControls = () => {
  const view = useTypedSelector(selectProjectsView)
  const dispatch = useTypedDispatch()
  const viewChange = (view: TProjectsViewVariants) => () => {
    dispatch(setProjectsView(view))
  }
  return (
    <div className={styles.projectsViewControls}>
      <ViewListRoundedIcon
        onClick={viewChange('col')}
        color={view === 'col' ? 'success' : 'disabled'}
        fontSize="large"
      />
      <GridViewRoundedIcon
        onClick={viewChange('double-row')}
        color={view === 'double-row' ? 'success' : 'disabled'}
        fontSize="large"
        sx={{ height: '27px' }}
      />
      <ViewModuleRoundedIcon
        onClick={viewChange('triple-row')}
        color={view === 'triple-row' ? 'success' : 'disabled'}
        fontSize="large"
      />
    </div>
  )
}

export default ProjectsViewControls
