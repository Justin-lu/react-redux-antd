import React, { Component, PropTypes } from 'react';
import { Input } from 'antd';

export default class StringFilterDropdown extends Component {
  static propTypes = {
    columnKey: PropTypes.string.isRequired
  };

  static contextTypes = {
    handleCustomFilter: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.handleConfirm = this.handleConfirm.bind(this);
    this.handleClearFilters = this.handleClearFilters.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.state = {
      inputFilter: ''
    };
  }

  // TODO: 由于ant-design filterDropdown 并未提供设置dropdown是否显示的接口，后续需要增加自动关闭dropdown的功能
  handleConfirm(){
    const { columnKey } = this.props;
    const filters = { [columnKey]: this.state.inputFilter };
    this.context.handleCustomFilter(columnKey, filters);
  }

  handleInputChange(event){
    this.setState({ inputFilter: event.target.value });
  }

  // TODO: 由于ant-design filterDropdown 并未提供设置dropdown是否显示的接口，后续需要增加自动关闭dropdown的功能
  handleClearFilters() {
    const { columnKey } = this.props;
    this.setState({ inputFilter: ''});
    this.context.handleCustomFilter(columnKey, {[columnKey]: []});
  }

  render() {
    return (
      <div className="ant-table-filter-dropdown">
        <Input
          placeholder="请输入查询条件"
          value={this.state.inputFilter}
          onChange={this.handleInputChange}
          style={{ width: 184, margin: "10px" }}
        />
        <div className="ant-table-filter-dropdown-btns">
          <a
            className="ant-table-filter-dropdown-link confirm"
            onClick={this.handleConfirm}
          >
            确认
          </a>
          <a
            className="ant-table-filter-dropdown-link clear"
            onClick={this.handleClearFilters}
          >
            重置
          </a>
        </div>
      </div>
    );
  }
}
