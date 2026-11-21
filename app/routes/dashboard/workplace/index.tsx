import { Row, Col, Space } from '@douyinfe/semi-ui';
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
    <div className={`${styles.workplace} flex w-full`}>
      <Space spacing={16} vertical className={styles.left} style={{ alignItems: 'stretch' }}>
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
      <Space
        className={styles.right}
        spacing={16}
        vertical
        style={{ alignItems: 'stretch' }}
      >
        <Shortcuts />
        <CarouselWidget />
        <Announcement />
        <Docs />
      </Space>
    </div>
  );
}
