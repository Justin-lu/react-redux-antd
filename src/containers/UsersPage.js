import React from 'react';
import { connect } from 'react-redux';

import CustomTable from './../components/CustomTable';
import StringFilterDropdown from './../components/StringFilterDropdown';
import DateTimeFilterDropdown from './../components/DateTimeFilterDropdown';

import { fetchUsers } from './../actions/users';
import { Input, Button, Row, Col } from 'antd';
const InputGroup = Input.Group;
const ButtonGroup = Button.Group;

// Which part of the Redux global state does our component want to receive as props?
function mapStateToProps(state) {
  const { users } = state;
  return {
    users
  };
}

// Which action creators does it want to receive by props?
function mapDispatchToProps(dispatch) {
  // bindActionCreators(ActionCreators, dispatch)
  return {
    fetchUsers: (params) => dispatch(fetchUsers(params))
  };
}

export class UsersPage extends React.Component {
  static propTypes = {
    fetchUsers: React.PropTypes.func,
    users: React.PropTypes.object
  };

  constructor(props) {
    super(props);
    this.handleTableChange = this.handleTableChange.bind(this);
    this.onSelectChange = this.onSelectChange.bind(this);
    this.state = {
      selectedRowKeys: []
    };
  }

  componentDidMount() {
    this.props.fetchUsers();
  }

  handleTableChange(pagination, filters = {}, sorter = {}) {
    const pageParams = { page: pagination.current, per_page: pagination.pageSize };
    const filtersField = {};
    if(Object.keys(filters).length !== 0) {
      // enum filters
      [{
        key: "roles", filterParams: "roles_in"
      }].map(item => {
        if(filters[item.key]){
          filtersField[`q[${item.filterParams}]`] = filters[item.key];
        }
      });

      // date range filter
      ['created_at'].map(item => {
        if(filters[item]){
          filtersField[`q[${item}_gteq]`] = filters[item][0];
          filtersField[`q[${item}_lteq]`] = filters[item][1];
        }
      });

      // string filter
      ['name'].map(item => {
        if(filters[item]){
          filtersField[`q[${item}_cont]`] = filters[item];
        }
      });
    }
    const sortParams = {};
    if (Object.keys(sorter).length !== 0) {
      const sortMethod = sorter.order === "descend" ? "desc" : "asc";
      sortParams['sorts'] = `${sorter.columnKey} ${sortMethod}`;
    }

    const params = Object.assign({}, pageParams, filtersField, sortParams);
    this.props.fetchUsers(params);
  }

  onSelectChange(selectedRowKeys) {
    this.setState({ selectedRowKeys });
  }

  render() {
    const { users: { data, meta, isFetching } } = this.props;
    const roleFilter = [{
      text: '管理员',
      value: 'admin'
    },{
      text: "普通用户",
      value: "normal"
    }];
    const columns = [
      {
        title: "ID",
        dataIndex: "id",
        key: "id"
      },
      {
        title: "邮箱",
        dataIndex: "email",
        key: "email"
      },
      {
        title: "姓名",
        dataIndex: "name",
        key: "name",
        sorter: true,
        filterDropdown: <StringFilterDropdown columnKey={"name"}/>
      },
      {
        title: "角色",
        dataIndex: "roles",
        key: "roles",
        sorter: true,
        filters: roleFilter
      },
      {
        title: "创建时间",
        dataIndex: "created_at",
        key: "created_at",
        sorter: true,
        filterDropdown: <DateTimeFilterDropdown columnKey={"created_at"}/>
      },
      {
        title: '操作',
        key: 'operation',
        render: () => (
          <ButtonGroup>
            <Button type="primary">操作一</Button>
            <Button type="ghost">操作二</Button>
          </ButtonGroup>
        )
      }
    ];

    const pagination = {
      showSizeChanger: true,
      total: meta.total,
      pageSize: meta.perPage,
      pageSizeOptions: ['1','10','20','40']
    };
    const { selectedRowKeys } = this.state;
    const rowSelection = {
     selectedRowKeys,
     onChange: this.onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;

    return (
      <div>
        <Row>
          <Col span={8}>
            <div style={{ marginBottom: 16 }}>
              <Button type="primary">批量操作</Button>
              <span style={{ marginLeft: 8 }}>
                {hasSelected ? `选择了 ${selectedRowKeys.length} 个对象` : ''}
              </span>
            </div>
          </Col>
          <Col span={8} offset={8}>
            <div className="ant-search-input-wrapper">
              <InputGroup className="ant-search-input">
                <Input placeholder="高级搜索"/>
                <div className="ant-input-group-wrap">
                  <Button icon="search" className="ant-search-btn" />
                </div>
              </InputGroup>
            </div>
          </Col>
        </Row>

        <CustomTable
          columns={columns}
          dataSource={data}
          pagination={pagination}
          rowKey={(record) => record.id}
          loading={isFetching}
          onChange={this.handleTableChange}
          rowSelection={rowSelection}
          bordered
        />
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UsersPage);
