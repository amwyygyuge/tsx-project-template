import * as React from 'react'
import { observer, inject } from 'mobx-react'
import { RouteComponentProps } from 'react-router'
import { IDict } from './../mobx/dict'
import { RouterStore } from 'mobx-react-router'
import Test from './../components/Test'
export interface IAppProps extends RouteComponentProps {
  dict: IDict
  router: RouterStore
}
@inject('dict', 'router')
@observer
export default class Home extends React.Component<IAppProps, any> {
  public render() {
    console.log(this.props.router)
    console.log(this.props.dict.dicts.staffs)
    return (
      <div>
        <Test />
        测试路由dadwa
          {this.props.children}
      </div>
    )
  }
}
