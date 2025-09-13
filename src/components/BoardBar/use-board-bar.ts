import { useState } from 'react'

export function useBoardBar() {
  // Board state
  const [boardTitle] = useState('My Task Board')

  return {
    // State
    boardTitle,
  }
}
