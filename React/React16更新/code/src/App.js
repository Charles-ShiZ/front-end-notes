import React, { useEffect, useState } from 'react'
import { ThemeContext } from './Context'
import { hot } from 'react-hot-loader/root'
import SomeError from "./components/SomeError"
import ErrorBoundary from "./components/ErrorBoundary"
import CreatePortal from "./components/CreatePortal"
import CreateContext from './components/CreateContext'
import ForwardRef from './components/ForwardRef'
import SuspenseComp from './components/SuspenseComp'
import Memo from './components/Memo'

const ref = React.createRef();
const App = () => {
    const [ theme, setTheme ] = useState('rgba(255, 135, 141, 1)')
    const [ count, setCount ] = useState(0)

    useEffect(()=>{
        let i = 0
        const interval = setInterval(() => {
            setCount(++i)
            if(i === 5) {
                setTheme('blue')
                clearInterval(interval)
            }
        }, 1000);
    },[])

    return (
        <React.Fragment>
            <header style={{
                textAlign:'center',
                fontSize:'40px'
            }}>
                <span>React </span>
                <span style={{color:"#009A61"}}>16</span>
                <span> </span>
                <span style={{fontSize:'20px'}}>新特性</span>
            </header>
            {/* React 16特性：错误边界 */}
            <section>
                <div style={{fontSize:'20px'}}>
                    <span style={{fontSize:'50px',color:"rgba(52, 131, 223, 1)"}}>1</span>
                    <span style={{color:"rgba(52, 131, 223, 1)"}}>. </span>
                    <span>错误边界</span>
                </div>
                <div style={{
                    border:"3px solid rgba(56, 179, 255, 1)",
                    borderRadius:"8px",
                    padding:'10px',
                }}>
                    <ErrorBoundary>
                        <SomeError/>
                        <p>如果错误边界包裹的组件未出现错误，那么将出现这句话。</p>
                    </ErrorBoundary>
                </div>
            </section>
            {/* React 16特性：createPortal */}
            <section>
                <div style={{fontSize:'20px'}}>
                    <span style={{fontSize:'50px',color:"rgba(52, 131, 223, 1)"}}>2</span>
                    <span style={{color:"rgba(52, 131, 223, 1)"}}>. </span>
                    <span>createPortal</span>
                </div>
                <div style={{
                    border:"3px solid orange",
                    borderRadius:"8px",
                    padding:'10px',
                }}>
                    <div style={{height:'50px',width:'50px'}}></div>
                    <CreatePortal>
                        <div style={{
                            border:"2px solid black",
                            position:"absolute",
                            top:"300px",
                            right:"200px",
                            width:"200px",
                            padding:'10px'
                        }}>本来我应该在橙色框里，但是由于createPortal的作用，我已经与root节点同级别了</div>
                    </CreatePortal>
                </div>
            </section>
            {/* React 16特性：createContext */}
            <section>
                <div style={{fontSize:'20px'}}>
                    <span style={{fontSize:'50px',color:"rgba(52, 131, 223, 1)"}}>3</span>
                    <span style={{color:"rgba(52, 131, 223, 1)"}}>. </span>
                    <span>createContext</span>
                </div>
                <div style={{
                    border:"3px solid rgba(56, 179, 255, 1)",
                    borderRadius:"8px",
                    padding:'10px',
                }}>
                    5秒后更改为蓝色: {count}
                    <ThemeContext.Provider value = {{
                        themeColor: theme
                    }}>
                        <CreateContext/>
                    </ThemeContext.Provider>
                </div>
            </section>
            {/* React 16特性：createRef 和 forwardRef */}
            <section>
                <div style={{fontSize:'20px'}}>
                    <span style={{fontSize:'50px',color:"rgba(52, 131, 223, 1)"}}>3</span>
                    <span style={{color:"rgba(52, 131, 223, 1)"}}>. </span>
                    <span>createRef 和 forwardRef</span>
                </div>
                <div style={{
                    border:"3px solid rgba(56, 179, 255, 1)",
                    borderRadius:"8px",
                    padding:'10px',
                }}>
                    <ForwardRef ref={ref}>Click me and get the ref </ForwardRef>
                </div>
            </section>
            {/* React 16特性：React.memo */}
            <section>
                <div style={{fontSize:'20px'}}>
                    <span style={{fontSize:'50px',color:"rgba(52, 131, 223, 1)"}}>4</span>
                    <span style={{color:"rgba(52, 131, 223, 1)"}}>. </span>
                    <span>React.memo</span>
                </div>
                <div style={{
                    border:"3px solid rgba(56, 179, 255, 1)",
                    borderRadius:"8px",
                    padding:'10px',
                }}>
                    <Memo></Memo>
                </div>
            </section>
            {/* React 16特性：lazy 和 suspense */}
            <section>
                <div style={{fontSize:'20px'}}>
                    <span style={{fontSize:'50px',color:"rgba(52, 131, 223, 1)"}}>5</span>
                    <span style={{color:"rgba(52, 131, 223, 1)"}}>. </span>
                    <span>lazy 和 suspense</span>
                </div>
                <div style={{
                    border:"3px solid rgba(56, 179, 255, 1)",
                    borderRadius:"8px",
                    padding:'10px',
                }}>
                    <SuspenseComp></SuspenseComp>
                </div>
            </section>

        </React.Fragment>
    )
}

export default App