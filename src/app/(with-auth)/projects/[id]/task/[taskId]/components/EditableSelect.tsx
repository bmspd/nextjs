'use client'
import { CancelRounded, SaveRounded } from '@mui/icons-material'
import { IconButton, Tooltip, Typography } from '@mui/material'
import React, { useState } from 'react'
type ValueType = { id: number | string }
type EditatbleSelectProps<T extends ValueType> = {
  children: ({
    isEdit,
    setValue,
    value,
  }: {
    isEdit: boolean
    setIsEdit: React.Dispatch<React.SetStateAction<boolean>>
    setValue: React.Dispatch<React.SetStateAction<T | undefined | null>>
    value: T | undefined | null
  }) => JSX.Element
  onSave: (value: T['id'] | null | undefined) => Promise<unknown> | void
}

const EditableSelect = <T extends ValueType>({ children, onSave }: EditatbleSelectProps<T>) => {
  const [isEdit, setIsEdit] = useState<boolean>(false)
  const [value, setValue] = useState<T | undefined | null>(undefined)
  if (!children) return null
  return (
    <Tooltip
      placement="top-start"
      arrow
      title={isEdit ? '' : <Typography>Click to edit</Typography>}
    >
      <div
        onClick={() => setIsEdit((prev) => !prev)}
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          cursor: 'pointer',
        }}
      >
        {children({ isEdit, setValue, value, setIsEdit })}
        {isEdit && (
          <div style={{ display: 'flex' }}>
            <IconButton
              onClick={(event) => {
                event.stopPropagation()
                // это ужас, но тайпскрипт пока победил меня
                if (value) onSave(value?.id ?? value)
                else if (value === null) onSave(value)
                setIsEdit((prev) => !prev)
              }}
            >
              <SaveRounded />
            </IconButton>
            <IconButton
              onClick={(event) => {
                event.stopPropagation()
                setIsEdit((prev) => !prev)
                setValue(undefined)
              }}
            >
              <CancelRounded />
            </IconButton>
          </div>
        )}
      </div>
    </Tooltip>
  )
}

export default EditableSelect
