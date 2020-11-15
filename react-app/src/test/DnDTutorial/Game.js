import React from 'react'

let knightPosition = [0,0]
let observer = null

export function observe(receive) {
    const randPos = () => Math.floor(Math.random() * 8)
    setInterval(() => receive([randPos(), randPos()]),500)
    // console.log('OK')
}



function emitChange() {
    observer(knightPosition)
}