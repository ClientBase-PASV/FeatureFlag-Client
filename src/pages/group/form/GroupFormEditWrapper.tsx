import React, { useEffect } from 'react';
import { connect, withRouter } from 'umi';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { get, isEmpty } from 'lodash';
import GroupForm from '@/pages/group/form/GroupForm';
import { IGroup } from '@/pages/group/types';
import { ILoadingEffects } from '@/types';

interface IProps {
  getById: (groupId: string) => void;
  reset: () => void;
  updateById: any;
  groupInfo: IGroup;
  loadingEffects: ILoadingEffects;
}
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const GroupFormEditWrapper = (props: IProps) => {
  const queryParams = get(props, 'location.query', {});
  const groupId: string = get(props, 'sidepanel.groupId', '');

  const isLoadingGet = get(props, 'loadingEffects.GroupForm/getById', false);
  const isLoadingUpdate = get(props, 'loadingEffects.GroupForm/updateById', false);

  useEffect(() => {
    props.getById(groupId);
  }, []);

  const onFinish = (values: IGroup) => {
    props.updateById({ values, groupId, queryParams });
  };

  if (isLoadingGet) return <Spin indicator={antIcon} />;

  return (
    <GroupForm
      onFinish={onFinish}
      initialValues={props.groupInfo}
      submitButtonText="Update"
      isLoading={isLoadingUpdate}
    />
  );
};

const mapStateToProps = (state: any) => ({
  sidepanel: state.Sidepanel,
  groupInfo: state.GroupForm.groupInfo,
  loadingEffects: state.loading.effects,
});

const mapDispatchToProps = (dispatch: any) => ({
  reset: () => dispatch({ type: 'GroupForm/reset' }),
  updateById: (payload: IGroup) => dispatch({ type: 'GroupForm/updateById', payload }),
  getById: (payload: string) => dispatch({ type: 'GroupForm/getById', payload }),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GroupFormEditWrapper));
