'use client'
import {
  IProject,
  PROJECT_PATTERN_COLORS,
  PROJECT_PATTERN_TYPES,
} from '@/http/services/ProjectsService'
import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material'
import React from 'react'
import NextLink from 'next/link'
import cn from 'classnames'
import Image from 'next/image'
import noImage from '/public/assets/images/no-image.jpg'
import { useTypedSelector } from '@/hooks/typedStoreHooks'
import { selectProjectLogo } from '@/store/reducers/ProjectsSlice/selectors'
import styles from './styles.module.scss'
import { selectProjectsView } from '@/store/reducers/InterfaceSlice/selectors'
import { capitalize } from 'lodash'
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface ProjectCardProps extends IProject {}

const patternClass = (pattern_type: PROJECT_PATTERN_TYPES | null) => {
  switch (pattern_type) {
    case PROJECT_PATTERN_TYPES.PLANTS:
      return styles.plantPattern
    default:
      return undefined
  }
}
const patternColor = (pattern_type: PROJECT_PATTERN_COLORS | null) => {
  if (!pattern_type) return undefined
  return styles[`pattern${capitalize(pattern_type)}`]
}
const ProjectCard: React.FC<ProjectCardProps> = ({ name, id, pattern_color, pattern_type }) => {
  const logo = useTypedSelector(selectProjectLogo(id))
  const logoSource = logo?.imgSource ?? noImage
  const projectsView = useTypedSelector(selectProjectsView)
  return (
    <Card
      href={`/projects/${id}`}
      component={NextLink}
      className={cn(
        styles.cardDefaultStyles,
        patternClass(pattern_type),
        patternColor(pattern_color)
      )}
      prefetch={false}
      sx={{ width: '100%', textDecoration: 'none' }}
    >
      <CardActionArea
        sx={{
          display: 'flex',
          flexDirection: projectsView === 'triple-row' ? 'column' : 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
          gap: 2,
          padding: 2,
        }}
      >
        <CardMedia className={styles.cardMedia}>
          <Image
            src={logoSource}
            fill={true}
            style={{ objectFit: 'cover', borderRadius: '16px' }}
            alt=""
          />
        </CardMedia>
        <CardContent className={styles.cardContent}>
          <Typography
            gutterBottom
            variant={projectsView === 'col' ? 'h5' : 'h6'}
            component="div"
            sx={{ marginBottom: 0 }}
          >
            {name}
          </Typography>
          {/* <Typography variant="body2" color="text.secondary">
            Some text...
          </Typography> */}
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default ProjectCard
