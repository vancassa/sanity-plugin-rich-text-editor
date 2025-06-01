import {cn} from '@udecode/cn'
import type {SlateElementProps} from '@udecode/plate'
import {SlateElement} from '@udecode/plate'
import {BaseTablePlugin, type TTableElement} from '@udecode/plate-table'
import React from 'react'

export const TableElementStatic = ({
  children,
  className,
  ...props
}: SlateElementProps<TTableElement>) => {
  const {disableMarginLeft} = props.editor.getOptions(BaseTablePlugin)

  const marginLeft = disableMarginLeft ? 0 : props.element.marginLeft

  return (
    <SlateElement
      className={cn(className, 'overflow-x-auto py-5')}
      style={{paddingLeft: marginLeft}}
      {...props}
    >
      <div className="group/table relative w-fit">
        <table className="mr-0 ml-px table h-px table-fixed border-collapse">
          <tbody className="min-w-full">{children}</tbody>
        </table>
      </div>
    </SlateElement>
  )
}
