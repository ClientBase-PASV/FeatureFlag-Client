import React from 'react';
import { connect } from 'umi';
import { Button } from 'antd';
import { ISidepanel } from '@/pages/utils/sidepanel/types';

interface IProps {
  open: (arg: ISidepanel) => void;
}

const GroupDashboardControls = (props: IProps) => {
  const groupCreate = () => {
    props.open({
      title: 'Create new Group',
      component: 'GroupFormCreate',
      place: 'GroupDashboard',
      width: 800,
    });
  };

  return (
    <Button type="primary" onClick={groupCreate}>
      Create Group
    </Button>
  );
};

const mapDispatchToProps = (dispatch: any) => ({
  open: (payload: ISidepanel) => dispatch({ type: 'Sidepanel/open', payload }),
});

export default connect(null, mapDispatchToProps)(GroupDashboardControls);
