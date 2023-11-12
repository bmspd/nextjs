import React from 'react'
import cn from 'classnames'
import styles from './styles.module.scss'
import { CellContext } from '@tanstack/react-table'
export type CustomCellProps = {
  children: React.ReactNode
  lines?: 1 | 2 | 3 | 4
  className?: string
  isDefault?: boolean
}
const CustomCell: React.FC<CustomCellProps> = ({ children, lines, className, isDefault }) => {
  return (
    <div className={cn(styles[`lineClamp${lines}`], className, isDefault && styles.cellDefaults)}>
      {children}
    </div>
  )
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const DefaultCell: React.FC<CellContext<any, unknown>> = (props) => (
  <CustomCell className={cn(styles.cellDefaults)}>{props.getValue<string>()}</CustomCell>
)

export default CustomCell
