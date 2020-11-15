import React from 'react'
import ReactDOM from 'react-dom'
import Board from './Board'
import observe from './Game'

// ToDo ゲーム状態の追加から

const root = document.getElementById('root')

observe((knightPosition) =>
  ReactDOM.render(<Board knightPosition={knightPosition} />, root)
)
