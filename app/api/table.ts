import request from '~/commons/request';
import type { SearchParams, SearchResult } from './types';

export async function fetchSearch(params: SearchParams): Promise<SearchResult> {
  return request<SearchResult>('/list/search', {
    params: { page: params.page, pageSize: params.pageSize, ...params.formParams },
  });
}
