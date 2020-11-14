import React from 'react'
import Board from './Board'

// ToDo ゲーム状態の追加から

export default function DnDTutorial() {
    return(
        <React.Fragment>
            <Board knightPosition={[7,4]} />
        </React.Fragment>
    )
}