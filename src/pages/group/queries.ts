import { get, patch, post, del } from '@/utils/httpMethods';
import { IGroup, IGroupQueryParams } from '@/pages/group/types';

export async function queryGroupCreate(payload: any): Promise<any> {
  return post({ url: '/group', data: payload });
}

export async function queryGroupGetById(id: string): Promise<any> {
  return get({ url: `/group/${id}` });
}

export async function queryGroupUpdateById(payload: { groupId: string; values: IGroup }): Promise<any> {
  return patch({ url: `/group/${payload.groupId}`, data: payload.values });
}

export async function queryGroupDeleteById(groupId: string): Promise<any> {
  return del({ url: `/group/${groupId}` });
}

export async function queryGroupSearch(payload: IGroupQueryParams): Promise<any> {
  return post({ url: '/group/search', data: payload });
}

export async function queryGroupGetAll(): Promise<any> {
  return get({ url: '/group' });
}

export async function queryGroupGetStats(): Promise<any> {
  return get({ url: `/group/stats` });
}
