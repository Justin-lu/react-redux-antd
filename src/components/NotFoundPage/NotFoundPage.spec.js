// 测试示例文件
// 测试文件统一以Component + .spec + .js 命名

import React from 'react';
import {shallow} from 'enzyme';
import {expect} from 'chai';
import NotFoundPage from './NotFoundPage';

describe('<NotFoundPage />', () => {
  it('should have a header called \'404\'', () => {
    const wrapper = shallow(<NotFoundPage />);
    const actual = wrapper.find('h1').text();
    const expected = '404';

    expect(actual).to.equal(expected);
    expect(wrapper.find('h1').hasClass('title')).to.equal(true);
  });
});
