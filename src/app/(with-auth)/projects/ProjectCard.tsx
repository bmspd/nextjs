'use client'
import { IProject } from '@/http/services/ProjectsService'
import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material'
import React from 'react'
import NextLink from 'next/link'
import Image from 'next/image'
import noImage from '/public/assets/images/no-image.jpg'
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface ProjectCardProps extends IProject {}

const ProjectCard: React.FC<ProjectCardProps> = ({ name, id }) => {
  return (
    <Card
      href={`/projects/${id}`}
      component={NextLink}
      prefetch={false}
      sx={{ maxWidth: 250, width: '100%', textDecoration: 'none' }}
    >
      <CardActionArea>
        <CardMedia sx={{ height: '140px', position: 'relative', opacity: 0.1 }}>
          <Image src={noImage} fill={true} style={{ objectFit: 'contain' }} alt="" />
        </CardMedia>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
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
