// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// // import App from './App';
// import ToDo from './body'
// import * as serviceWorker from './serviceWorker';
// import SortableList from './test/dnd';
// import TutorialApp from './test/DnDTutorial/index';
// import {DndProvier} from 'react-dnd'
// import {HTML5Backend} from 'react-dnd-html5-backend'

// ReactDOM.render(
//   <React.StrictMode>
//     {/* <App /> */}
//     {/* <ToDo /> */}
//     {/* <SortableList /> */}
//     <DndProvier backend={HTML5Backend}>
//       <TutorialApp />
//     </DndProvier>
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();

import React from 'react'
import ReactDOM from 'react-dom'
import Board from './test/DnDTutorial/Board'
import {observe} from './test/DnDTutorial/Game'

// ToDo ゲーム状態の追加から

const root = document.getElementById('root')

observe((knightPosition) =>
  ReactDOM.render(<Board knightPosition={knightPosition} />, root)
)
