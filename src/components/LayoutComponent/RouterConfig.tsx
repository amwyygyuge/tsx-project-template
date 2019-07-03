import * as React from 'react'
import { Route, Switch } from 'react-router-dom'
type Result = React.ReactElement[]
type topLayout = React.ComponentClass | React.FC

export interface IRouter {
  name: string
  icon: string
  path: string
  Component?: React.ComponentClass<any>
  Layout?: React.ComponentClass<any>
  children?: IRouter[]
}

const resolveRoute = (routers: IRouter[], topPath: string, TopLayout?: topLayout): Result => {
  let routeChildren: Result = []
  routers.forEach(({ path, Component, Layout, children }) => {
    const realPath = `${topPath}${path}`
    if (Component) {
      if (TopLayout) {
        routeChildren.push(
          <Route
            key={realPath}
            exact
            path={realPath}
            render={props => <TopLayout {...props}><Component {...props} /></TopLayout>} />
        )
      } else {
        if (Layout) {
          routeChildren.push(
            <Route
              key={realPath}
              exact
              path={realPath}
              render={props => <Layout {...props}><Component {...props} /></Layout>} />
          )

        } else {
          routeChildren.push(<Route key={realPath} exact path={realPath} component={Component} />)
        }
      }
    }
    if (children) {
      routeChildren = routeChildren.concat(resolveRoute(children, realPath, Layout))
    }
  })
  return routeChildren
}

export interface IAppProps {
  routerConfig: IRouter[]
  TopLayout?: React.ComponentClass | React.FC
}

const RouterConfig: React.FunctionComponent<IAppProps> = (props) => {
  const { routerConfig } = props
  return <Switch>
    {resolveRoute(routerConfig, '')}
  </Switch>
}
export default RouterConfig
