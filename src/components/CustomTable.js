import { Table } from 'antd';
import { PropTypes } from 'react';

class CustomTable extends Table {
  constructor(props) {
    super(props);
    this.handleCustomFilter = this.handleCustomFilter.bind(this);
  }
  getChildContext() {
    return { handleCustomFilter: this.handleCustomFilter };
  }

  handleCustomFilter(key, nextFilter) {
    let pagination = Object.assign({}, this.state.pagination);
    const filters = Object.assign({}, this.state.filters, nextFilter);

    // Remove filters not in current columns
    const currentColumnKeys = this.props.columns.map(c => this.getColumnKey(c));
    Object.keys(filters).forEach((columnKey) => {
      if (currentColumnKeys.indexOf(columnKey) < 0) {
        delete filters[columnKey];
      }
    });

    if (this.props.pagination) {
      // Reset current prop
      pagination.current = 1;
      pagination.onChange(pagination.current);
    }

    const newState = {
      selectionDirty: false,
      pagination
    };
    const filtersToSetState = Object.assign({}, filters);
    // Remove filters which is controlled
    this.getFilteredValueColumns().forEach(col => {
      const columnKey = this.getColumnKey(col);
      if (columnKey) {
        delete filtersToSetState[columnKey];
      }
    });
    if (Object.keys(filtersToSetState).length > 0) {
      newState.filters = filtersToSetState;
    }

    // Controlled current prop will not respond user interaction
    if (this.props.pagination && 'current' in this.props.pagination) {
      newState.pagination = Object.assign({}, pagination, {
        current: this.state.pagination.current
      });
    }

    this.setState(newState, () => {
      this.props.onChange(...this.prepareParamsArguments(Object.assign({}, this.state, {
        selectionDirty: false,
        filters,
        pagination
      })));
    });
  }
}

CustomTable.childContextTypes = {
  handleCustomFilter: PropTypes.func
};

export default CustomTable;
