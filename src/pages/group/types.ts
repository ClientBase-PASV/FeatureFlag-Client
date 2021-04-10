export interface IGroup {
  _id: string;
  name: string;
  owner: {
    name: string;
    _id: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface IGroupStats {
  totalGroup: number;
  todayGroup: number;
  monthGroup: number;
  averageGroup: number;
}

export interface IGroupQueryParams {
  limit?: number | string;
  page?: number | string;
  groupSearchParam1?: string;
  groupSearchParam2?: string;
}
