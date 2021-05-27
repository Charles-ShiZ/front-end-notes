# Class组件的生命周期函数
## 旧
1. 挂载时：
   >constructor → componentWillMount → render → (RealDom)  → componentDidMount

2. 更新时(有三种情况)：假设某组件为A组件，
   1. 第一种，由于A的父组件更新，从而导致A更新的情况：
      >componentWillReceiveProps → shouldComponentUpdate → componentWillUpdate → render → (RealDom) → componentDidUpdate
      注意：componentWillReceiveProps在子组件首次渲染时并不会触发。所以有些人建议更名为componentWillReceiveNewProps。
   2. 第二种，当A执行setState：
      >shouldComponentUpdate → componentWillUpdate → render → (RealDom) → componentDidUpdate
   3. 第三种，当A执行forceUpdate：
      >componentWillUpdate → render → (RealDom) → componentDidUpdate
    
3. 卸载时：
   >componentWillUnMount

## 新
1. 挂载时：
   >constructor → getDerivedStateFromProps → render → (RealDom)  → componentDidMount
2. 更新时(有两种情况)：
   1. 第一种，父组件更新或者setState时，
      >getDerivedStateFromProps → shouldComponentUpdate → render → getSnapShotBeforeUpdate → (RealDom)  → componentDidUpdate
   2. 第二种，forceUpdate,
      >getDerivedStateFromProps → render → getSnapShotBeforeUpdate → (RealDom)  → componentDidUpdate
3. 卸载时：
   >componentWillUnMount
4. getDerivedStateFromPropsuseDebugValue
   作用：保护父组件赋值给子组件的props不被其他途径所影响。比如说，组件A有一个动画开关的变量(animation)，你想要animation的值由父组件传入的props所确定。因为即使组件自身通过setState去改变animation的值，也必须经过getDerivedStateFromProps，那么已经修改的animation值还是会被来自父组件的props所覆盖。
   ```js
    class A {
        ...
        static getDerivedStateFromProps(props){
            console.log("getDerivedStateFromProps",props)
            return props
        }
        ...
    }

   ```
5. getSnapShotBeforeUpdate
   作用：记录组件更新前一刻的一些信息。例如，记录滚动区域内所有内容合起来的高度，然后在组件实际更新后，与实际的高度相减得到差值。
   ```js
    class B {
        ...
        getSnapshotBeforeUpdate(){
            return {
                scrollHeight: this.scollList.current.scrollHeight
            }
        }
        componentDidUpdate(prevProps, prevState, snapshot){
            this.scollList.current.scrollTop += this.scollList.current.scrollHeight - snapshot.scrollHeight
        }
        ...
    }

   ```