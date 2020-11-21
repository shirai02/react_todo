import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import ToDo from './body'
import * as serviceWorker from './serviceWorker';
// import SortableList from './test/dnd';
import DnDTutorial from './test/DnDTutorial';
import {DndProvider} from 'react-dnd'
import {HTML5Backend} from 'react-dnd-html5-backend'

ReactDOM.render(
  <React.StrictMode>
    {/* <App /> */}
    {/* <ToDo /> */}
    {/* <SortableList /> */}
    <DndProvider backend={HTML5Backend}>
      <DnDTutorial />
    </DndProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();