import { Row, Col, Space } from 'antd';
import {
  fetchPopularContents,
  fetchContentPercentage,
  fetchOverview,
} from '~/api/dashboard';
import type { WorkplaceLoaderData } from './types';
import Overview from './Overview';
import PopularContents from './PopularContents';
import ContentPercentage from './ContentPercentage';
import Shortcuts from './Shortcuts';
import CarouselWidget from './Carousel';
import Announcement from './Announcement';
import Docs from './Docs';
import styles from './style.module.styl';

// 无操作查询：loader 直接拉数据并 return；Announcement 走 10s 轮询（见 Announcement.tsx）
export async function loader(): Promise<WorkplaceLoaderData> {
  const [popularContents, contentPercentage, overview] = await Promise.all([
    fetchPopularContents(),
    fetchContentPercentage(),
    fetchOverview(),
  ]);
  return { popularContents, contentPercentage, overview };
}

export default function Workplace() {
  return (
    <div className="flex w-full">
      <Space size={16} orientation="vertical" className={styles.left}>
        <Overview />
        <Row gutter={16}>
          <Col span={12}>
            <PopularContents />
          </Col>
          <Col span={12}>
            <ContentPercentage />
          </Col>
        </Row>
      </Space>
      <Space className={styles.right} size={16} orientation="vertical">
        <Shortcuts />
        <CarouselWidget />
        <Announcement />
        <Docs />
      </Space>
    </div>
  );
}
