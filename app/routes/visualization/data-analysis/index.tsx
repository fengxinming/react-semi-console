import { Row, Col, Space } from 'antd';
import {
  fetchPublicOpinion,
  fetchContentPublishing,
  fetchAuthorList,
} from '~/api/visualization';
import type { DataAnalysisLoaderData } from './types';
import PublicOpinion from './PublicOpinion';
import PublishingRate from './PublishingRate';
import PeriodLine from './PeriodLine';
import AuthorTable from './AuthorTable';

// 无操作查询：loader 直接拉数据并 return，子组件用 useLoaderData 读取
export async function loader(): Promise<DataAnalysisLoaderData> {
  const [publicOpinion, contentPublishing, authorList] = await Promise.all([
    fetchPublicOpinion(),
    fetchContentPublishing(),
    fetchAuthorList(),
  ]);
  return { publicOpinion, contentPublishing, authorList };
}

export default function DataAnalysis() {
  return (
    <Space size={16} orientation="vertical" className="w-full">
      <PublicOpinion />
      <Row gutter={16}>
        <Col span={14}>
          <PublishingRate />
        </Col>
        <Col span={10}>
          <AuthorTable />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <PeriodLine />
        </Col>
      </Row>
    </Space>
  );
}
