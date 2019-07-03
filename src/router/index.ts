import Home from './../pages/Home'
import HomeLayout from './../pages/HomeLayout'
const routerConfig = [
  {
    name: '主页',
    icon: 'home',
    path: '/home',
    // Component: Home,
    Layout: HomeLayout,
    children: [
      {
        name: '主页',
        icon: 'home',
        path: '/room',
        Component: Home,
        Layout: HomeLayout
      }
    ]
  }
]

export default routerConfig
