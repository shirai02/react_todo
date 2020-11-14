import React, { useState, useCallback, useRef, FC } from "react"
import { useDrag, useDrop, DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"

const DND_GROUP = "list"


const List = ({ index, text, swapList }) => {
  const ref = useRef(null)
  const [, drop] = useDrop({
    accept: DND_GROUP,
    drop(item) {
      if (!ref.current || item.index === index) {
        return
      }
      swapList(item.index, index)
    }
  })
  const [, drag] = useDrag({
    item: { type: DND_GROUP, index }
  })
  drag(drop(ref))
  return <li ref={ref}>{text}</li>
}

const ListView = () => {
  const [list, setList] = useState(["foo", "bar", "baz", "hoge", "huga"])
  const swapList = useCallback(
    (sourceIndex, targetIndex) => {
      [list[targetIndex], list[sourceIndex]] = [list[sourceIndex], list[targetIndex]]
      setList(list.splice(0))
    },
    [list]
  )
  return (
    <ul>
      {list.map((text, index) => (
        <List key={index} text={text} index={index} swapList={swapList} />
      ))}
    </ul>
  )
}

const App= () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <ListView />
    </DndProvider>
  )
}

export default App;