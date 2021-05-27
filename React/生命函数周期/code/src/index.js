import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './index.scss'

function render() {
    const root = document.getElementById("root")
    root ? ReactDOM.render(<App name="shizhanhong" />, root) : false
}

render()