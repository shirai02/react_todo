// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// // import App from './App';
// import ToDo from './body'
// import * as serviceWorker from './serviceWorker';
// import SortableList from './test/dnd';
// import DnDTutorial from './test/DnDTutorial';

// ReactDOM.render(
//   <React.StrictMode>
//     {/* <App /> */}
//     {/* <ToDo /> */}
//     {/* <SortableList /> */}
//     <DnDTutorial />
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
