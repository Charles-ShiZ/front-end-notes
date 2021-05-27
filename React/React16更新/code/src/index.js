import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './index.css'
function render() {
    const root = document.getElementById("root")
    root ? ReactDOM.render(<App />, root) : false
}
/*手动卸载节点，触发componentWillUnmount*/
// setTimeout(() => {
//     ReactDOM.unmountComponentAtNode(root)
// }, 5000);
render()

// if (module.hot) {
//     module.hot.accept('./components/test1', () => {
//         console.log('./components/test1')
//         render()
//     })
// }