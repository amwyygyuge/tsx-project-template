import * as React from 'react'
import './App.css'
import LayoutComponent from './components/LayoutComponent/'
import routerConfig from './router'
import { Provider } from 'mobx-react'
import { Dict } from './mobx/dict'
import { Router } from 'react-router-dom'
import { createHashHistory } from 'history'
import { RouterStore, syncHistoryWithStore } from 'mobx-react-router'
const browserHistory = createHashHistory()
const routerStore = new RouterStore()
const history = syncHistoryWithStore(browserHistory, routerStore)
const rootStore = {
  dict: new Dict(),
  router: routerStore
}
const App: React.FC = () => {
  return (
    <Provider {...rootStore}>
      <Router history={history}>
        <LayoutComponent routerConfig={routerConfig} />
      </Router>
    </Provider>
  )
}



export default App
