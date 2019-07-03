import * as React from 'react'
import ReactDOM from 'react-dom'

export default class App extends React.Component<any, any> {
  public node: HTMLDivElement
  constructor(props: any) {
    super(props)
    this.node = document.createElement('div')
    document.body.appendChild(this.node)
  }
  public componentWillUnmount() {
    document.body.removeChild(this.node)
  }
  public render() {
    if (!this.node) {
      this.node = document.createElement('div')
    }
    return ReactDOM.createPortal(<p>我的天啦竟然可用了</p>, this.node)
  }
}
