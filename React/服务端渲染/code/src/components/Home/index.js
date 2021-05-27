import React from 'react'
function handleData () {
    console.log("handleData")
}
export default function Home () {
    return <div onClick={handleData}>HomedA</div>
}