import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAds, fetchAdsMetrics } from '../actions'

class App extends Component {
  componentDidMount() {
    this.props.fetchAds();
    this.props.fetchAdsMetrics();
  }
  render() {
    //we have ads, and adsMetrics in this.props.ads adsMetrics
    return (
      <div>setting up react</div>
    );
  }
}

const mapStateToProps = (state) => {
  const { ads, adsMetrics } = state;
  return { ads, adsMetrics };
};

export default connect( mapStateToProps,
  { fetchAds, fetchAdsMetrics }
)(App);
