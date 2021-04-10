import React, { useEffect } from 'react';
import { connect } from 'umi';
import { get } from 'lodash';
import GroupViewFlagList from '@/pages/group/view/GroupViewFlagList';

interface IProps {
  groupId: string;
  name: string;
  groupGetById: (id: string) => void;
}

const GroupView = (props: IProps) => {
  const groupId = get(props, 'match.params.groupId');
  const name = get(props, 'GroupView.name', '');
  const flagsObject = get(props, 'GroupView.flags', {});

  const flags = Object.keys(flagsObject).map((el) => ({ name: el, value: flagsObject[el] }));

  console.log(props);

  useEffect(() => {
    props.groupGetById(groupId);
  }, []);

  return (
    <div>
      <h1>{name}</h1>

      <GroupViewFlagList items={flags} />
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  GroupView: state.GroupView,
});

const mapDispatchToProps = (dispatch: any) => ({
  groupGetById: (payload: string) => dispatch({ type: 'GroupView/groupGetById', payload }),
});

export default connect(mapStateToProps, mapDispatchToProps)(GroupView);
