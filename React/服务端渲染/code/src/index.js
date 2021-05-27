import React from 'react'
import ReactDom from 'react-dom'
import App from './App'
const App2 = <App key="2" ><App></App></App>
console.log(App2)
ReactDom.hydrate(<App />, document.getElementById('root'))