import React, { Component, PropTypes } from 'react';
import { DatePicker } from 'antd';
import dateFormat from 'dateformat';
const RangePicker = DatePicker.RangePicker;

export default class DateTimeFilterDropdown extends Component {
  static propTypes = {
    columnKey: PropTypes.string.isRequired,
    dateFormatString: PropTypes.string
  };

  static contextTypes = {
    handleCustomFilter: PropTypes.func
  };

  static defaultProps = {
    dateFormatString: "yyyymmdd"
  }

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleClearFilters = this.handleClearFilters.bind(this);
  }

  handleChange(value){
    const { columnKey, dateFormatString } = this.props;
    const filters = {
      [columnKey]: [dateFormat(value[0], dateFormatString), dateFormat(value[1], dateFormatString)]
    };
    this.context.handleCustomFilter(columnKey, filters);
  }

  // TODO: 由于ant-design filterDropdown 并未提供设置dropdown是否显示的接口，后续需要增加自动关闭dropdown的功能
  handleClearFilters() {
    const { columnKey } = this.props;
    this.context.handleCustomFilter(columnKey, {[columnKey]: []});
  }

  render() {
    return (
      <div className="ant-table-filter-dropdown">
        <RangePicker
          style={{ width: 184, padding: "10px" }}
          onChange={this.handleChange}
        />

        <div className="ant-table-filter-dropdown-btns">
          <a
            className="ant-table-filter-dropdown-link clear"
            onClick={this.handleClearFilters}
            style={{ float: "right" }}
          >
            重置
          </a>
        </div>
      </div>
    );
  }
}
