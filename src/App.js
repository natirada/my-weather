import React, { Component } from 'react';
import {Route, Switch , Redirect} from 'react-router-dom';
import WeatherForecast from './containers/WeatherForecast/WeatherForecast';
import Layout from './hoc/Layout/Layout'
import Favorite from './containers/Favorite/Favorite';
import {connect} from 'react-redux';
import * as actions from './store/Actions/index'

class App extends Component {

  componentDidMount() {
    this.props.initFavoritesCities();
  }


  render() {
    let route = (<Switch>
      <Route path="/favorite" component={Favorite}/>
      <Route path="/" component={WeatherForecast}/>
      <Redirect to="/" />
    </Switch>);

    return (
      <div >
        <Layout>
          {route}
        </Layout>
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
