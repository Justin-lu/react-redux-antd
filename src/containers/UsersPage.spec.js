import chai, { expect } from 'chai';
import sinon from "sinon";
import sinonChai from "sinon-chai";

import React from 'react';
import { mount, shallow } from 'enzyme';
import { UsersPage } from './UsersPage';
import { Col } from 'antd';

const db = require('./../data/db.json');

chai.use(sinonChai);

function setup() {
  const props = {
    fetchUsers: sinon.spy(),
    users: {
      isFetching: false,
      errorMessage: '',
      meta: {
        total: db.users.meta.total,
        perPage: db.users.meta.per_page,
        page: db.users.meta.page
      },
      data: db.users.data
    }
  };

  const enzymeWrapper = shallow(<UsersPage {...props} />);
  const mountWrapper = mount(<UsersPage {...props} />);

  return {
    props,
    enzymeWrapper,
    mountWrapper
  };
}

describe('UsersPage container', () => {
  it('should render self with props', () => {
    // componentDidMount
    const { mountWrapper, props } = setup();
    expect(props.fetchUsers).to.have.been.calledOnce;

    // simulates click to trigger handleTableChange with page 2
    mountWrapper.find('.ant-pagination-item-2').simulate('click');
    expect(props.fetchUsers).to.have.been.calledWith({ page: 2, per_page: db.users.meta.per_page });
  });

  it('should render two <Col /> components', () => {
    const { enzymeWrapper } = setup();
    expect(enzymeWrapper.find(Col)).to.have.length(2);
  });

  it('should render <CustomTable /> components and props', () => {
    const { enzymeWrapper } = setup();
    const tableProps = enzymeWrapper.find('CustomTable').props();
    expect(tableProps.dataSource).to.deep.equal(db.users.data);
  });
});
