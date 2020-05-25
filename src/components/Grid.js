import React, { useState, useEffect } from 'react'

import Node from './Node'

export default function Grid() {
  const [grid, setGrid] = useState([])
  const [mouseIsPressed, setMouseIsPressed] = useState(false)

  const createNode = (row, column) => {
    return {
      row,
      column,
      isPainted: false,
    }
  }

  // Helper fn to get a (20x40) 2D array of nodes
  const getEmptyGrid = () => {
    const nodes = []
    // row
    for (let i = 0; i < 15; i++) {
      const currentRow = []
      // column
      for (let j = 0; j < 30; j++) {
        currentRow.push(createNode(i, j))
      }
      //currentRow[i].isPainted = true      // To check if painted notes render correctly
      nodes.push(currentRow)
    }
    return nodes
  }

  // useEffect hook to initialize the grid as a 2D array
  useEffect(() => {
    const nodes = getEmptyGrid()
    //console.log(nodes)
    setGrid(nodes)
  }, [])

  // Helper fn to paint a node and return the grid
  const getUpdatedGrid = (row, col) => {
    const nodeToBeUpdated = grid[row][col]
    const updatedNode = {
      ...nodeToBeUpdated,
      isPainted: !nodeToBeUpdated.isPainted,
    }
    const updatedGrid = grid.slice()
    updatedGrid[row][col] = updatedNode
    return updatedGrid
  }

  const handleMouseDown = (row, col) => {
    const updatedGrid = getUpdatedGrid(row, col)
    setMouseIsPressed(true)
    setGrid(updatedGrid)
  }

  const handleMouseEnter = (row, col) => {
    if (!mouseIsPressed) {
      //console.log('Mouse Not Pressed!')
      return
    }
    const updatedGrid = getUpdatedGrid(row, col)
    setGrid(updatedGrid)
  }

  const handleMouseUp = () => {
    setMouseIsPressed(false)
  }

  const renderGrid = () => {
    return grid.map((row, rowIdx) => (
      <div key={rowIdx}>
        {row.map((node, nodeIdx) => {
          const { row, column, isPainted } = node
          return (
            <Node
              key={nodeIdx}
              row={row}
              column={column}
              isPainted={isPainted}
              handleMouseDown={handleMouseDown}
              handleMouseEnter={handleMouseEnter}
              handleMouseUp={handleMouseUp}
            />
          )
        })}
      </div>
    ))
  }

  return (
    <div>
      <button className="clear-btn" onClick={() => setGrid(getEmptyGrid())}>
        CLEAR
      </button>
      <div className="grid" onMouseLeave={() => setMouseIsPressed(false)}>
        {renderGrid()}
      </div>
    </div>
  )
}
