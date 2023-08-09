import { IProject } from '@/http/services/ProjectsService'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { createProject } from './asyncThunks'
type InitialState = {
  projects: Record<number, IProject>
}
const initialState: InitialState = {
  projects: {},
}

const ProjectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    setProjects: (state, action: PayloadAction<IProject[]>) => {
      state.projects = action.payload
    },
  },
  extraReducers: (builder) =>
    builder.addCase(createProject.fulfilled, (state, action) => {
      const { payload } = action
      state.projects[payload.id] = payload
    }),
})

export const { setProjects } = ProjectsSlice.actions
export default ProjectsSlice.reducer
