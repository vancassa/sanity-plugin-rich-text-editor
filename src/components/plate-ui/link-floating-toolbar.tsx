'use client'

import {cn} from '@udecode/cn'
import {useFormInputProps} from '@udecode/plate/react'
import {flip, offset, type UseVirtualFloatingOptions} from '@udecode/plate-floating'
import {
  FloatingLinkNewTabInput,
  FloatingLinkUrlInput,
  type LinkFloatingToolbarState,
  LinkOpenButton,
  useFloatingLinkEdit,
  useFloatingLinkEditState,
  useFloatingLinkInsert,
  useFloatingLinkInsertState,
} from '@udecode/plate-link/react'
import {ExternalLink, Link, Text, Unlink} from 'lucide-react'
import React from 'react'

import {buttonVariants} from './button'
import {inputVariants} from './input'
import {popoverVariants} from './popover'
import {Separator} from './separator'

const floatingOptions: UseVirtualFloatingOptions = {
  middleware: [
    offset(12),
    flip({
      fallbackPlacements: ['bottom-end', 'top-start', 'top-end'],
      padding: 12,
    }),
  ],
  placement: 'bottom-start',
}

export interface LinkFloatingToolbarProps {
  state?: LinkFloatingToolbarState
}

export function LinkFloatingToolbar({state}: LinkFloatingToolbarProps) {
  const insertState = useFloatingLinkInsertState({
    ...state,
    floatingOptions: {
      ...floatingOptions,
      ...state?.floatingOptions,
    },
  })
  const {
    hidden,
    props: insertProps,
    ref: insertRef,
    textInputProps,
  } = useFloatingLinkInsert(insertState)

  const editState = useFloatingLinkEditState({
    ...state,
    floatingOptions: {
      ...floatingOptions,
      ...state?.floatingOptions,
    },
  })
  const {
    editButtonProps,
    props: editProps,
    ref: editRef,
    unlinkButtonProps,
  } = useFloatingLinkEdit(editState)
  const inputProps = useFormInputProps({
    preventDefaultOnEnterKeydown: true,
  })

  if (hidden) return null

  const input = (
    <div className="flex w-[330px] flex-col" {...inputProps}>
      <div className="flex items-center">
        <div className="flex items-center pr-1 pl-2 text-muted-foreground">
          <Link className="size-4" />
        </div>

        <FloatingLinkUrlInput
          className={inputVariants({h: 'sm', variant: 'ghost'})}
          placeholder="Paste link"
          data-plate-focus
        />
      </div>
      <Separator className="my-1" />
      <label className="flex items-center px-2 py-1">
        <FloatingLinkNewTabInput id="newTab" />
        <span className="pl-2 text-sm">Open in new tab</span>
      </label>
    </div>
  )

  const editContent = editState.isEditing ? (
    input
  ) : (
    <div className="box-content flex items-center">
      <button
        className={buttonVariants({size: 'sm', variant: 'ghost'})}
        type="button"
        {...editButtonProps}
      >
        Edit link
      </button>

      <Separator orientation="vertical" />

      <LinkOpenButton
        className={buttonVariants({
          size: 'icon',
          variant: 'ghost',
        })}
      >
        <ExternalLink width={18} />
      </LinkOpenButton>

      <Separator orientation="vertical" />

      <button
        className={buttonVariants({
          size: 'icon',
          variant: 'ghost',
        })}
        type="button"
        {...unlinkButtonProps}
      >
        <Unlink width={18} />
      </button>
    </div>
  )

  return (
    <>
      <div ref={insertRef} className={cn(popoverVariants(), 'w-auto p-1')} {...insertProps}>
        {input}
      </div>

      <div ref={editRef} className={cn(popoverVariants(), 'w-auto p-1')} {...editProps}>
        {editContent}
      </div>
    </>
  )
}
