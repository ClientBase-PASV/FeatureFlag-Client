import React, { useEffect } from 'react';
import { connect, history } from 'umi';
import { get, omitBy } from 'lodash';
import GroupStats from '@/pages/group/dashboard/stats/GroupStats';
import GroupFilterForm from '@/pages/group/dashboard/search/GroupFilterForm';
import Pager from '@/pages/utils/pager/Pager';
import { IGroupQueryParams } from '@/pages/group/types';
import GroupSearchList from '@/pages/group/dashboard/search/GroupSearchList';
import GroupDashboardControls from '@/pages/group/dashboard/controls/GroupDashboardControls';
import { IState } from '@/pages/group/dashboard/model';

const initialSearchForm = {
  groupSearchParam1: '',
  groupSearchParam2: '',
};

const initialSearchQuery = {
  limit: 20,
  page: 1,
  ...initialSearchForm,
};

interface IProps {
  groupGetStats: () => void;
  groupSearch: (arg: IGroupQueryParams) => void;
  groupReset: () => void;
  GroupDashboard: IState;
}

const GroupDashboard = (props: IProps) => {
  const groupStats = get(props, 'GroupDashboard.groupStats', {});
  const groupList = get(props, 'GroupDashboard.groupList', []);
  const groupPager = get(props, 'GroupDashboard.groupPager', {});
  const queryParams = get(props, 'location.query', {});

  const getSearchQuery = (mixin = {}) => {
    const query = { ...initialSearchQuery, ...queryParams, ...mixin };
    return omitBy(query, (a) => !a); // удалить пустые ключи
  };

  useEffect(() => {
    props.groupGetStats();

    return () => {
      props.groupReset();
    };
  }, []);

  // поиск в зависимости от изменения параметров
  useEffect(() => {
    props.groupSearch(getSearchQuery());
  }, [queryParams]);

  const onFiltersChange = (values: null | IGroupQueryParams) => {
    // обнулять pager при каждом новом поиске
    const query = getSearchQuery({ ...values, page: 1 });
    history.push({ query });
  };

  const onPagerChange = (page: number) => {
    const query = getSearchQuery({ page });
    history.push({ query });
  };

  return (
    <>
      <div className="d-flex align-items-end justify-content-between mt-3 mb-2">
        <div>
          <div className="h4 mr-4">Group dashboard</div>
          <GroupFilterForm filters={getSearchQuery()} onChange={onFiltersChange} />
        </div>

        <GroupStats stats={groupStats} />

        <div>
          <GroupDashboardControls />
        </div>
      </div>

      <GroupSearchList items={groupList} />
      <Pager pager={groupPager} onChange={onPagerChange} />
    </>
  );
};

const mapStateToProps = (state: any) => ({
  GroupDashboard: state.GroupDashboard,
});

const mapDispatchToProps = (dispatch: any) => ({
  groupSearch: (payload: IGroupQueryParams) => dispatch({ type: 'GroupDashboard/groupSearch', payload }),
  groupGetStats: () => dispatch({ type: 'GroupDashboard/groupGetStats' }),
  groupReset: () => dispatch({ type: 'GroupDashboard/reset' }),
});

export default connect(mapStateToProps, mapDispatchToProps)(GroupDashboard);
