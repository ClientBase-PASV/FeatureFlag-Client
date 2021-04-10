import { Effect, Reducer } from 'umi';

import { queryGroupGetById } from '@/pages/group/queries';
import defaultReducers from '@/utils/defaultReducers';

export interface IState {}

export interface IModel {
  namespace: string;
  state: IState;
  effects: {
    groupGetById: Effect;
  };
  reducers: {
    save: Reducer<IState>;
  };
}

const Model: IModel = {
  namespace: 'GroupView',

  state: {},

  effects: {
    *groupGetById({ payload }, { call, put }) {
      yield put({ type: 'save', payload: {} });
      const data = yield call(queryGroupGetById, payload);
      yield put({ type: 'save', payload: { ...data.payload } });
    },

    // *groupDeleteById({ payload }, { call, put }) {
    //   console.log(payload);
    //   yield call(queryGroupDeleteById, payload.groupId);
    //   yield put({ type: 'groupSearch', payload: payload.queryParams });
    // },
  },

  reducers: {
    ...defaultReducers,
  },
};

export default Model;
