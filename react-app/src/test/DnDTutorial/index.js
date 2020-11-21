import React,{useEffect, useState} from 'react'
import Board from './Board'
import {observe} from './Game'

export default function TutorialApp() {
  const [knightPos, setKnightPos] = useState([1, 7]);
  // the observe function will return an unsubscribe callback
  useEffect(() => observe((newPos) => setKnightPos(newPos)));
  return (
    <div>
        <Board knightPosition={knightPos}/>
    </div>
  );
};