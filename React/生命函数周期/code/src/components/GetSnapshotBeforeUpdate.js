import React, { Component } from 'react'

class Snapshot extends Component {
    constructor(props){
        super(props)
        this.state = {
            news:[]
        }
    }
    scollList = React.createRef()
    componentDidMount(){
        setInterval(() => {
            console.log(this.state)
            const { news } = this.state
            this.setState({
                news: [news.length + 1,...news]
            })
        }, 500);
    }
    render(){
        return <div id="scoll" ref={this.scollList} style={{
            height:"200px",
            overflow:"scroll"
        }}>
            {
                this.state.news.map((_, index) => {
                    return <div key={index}>新闻{_}</div>
                })
            }
        </div>
    }
    getSnapshotBeforeUpdate(){
        return {
            scrollHeight: this.scollList.current.scrollHeight
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot){
        this.scollList.current.scrollTop += this.scollList.current.scrollHeight - snapshot.scrollHeight
    }
}

export default Snapshot