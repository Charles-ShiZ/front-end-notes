import React from 'react'
class SomeError extends React.Component {
    constructor(props) {
      super(props);
      this.state = { counter: 0 };
      this.handleClick = this.handleClick.bind(this);
    }

    myRef = React.createRef()

    componentDidMount() {
      // console.log(this.myRef.current)
    }
    
    handleClick() {
      this.setState(({counter}) => ({
        counter: counter + 1
      }));
    }
    
    render() {
      if (this.state.counter === 5) {
        // Simulate a JS error
        throw new Error('I crashed!');
      }
      setTimeout(() => {
        throw new Error('error')
      }, 3000)
      return <button ref={this.myRef} onClick={this.handleClick}>点击我5次就会报错：{this.state.counter}</button>;
    }
  }
export default SomeError