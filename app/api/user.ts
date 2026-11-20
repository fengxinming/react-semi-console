import request from '~/commons/request';
import type { UserFullData, UserRole } from '~/store/types';
import type {
  SaveUserInfoPayload,
  VerifiedInfo,
  AuthRecord,
  ProjectItem,
  TeamItem,
  NewsItem,
  UserInfoResponse,
  SwitchRoleResult,
} from './types';

export async function fetchUser(): Promise<UserFullData> {
  const res = await request<UserInfoResponse>('/user/info');
  return {
    user: res.user,
    role: (res.roles?.[0] ?? 'user') as UserRole,
    permissions: res.permissions,
  };
}

export async function saveInfo(values: SaveUserInfoPayload): Promise<string> {
  return request<string>('/user/saveInfo', { method: 'POST', data: values });
}

export async function switchRole(role: UserRole): Promise<SwitchRoleResult> {
  return request<SwitchRoleResult>('/user/switch-role', {
    method: 'POST',
    data: { role },
  });
}

export async function fetchProjects(): Promise<ProjectItem[]> {
  return request<ProjectItem[]>('/user/projectList');
}

export async function fetchTeams(): Promise<TeamItem[]> {
  return request<TeamItem[]>('/users/teamList');
}

export async function fetchNews(): Promise<NewsItem[]> {
  return request<NewsItem[]>('/user/latestNews');
}

export async function fetchEnterprise(): Promise<VerifiedInfo> {
  return request<VerifiedInfo>('/user/verified/enterprise');
}

export async function fetchAuthList(): Promise<AuthRecord[]> {
  return request<AuthRecord[]>('/user/verified/authList');
}
