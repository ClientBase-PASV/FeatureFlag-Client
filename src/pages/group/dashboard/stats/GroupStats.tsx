import React from 'react';
import { get, isEmpty } from 'lodash';
import { Col, Row, Statistic, Card } from 'antd';
import { IGroupStats } from '@/pages/group/types';

interface IProps {
  stats: IGroupStats;
}

const GroupStats = (props: IProps) => {
  const groupStats = get(props, 'stats', '');

  // if (isEmpty(groupStats)) return null;

  const totalCount = get(groupStats, 'totalCount', '...');
  const totalCountDouble = get(groupStats, 'totalCountDouble', '...');
  const totalCountTriple = get(groupStats, 'totalCountTriple', '...');
  const totalCountTen = get(groupStats, 'totalCountTen', '...');

  return (
    <Row gutter={16}>
      <Col span={6}>
        <Statistic title="Total" value={totalCount} />
      </Col>

      <Col span={6}>
        <Statistic title="Trend" value={totalCountDouble} />
      </Col>

      <Col span={6}>
        <Statistic title="Users" value={totalCountTriple} />
      </Col>

      <Col span={6}>
        <Statistic title="Hits" value={totalCountTen} />
      </Col>
    </Row>
  );
};

export default GroupStats;
