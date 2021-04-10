import { IGroup, IGroupQueryParams } from '@/pages/group/types';
import { Button, Dropdown, Menu, Modal } from 'antd';
import dotsIcon from '@/icons/dots-horizontal.svg';
import React from 'react';
import { ISidepanel } from '@/pages/utils/sidepanel/types';
import { connect } from 'umi';
import { EditOutlined } from '@ant-design/icons';

interface IGroupDeleteById {
  groupId: string;
  queryParams: IGroupQueryParams;
}

interface IProps {
  row: IGroup;
  open: (arg: ISidepanel) => void;
  groupDeleteById: (arg: IGroupDeleteById) => void;
  queryParams: IGroupQueryParams;
}

const ActionMenu = (props: IProps) => {
  const { row, queryParams } = props;

  const menuItems = [
    { key: 'edit', handler: 'edit', name: 'Edit' },
    { key: 'delete', handler: 'delete', name: 'Delete', danger: true },
  ];

  const menu = (row: IGroup) => (
    <Menu>
      {menuItems.map((el) => (
        <Menu.Item key={el.key} danger={el.danger} onClick={() => contextMenuClick(el.handler, row)}>
          {el.name}
        </Menu.Item>
      ))}
    </Menu>
  );

  const contextMenuClick = (handler: any, row: IGroup) => {
    if (handler === 'edit') {
      editHandler(row._id);
    }
    if (handler === 'delete') {
      deletePrompt(row);
    }
  };

  const editHandler = (groupId: string) => {
    props.open({
      title: 'Edit Group',
      component: 'GroupFormEdit',
      place: 'GroupDashboard',
      width: 800,
      groupId,
    });
  };

  const deletePrompt = (group: IGroup) => {
    Modal.confirm({
      title: `Do you want to delete?`,
      content: `${group.name}`,
      okType: 'danger',
      onOk: () => props.groupDeleteById({ groupId: group._id, queryParams }),
    });
  };

  return (
    <span>
      <div id="top-menu" role="menu" className="d-flex align-items-end">
        <Button type="link" onClick={() => editHandler(row._id)}>
          <EditOutlined className="edit-pen-icon" />
        </Button>

        <Dropdown overlay={menu(row)}>
          <span className="ant-dropdown-link">
            <img src={dotsIcon} alt="" height="27" />
          </span>
        </Dropdown>
      </div>
    </span>
  );
};

const mapDispatchToProps = (dispatch: any) => ({
  open: (payload: ISidepanel) => dispatch({ type: 'Sidepanel/open', payload }),
  groupDeleteById: (payload: IGroupDeleteById) => dispatch({ type: 'GroupDashboard/groupDeleteById', payload }),
});

export default connect(null, mapDispatchToProps)(ActionMenu);
