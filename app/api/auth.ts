import request from '~/commons/request';
import type { AuthTokenResult, LoginValues } from './types';

export async function login(values: LoginValues): Promise<AuthTokenResult> {
  return request<AuthTokenResult>('/login', { method: 'POST', data: values });
}

export async function register(values: LoginValues): Promise<AuthTokenResult> {
  return request<AuthTokenResult>('/register', { method: 'POST', data: values });
}
