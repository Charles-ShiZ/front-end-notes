import React, { Component, useState, useEffect } from 'react'
import charts from './charts'
import { getDefault } from './utils'
import GetSnapshotBeforeUpdate from './components/GetSnapshotBeforeUpdate'
const { DegreePie } = getDefault(charts)

export default class App extends Component {
    constructor(props){
        super(props)
        this.state = {
            name:'xie',
            gender:"male"
        }
        console.log('[App]',"constructor")
    }
    static getDerivedStateFromProps(props){
        console.log("getDerivedStateFromProps",props)
        return props
    }
    componentWillMount(){
        console.log('[App]',"componentWillMount")
    }
    componentWillReceiveProps(){
        console.log('[App]',"componentWillReceiveProps")
    }
    shouldComponentUpdate(){
        console.log('[App]',"shouldComponentUpdate")
        return true
    }
    componentWillUpdate(){
        console.log('[App]',"componentWillUpdate")
    }
    render() {
        console.log('[App]',"render",this.state)
        return <React.Fragment>
            <DegreePie
                App = {this.state.App}
                r = { 93 }
                pieWidth = { 20 }
            />
            
            <GetSnapshotBeforeUpdate></GetSnapshotBeforeUpdate>
        </React.Fragment>
    }
    componentDidMount(){
        console.log('[App]',"componentDidMount")
        setTimeout(() => {
            console.log("forceUpdate")
            this.state = {
                name:'xieqicheng',
                gender:"男"
            }
            this.forceUpdate()
        }, 3000);
    }
    componentDidUpdate(){
        console.log("[App]","componentDidUpdate",this.state)
    }
}