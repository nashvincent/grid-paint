import React from 'react'

export default function Node({
  row,
  column,
  isPainted,
  handleMouseDown,
  handleMouseEnter,
  handleMouseUp,
}) {
  let style = isPainted === true ? 'paint' : ''

  return (
    <div
      className={`node ${style}`}
      id={`node-${row}-${column}`}
      onMouseDown={() => handleMouseDown(row, column)}
      onMouseEnter={() => handleMouseEnter(row, column)}
      onMouseUp={() => handleMouseUp()}
    />
  )
}
