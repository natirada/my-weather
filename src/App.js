import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import {Route, Switch , Redirect} from 'react-router-dom';
import WeatherForecast from './containers/WeatherForecast/WeatherForecast';
import Favorite from './containers/Favorite/Favorite';
import {connect} from 'react-redux';
import * as actions from './store/Actions/index'

class App extends Component {

  componentWillMount() {
    this.props.initFavoritesCities();    
  }
  render() {
    return (
      <div >
        <Navigation />
        <Switch>
          <Route path="/favorite" component={Favorite}/>
          <Route path="/" component={WeatherForecast}/>
          <Redirect to="/" />
        </Switch>
      </div>
    )
  }
}

const dispatchToProps = dispatch => {
  return {
    initFavoritesCities: () => dispatch(actions.initFavoritesCities())
  }
}

export default connect(null, dispatchToProps)(App);
