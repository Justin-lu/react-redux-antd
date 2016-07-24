import React, { Component } from 'react';

import { connect } from 'react-redux';
import './HomePage.scss';

class HomePage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div>Home Page</div>;
  }
}

HomePage.propTypes = {
};

function mapStateToProps() {
  return {
  };
}

export default connect(mapStateToProps)(HomePage);
