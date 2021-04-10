import { Effect, Reducer } from 'umi';
import { get } from 'lodash';

import { queryGroupDeleteById, queryGroupGetStats, queryGroupSearch } from '@/pages/group/queries';
import { IGroup, IGroupStats } from '@/pages/group/types';
import { IPager } from '@/pages/utils/pager/types';
import defaultReducers from '@/utils/defaultReducers';

export interface IState {
  groupList?: IGroup[];
  groupStats?: IGroupStats;
  groupPager?: IPager;
}

export interface IModel {
  namespace: string;
  state: IState;
  effects: {
    groupSearch: Effect;
    groupGetStats: Effect;
    groupDeleteById: Effect;
    reset: Effect;
  };
  reducers: {
    save: Reducer<IState>;
    set: Reducer<IState>;
  };
}

const Model: IModel = {
  namespace: 'GroupDashboard',

  state: {},

  effects: {
    *groupSearch({ payload }, { call, put }) {
      const data = yield call(queryGroupSearch, payload);
      yield put({
        type: 'save',
        payload: {
          groupList: get(data, 'payload.items'),
          groupPager: get(data, 'payload.pager'),
        },
      });
    },

    *groupGetStats(_, { call, put }) {
      const data = yield call(queryGroupGetStats);
      yield put({
        type: 'save',
        payload: { groupStats: data.payload },
      });
    },

    *groupDeleteById({ payload }, { call, put }) {
      yield call(queryGroupDeleteById, payload.groupId);
      yield put({ type: 'groupSearch', payload: payload.queryParams });
    },

    *reset(_, { put }) {
      yield put({ type: 'set', payload: {} });
    },
  },

  reducers: {
    ...defaultReducers,
  },
};

export default Model;
