import ReactDom from '../modules/react-dom'
import React from '../modules/react'
import Todos from './components/Todos'

let element = React.createElement(Todos, {name:'todos'});
ReactDom.render(element, document.getElementById('root'));