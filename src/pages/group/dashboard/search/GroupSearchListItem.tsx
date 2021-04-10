import React from 'react';
import moment from 'moment';
import { connect, Link } from 'umi';
import { get } from 'lodash';
import { Button, Row } from 'antd';
import { IGroup } from '@/pages/group/types';

interface IProps extends IGroup {
  groupDelete: (id: String) => void;
}

const GroupSearchListItem = (props: IProps) => {
  const { groupDelete } = props;

  const owner = get(props, 'item.owner', '');
  const groupId = get(props, 'item._id', '');
  const createdAt = get(props, 'item.createdAt', '');
  const description = get(props, 'item.description', '');

  const ownerName = get(owner, 'name', '');
  const ownerId = get(owner, '_id', '');

  return (
    <div>
      <Row>
        {moment(createdAt).format('LL HH:mm')}

        <Link to={`/profile/${ownerId}`}>{ownerName}</Link>
      </Row>

      <Row>{description}</Row>

      <Row>
        <Button danger onClick={() => groupDelete(groupId)}>
          Delete
        </Button>
      </Row>
    </div>
  );
};

const mapDispatchToProps = (dispatch: any) => ({
  groupDelete: (payload: any) => dispatch({ type: 'GroupDashboard/groupDelete', payload }),
});

export default connect(null, mapDispatchToProps)(GroupSearchListItem);
