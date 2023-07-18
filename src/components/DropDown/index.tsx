'use client'
import React, { useEffect, useRef, useState } from 'react'
import styles from './styles.module.scss'
import {
  ClickAwayListener,
  Divider,
  Grow,
  IconButton,
  MenuItem,
  MenuList,
  Paper,
  Popper,
} from '@mui/material'
import { uniqueId } from 'lodash'
import { PopperPlacementType } from '@mui/base/Popper/Popper.types'
import { Z_INDEX } from '@/constants/global.constants'
import NextLink from 'next/link'

export type DropDownOption = {
  element?: React.ReactElement | string
  onClickHandler?: () => void
  onEndClose?: boolean
  divider?: boolean
  href?: string
}
type DropDownProps = {
  control: React.ReactElement | string
  options: DropDownOption[]
  popperPlacement?: PopperPlacementType
}

const DropDown: React.FC<DropDownProps> = ({
  control,
  options,
  popperPlacement = 'bottom-end',
}) => {
  const [open, setOpen] = useState<boolean>(false)
  const anchorRef = useRef<HTMLButtonElement>(null)
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen)
  }

  const handleClose = (event: Event | React.SyntheticEvent) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
      return
    }
    setOpen(false)
  }

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'Tab') {
      event.preventDefault()
      setOpen(false)
    } else if (event.key === 'Escape') {
      setOpen(false)
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open)
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current?.focus()
    }
  }, [open])
  return (
    <div className={styles.dropDown}>
      <IconButton
        size="small"
        onClick={handleToggle}
        id="composition-button"
        ref={anchorRef}
        aria-controls={open ? 'account-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
      >
        {control}
      </IconButton>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        placement={popperPlacement}
        transition
        disablePortal
        style={{ zIndex: Z_INDEX.POPPER }}
      >
        {({ TransitionProps }) => (
          <Grow {...TransitionProps}>
            <Paper sx={{ minWidth: 150 }}>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  id="account-menu"
                  aria-labelledby="composition-button"
                  onKeyDown={handleListKeyDown}
                >
                  {options.map(({ element, onClickHandler, onEndClose = true, divider, href }) =>
                    divider ? (
                      <Divider key={uniqueId('dropdown-divider')} />
                    ) : (
                      // fixme: generating <a> tag instead <li>, sounds like a bad case
                      <MenuItem
                        component={href ? NextLink : 'li'}
                        href={href ?? ''}
                        onClick={async (event: Event | React.SyntheticEvent) => {
                          if (onClickHandler) await onClickHandler()
                          if (onEndClose) handleClose(event)
                        }}
                        key={uniqueId('dropdown-item')}
                      >
                        {element}
                      </MenuItem>
                    )
                  )}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  )
}

export default DropDown
