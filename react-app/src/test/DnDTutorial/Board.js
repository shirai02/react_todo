import React from 'react';
import { DndProvider } from 'react-dnd'
import {HTML5Backend} from 'react-dnd-html5-backend'
import BoardSquare from './BoardSquare'
import Knight from './Knight'

const boardStyle = {
	width: 500,
	height: 500,
	border: '1px solid gray',
	display: 'flex',
	flexWrap: 'wrap'
};
const squareStyle = { width: '12.5%', height: '12.5%'};
function renderSquare(i, [knightX, knightY]) {
	const x = i % 8;
	const y = Math.floor(i / 8);
	return (
		<div
			key={i}
			style={squareStyle}
		>
			<BoardSquare x={x} y={y}>
				{renderPiece(x, y, [knightX, knightY])}
			</BoardSquare>
		</div>
	);
}
function renderPiece(x, y, [knightX, knightY]) {
	const isKnightHere = knightX === x && knightY === y
	return isKnightHere ? <Knight /> : null
}
function Board({ knightPosition }) {
	const squares = []
	for (let i = 0; i < 64; i++) {
		squares.push(renderSquare(i, knightPosition))
	}
	return (
		<DndProvider backend={HTML5Backend}>
			<div style={boardStyle}>
				{squares}
			</div>
		</DndProvider>
	);
}
export default Board;