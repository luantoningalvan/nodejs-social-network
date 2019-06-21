import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import promise from 'redux-promise'
import multi from 'redux-multi'
import thunk from 'redux-thunk'
import reducers from './rootReducer'

// Telas
// # Página Inicial
import Home from './home/home'

// # Livros
import Books from './books/books'
import SingleBook from './books/singleBook'

// # Podcasts
import Podcasts from './podcasts/podcasts'

// # Artigos
import Articles from './articles/articles'

const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
const store = applyMiddleware(multi, thunk, promise)(createStore)(reducers, devTools)

export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />

          <Route exact path="/livros" component={Books} />
          <Route path="/livros/:id" component={SingleBook} />

          <Route path="/podcasts" component={Podcasts} />

          <Route path="/artigos" component={Articles} />
        </Switch>
      </Router>
    </Provider>
  )
}
