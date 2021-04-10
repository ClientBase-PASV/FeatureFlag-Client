import React from 'react';
import { connect } from 'umi';
import GroupForm from '@/pages/group/form/GroupForm';
import { IGroup } from '@/pages/group/types';
import { get } from 'lodash';
import { ILoadingEffects } from '@/types';

interface IProps {
  create: (arg: IGroup) => void;
  loadingEffects: ILoadingEffects;
}

const GroupFormCreateWrapper = (props: IProps) => {
  const onFinish = (values: IGroup) => {
    props.create(values);
  };

  const isLoading = get(props, 'loadingEffects.GroupForm/create', false);

  return <GroupForm onFinish={onFinish} submitButtonText="Create" isLoading={isLoading} />;
};

const mapStateToProps = (state: any) => ({
  loadingEffects: state.loading.effects,
});

const mapDispatchToProps = (dispatch: any) => ({
  create: (payload: IGroup) => dispatch({ type: 'GroupForm/create', payload }),
});

export default connect(mapStateToProps, mapDispatchToProps)(GroupFormCreateWrapper);
