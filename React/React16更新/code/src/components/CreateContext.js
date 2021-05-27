import React from 'react'
import { ThemeContext } from '../Context.js'
/*旧方法*/
class ContextTest extends React.Component {
    render() {
        return (
            <React.Fragment>
                <ThemeContext.Consumer>
                    { value => 
                        <div style={{display:"flex",alignItems:"center"}}><span>主题：</span><span style={{display:"inline-block",width:"20px",height:"20px",backgroundColor:value.themeColor}}></span></div>
                    }
                </ThemeContext.Consumer>
            </React.Fragment>
        )
    }
}

export default ContextTest