import React from 'react'
class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { error: null, errorInfo: null };
      console.log(props)
    }
    
    // static getDerivedStateFromError(error) {
    //   return { hasError: true };
    // }

    componentDidCatch(error, errorInfo) {
      console.log('出错啦',error, errorInfo)
      // Catch errors in any components below and re-render with error message
      this.setState({
        error: error,
        errorInfo: errorInfo
      })
      // You can also log error messages to an error reporting service here
    }
    
    render() {
      // 有错误的时候展示回退
      if (this.state.errorInfo) {
        // Error path
        return (
          <div>
            <h2>Something went wrong.</h2>
            <details style={{ whiteSpace: 'pre-wrap' }}>
              {this.state.error && this.state.error.toString()}
              <br />
              {this.state.errorInfo.componentStack}
            </details>
          </div>
        );
      }
      // 正常的话，直接展示组件
      return this.props.children;
    }  
  }

export default ErrorBoundary