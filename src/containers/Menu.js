import React from 'react';
import { connect } from 'react-redux';

// function mapStateToProps(state) {
//   return {

//   };
// }

export class Menu extends React.Component {
  static propTypes = {
    name: React.PropTypes.string
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div></div>
    );
  }
}

export default connect(
  // mapStateToProps,
)(Menu);
