# Hook
## useState
```js
    const [name, setName] = useState('shizhanhong')
    setName('xieqicheng')
```
## useEffect
```js
    useEffect(()=>{
        const interval = setInterval(()=>{
            console.log('2323')
        }, 2000)
        return ()=>{
            clearInterval(interval)
        }
    }, [])
```
## useRef
```js
    function TextInputWithFocusButton() {
        const inputEl = useRef(null)
        const onButtonClick = () => {
            // `current` 指向已挂载到 DOM 上的文本输入元素
            inputEl.current.focus()
        }
        return (
            <>
                <input ref={inputEl} type="text" />
                <button onClick={onButtonClick}>Focus the input</button>
            </>
        )
    }
```
## useContext
```js
    const themes = {
        light: {
            foreground: "#000000",
            background: "#eeeeee"
        },
        dark: {
            foreground: "#ffffff",
            background: "#222222"
        }
    }

    const ThemeContext = React.createContext(themes.light);

    function App() {
        return (
            <ThemeContext.Provider value={themes.dark}>
            <Toolbar />
            </ThemeContext.Provider>
        );
    }

    function Toolbar(props) {
        return (
            <div>
            <ThemedButton />
            </div>
        );
    }

    function ThemedButton() {
        const theme = useContext(ThemeContext);
        return (
            <button style={{ background: theme.background, color: theme.foreground }}>
            I am styled by theme context!
            </button>
        );
    }
```
## useMemo、useCallback
假设一个场景：
```js
    function ChildComp () {
        console.log('render child-comp ...')
        return <div>Child Comp ...</div>
    }

    function ParentComp () {
        const [ count, setCount ] = useState(0)
        const increment = () => setCount(count + 1)

        return (
            <div>
                <button onClick={increment}>点击次数：{count}</button>
                <ChildComp />
            </div>
        );
    }
```
当ParentComp组件更新时，ChildComp也会跟着更新(你会看到控制台打印出'render child-comp ...')。但你想要的结果是ChildComp不随着ParentComp更新而更新，因为ChildComp压根没有发生变化。那么可以使用React.memo()
```js
    const ChildComp = React.memo(function () {
        console.log('render child-comp ...')
        return <s>Child Comp ...</s>
    })

    function ParentComp () {
        const [ count, setCount ] = useState(0)
        const increment = () => setCount(count + 1)

        return <>
            <button onClick={increment}>点击次数：{count}</button>
            <ChildComp />
        </>
    }
```
React.memo相当于PureComponent，阻止ChildComp进行无谓的更新。但这也仅仅是没有给ChildComp传递属性时才有效。假如：
```js
    const ChildComp = React.memo(function () {
        console.log('render child-comp ...')
        return <div>Child Comp ...</div>
    })

    function ParentComp () {
        const [ count, setCount ] = useState(0)
        const increment = () => setCount(count + 1)

        const [ name, setName ] = useState('hi~')
        const changeName = (newName) => setName(newName)
        const info = { name, age }

        return <>
            <button onClick={increment}>点击次数：{count}</button>
            <ChildComp info={info} changeName={changeName} />
        </>
    }
```
这样，当点击ParentComp的按钮，ParentComp更新的时候，ChildComp也会跟着更新了。为什么呢？因为ParentComp的更新意味着重新创建了changeName和info，让引用发生了改变，从而导致ChildComp再次无谓更新。所以这时，useMemo和useCallback就发挥作用了:
```js
    const ChildComp = React.memo(function () {
        console.log('render child-comp ...')
        return <div>Child Comp ...</div>
    })

    function ParentComp () {
        const [ count, setCount ] = useState(0)
        const increment = () => setCount(count + 1)

        const [ name, setName ] = useState('hi~')
        const changeName = useCallback((newName) => setName(newName), [])
        const info = useMemo(() => ({ name, age }), [name, age]) // 第二个参数的意思是，仅当name和age发生变化时，info才会重新创建。

        return <>
            <button onClick={increment}>点击次数：{count}</button>
            <ChildComp info={info} changeName={changeName} />
        </>
    }
```
*参考：https://www.jianshu.com/p/014ee0ebe959
## useReducer
```js
    const initialState = { count: 0 }

    function reducer(state, action) {
        switch (action.type) {
            case 'increment':
            return {count: state.count + 1}
            case 'decrement':
            return {count: state.count - 1}
            default:
            throw new Error()
        }
    }

    function Counter() {
        const [state, dispatch] = useReducer(reducer, initialState)
        return (
            <>
            Count: {state.count}
            <button onClick={() => dispatch({type: 'decrement'})}>-</button>
            <button onClick={() => dispatch({type: 'increment'})}>+</button>
            </>
        )
    }
```
## useImperativeHandle
```js
    function FancyInput(props, ref) {
        const inputRef = useRef()
        useImperativeHandle(ref, () => ({
            focus: () => {
                inputRef.current.focus()
            }
        }))
        return <input ref={inputRef} ... />
    }
    FancyInput = forwardRef(FancyInput)
```
## useLayoutEffect
基本与useEffect一样。唯一区别是，当useLayoutEffect里面函数的执行涉及DOM操作，那么useLayoutEffect会强制堵塞浏览器的绘制，直到DOM操作执行完毕，目的是为了防止视觉上的页面闪屏情况。
```js
import React, { useEffect, useLayoutEffect, useRef } from "react";
import TweenMax from "gsap/TweenMax";
import './index.less';

const Animate = () => {
    const REl = useRef(null);
    useLayoutEffect(() => {
        /*下面这段代码的意思是当组件加载完成后,在0秒的时间内,将方块的横坐标位置移到600px的位置*/
        TweenMax.to(REl.current, 0, {x: 600})
    }, []);
    /*对比*/
    // useEffect(() => {
    //     TweenMax.to(REl.current, 0, {x: 600})
    // }, []);
    return (
        <div className='animate'>
            <div ref={REl} className="square">square</div>
        </div>
    );
};

export default Animate;
```
*参考：https://www.jianshu.com/p/412c874c5add
## useDebugValue