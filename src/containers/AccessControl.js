// Note: 此组件做为权限控制的外层组件，只渲染有权限的数据
// Usage:
// <AccessControl ability="card_bindings_record">
//   <ul>
//   </ul>
// </AccessControl>
import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

class AccessControl extends Component {

  canHandleChildCompoment() {
    const { user, ability } = this.props;
    if (user) {
      return user.accessible_features.indexOf(ability) > -1;
    }
    return false;
  }

  render() {
    if (this.canHandleChildCompoment()) {
      return this.props.children;
    }
    return null;
  }
}

AccessControl.propTypes = {
  ability: PropTypes.string.isRequired,
  user: PropTypes.object,
  children: PropTypes.element.isRequired
};

function mapStateToProps(state) {
  const { auth: { user } } = state;
  return { user };
}

export default connect(mapStateToProps)(AccessControl);
