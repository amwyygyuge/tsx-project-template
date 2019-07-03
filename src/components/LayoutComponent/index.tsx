import * as React from 'react'
import { Layout } from 'antd'
import { Link } from 'react-router-dom'
import RouterConfig, { IRouter } from './RouterConfig'
import { Menu, Icon } from 'antd'
const { Item, SubMenu } = Menu
const { Header, Content, Footer } = Layout
export interface IAppProps {
  routerConfig: IRouter[]
}
type Result = React.ReactElement[]

const creatMenus = (routers: IRouter[], topPath: string): Result => {
  const menus: Result = []
  routers.forEach(({ name, icon, path, children }) => {
    const realPath = `${topPath}${path}`
    if (children) {
      const TopMenu = <SubMenu key={realPath} title={
        <span>
          {icon ? <Icon type="icon" /> : null}
          {name}
        </span>
      }>
        {creatMenus(children, realPath)}
      </SubMenu>
      menus.push(TopMenu)
    } else {
      menus.push(<Item key={realPath}>
        <Link to={realPath}>
          {icon ? <Icon type="icon" /> : null}
          {name}
        </Link>
      </Item>)
    }
  })
  return menus
}
const LayoutComponent: React.FunctionComponent<IAppProps> = ({ routerConfig }) =>
  <Layout className="layout">
    <Header>
      <div className="logo" />
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={['2']}
        style={{ lineHeight: '64px' }}
      >
        {creatMenus(routerConfig, '')}
      </Menu>
    </Header>
    <Content style={{ padding: '0 50px' }}>
      <div className="App">
        <header className="App-header">

          <p>
            dwadaw <code>src/App.tsx</code> and to dwadwadw.
        </p>

        </header>
      </div>
      <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
        <RouterConfig routerConfig={routerConfig} />
      </div>
    </Content>
    <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
  </Layout>

export default LayoutComponent
