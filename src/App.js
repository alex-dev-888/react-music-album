import './App.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import AlbumPage from './pages/AlbumPage'
import Nav from './components/Nav'
import AlbumDetailPage from './pages/AlbumDetailPage'

function App() {
  return (
    <Router>
      <Nav />
      <Switch>
        <Route exact path='/'>
          <AlbumPage />
        </Route>
        {/* <Route path='/album'>
          <AlbumPage />
        </Route> */}
        <Route path='/album/:id'>
          <AlbumDetailPage />
        </Route>
        {/* <Route path='/cocktail/:id'>
          <SingleCocktail />
        </Route>
        <Route path='*'>
          <Error />
        </Route> */}
      </Switch>
    </Router>
  )
}

export default App
