import React, {useState} from 'react'
const ChildComp = React.memo(function () {
    console.log('render child-comp ...')
    return <div>Child Comp ...</div>
})
/* 加上memo后，ChildComp将不会无谓更新 */
// const ChildComp = function () {
//     console.log('render child-comp ...')
//     return <div>Child Comp ...</div>
// }

function ParentComp () {
    const [ count, setCount ] = useState(0)
    const increment = () => setCount(count + 1)

    return <>
        <button onClick={increment}>点击次数：{count}</button>
        <ChildComp />
    </>
}

export default ParentComp