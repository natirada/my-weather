import React, { Component } from 'react';
import {Route, Switch , Redirect} from 'react-router-dom';
import WeatherForecast from './containers/WeatherForecast/WeatherForecast';
import Layout from './hoc/Layout/Layout'
import Favorite from './containers/Favorite/Favorite';
import {connect} from 'react-redux';
import Settinges from './containers/Settings/Settings';
import * as actions from './store/Actions/index'


class App extends Component {

  componentDidMount() {
    this.props.initFavoritesCities();
  }

componentDidUpdate() {
  document.body.style.backgroundColor = this.props.isLight ? '#f5f5f5': '#473e3e';
}

  
  render() {
    let route = (<Switch>
        <Route path="/favorite" component={Favorite} {...this.props}/>
        <Route path="/" component={WeatherForecast} {...this.props}/>
        <Redirect to="/" />
    </Switch>);

    return (
      <div >
        <Route path="/settings"  component={Settinges}/>
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
const mapStateToProps = state => {
  return {
    isLight: state.Favorite.isLight
  }
}
export default connect(mapStateToProps, dispatchToProps)(App);
