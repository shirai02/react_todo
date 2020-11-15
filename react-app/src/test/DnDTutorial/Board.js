import React from 'react'
import { canMoveKnight, moveKnight } from './Game'
import Knight from './Knight'
import Square from './Square'

export default function Board({ knightPosition }) {
    const squares = []
    for (let i = 0; i < 64; i++) {
        squares.push(renderSquare(i, knightPosition))
    }
    console.log(squares)
    return(
        <div
            style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '90%',
                height: '90%',
                margin: '5%, 5%, 5%, 5%',
                display: 'flex',
                flexWrap: 'wrap'
            }}
        >
            {squares}
        </div>
    )
}

function renderSquare(i, [knightX, knightY]) {
    const x = i % 8
    const y = Math.floor(i / 8)
    const black = (x + y) % 2 === 1
    const isKnightHere = knightX === x && knightY === y
    const piece = isKnightHere ? <Knight /> : null
    
    return (
        <div onClick={() => handleSquareClick(x, y)} key={i} style={{ width: '12.5%', height: '12.5%' }}>
            <Square black={black}>{piece}</Square>
        </div>
    )
}

function handleSquareClick(toX, toY) {
    if (canMoveKnight(toX, toY)){
        moveKnight(toX, toY)
    }
}