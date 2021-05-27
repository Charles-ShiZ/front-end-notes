import React from 'react'
import { ThemeContext } from '../Context.js'
/*新方法，简化了Consumer操作*/
class ContextTest extends React.Component {
    static contextType = ThemeContext
    render() {
        console.log(this.context)
        return (
            <React.Fragment>
                <div style={{display:"flex",alignItems:"center"}}>
                    <span>主题：</span>
                    <span style={{
                        display:"inline-block",
                        width:"20px",
                        height:"20px",
                        backgroundColor:this.context.themeColor
                    }}>
                    </span>
                </div>
            </React.Fragment>
        )
    }
}
export default ContextTest