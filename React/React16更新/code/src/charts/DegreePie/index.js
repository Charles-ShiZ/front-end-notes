import React from "react";
import './index.css'
export default class DegreePie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      percent: 0,
      isEnd:true //表示是否正在进行动画
    };
  }

  componentDidMount () {
    const { isEnd } = this.state
    const { percent = 90 } = this.props
    if(isEnd) this.increaseEffect('percent', percent , 50)
  }
  
  componentDidUpdate(prevProps){
    const { startAnimation } = this.props
    const { percent = 90 } = this.props
    if ((prevProps.startAnimation !== startAnimation) && startAnimation) {
        const { isEnd } = this.state
        if(isEnd) this.increaseEffect('percent', percent , 50)
    }
  }

  increaseEffect = (property,final,dur) => {
    let origin = 0
    this.setState({
      [property]: origin,
      isEnd:false
    })
    const interVal = setInterval(() => {
      origin++
      this.setState({
        [property]: origin
      })
      if(this.state[property] >= final)
      {
        clearInterval(interVal)
        this.setState({
          [property]: final,
          isEnd:true
        })
      }
    }, dur);
  }

  render() {
    const {
      width = 300,
      height = 300,
      r = 93,
      pieWidth = 20
    } = this.props
    const {
      percent
    } = this.state
    
    const circum = r * 2 * Math.PI;
    const cx = width/2;
    const cy = height/2;

    return (
      <div className="DegreePie">
        <svg id="svg" width={`${width}px`} height={`${height}px`}>
          <circle
            r={r}
            cx={cx}
            cy={cy}
            fill="transparent"
            stroke={"rgba(48, 214, 255, 1)"}
            strokeWidth={pieWidth}
            strokeDasharray = '6 8'
          />
          <circle
            r={r}
            cx={cx}
            cy={cy}
            id="circle"
            fill="transparent"
            stroke={"rgba(20, 20, 20, .50)"}
            strokeWidth={pieWidth}
            strokeDasharray={`${circum * ((100-percent) / 100)} ${circum}`}
            transform={`rotate(-90,${cx},${cy}) `}
          />
          <text
            x={cx}
            y={cy+10}
            fontWeight="bold"
            fontSize="80"
            fill="white"
            textAnchor="middle" dominantBaseline="middle"
          >
            {this.state.percent}%
          </text>
        </svg>
      </div>
    );
  }
}
