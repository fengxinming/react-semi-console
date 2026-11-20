import request from '~/commons/request';
import type {
  OverviewItem,
  ContentPublishingItem,
  AuthorItem,
  MultiDimensionOverview,
  ActivityItem,
  PolarData,
  ContentSourceItem,
  CardBlockData,
  AuthorListResponse,
} from '~/api/types';
import { CARD_KEYS, CARD_TYPES } from '~/routes/visualization/data-analysis/types';
import {
  MULTI_CARD_KEYS,
  MULTI_CARD_TYPES,
} from '~/routes/visualization/multi-dimension/types';

export async function fetchPublicOpinion(): Promise<OverviewItem[]> {
  return Promise.all(
    CARD_TYPES.map((type, i) =>
      request<Record<string, unknown>>(`/data-analysis/overview?type=${type}`).then(
        (d) => ({ ...d, name: CARD_KEYS[i], chartType: type }) as OverviewItem,
      ),
    ),
  );
}
export async function fetchContentPublishing(): Promise<ContentPublishingItem[]> {
  return request<ContentPublishingItem[]>('/data-analysis/content-publishing');
}
export async function fetchAuthorList(): Promise<AuthorItem[]> {
  const res = await request<AuthorListResponse>('/data-analysis/author-list');
  return res.list;
}

// ---- multi-dimension ----
export async function fetchMultiOverview(): Promise<MultiDimensionOverview> {
  return request<MultiDimensionOverview>('/multi-dimension/overview');
}
export async function fetchMultiActivity(): Promise<ActivityItem[]> {
  return request<ActivityItem[]>('/multi-dimension/activity');
}
export async function fetchMultiPolar(): Promise<PolarData> {
  return request<PolarData>('/multi-dimension/polar');
}
export async function fetchMultiContentSource(): Promise<ContentSourceItem[]> {
  return request<ContentSourceItem[]>('/multi-dimension/content-source');
}
export async function fetchMultiCards(): Promise<CardBlockData[]> {
  return Promise.all(
    MULTI_CARD_TYPES.map((type, i) =>
      request<Record<string, unknown>>(`/multi-dimension/card?type=${type}`)
        .catch(() => ({}))
        .then((d) => ({ ...d, name: MULTI_CARD_KEYS[i], chartType: type }) as CardBlockData),
    ),
  );
}
