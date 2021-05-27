import React from 'react'
const ForwardRef = React.forwardRef((props, ref) => {
        return (
            <button ref={ref} className="ForwardRef" onClick={()=>{
                console.log(ref)
            }}>
                {props.children}
            </button>
        )
    }
)
export default ForwardRef

// 替代方法，但不优雅
function ForwardRef2(props) {
    return <button ref={props._ref} className="FancyButton" onClick={()=>{
        console.log(props._ref)
    }}>
      {props.children}
    </button>
}