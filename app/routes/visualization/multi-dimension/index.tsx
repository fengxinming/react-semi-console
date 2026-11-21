import { Row, Col, Space } from '@douyinfe/semi-ui';
import {
  fetchMultiOverview,
  fetchMultiActivity,
  fetchMultiPolar,
  fetchMultiContentSource,
  fetchMultiCards,
} from '~/api/visualization';
import type { MultiDimensionLoaderData } from './types';
import DataOverview from './DataOverview';
import CardList from './CardList';
import ActivityBar from './ActivityBar';
import ThemeRadar from './ThemeRadar';
import SourcePie from './SourcePie';
import styles from './style.module.styl';

// 无操作查询：loader 直接拉数据并 return，区块子组件用 useLoaderData 读取
export async function loader(): Promise<MultiDimensionLoaderData> {
  const [overview, interval, polar, multiPie, cardList] = await Promise.all([
    fetchMultiOverview(),
    fetchMultiActivity(),
    fetchMultiPolar(),
    fetchMultiContentSource(),
    fetchMultiCards(),
  ]);
  return { overview, interval, polar, multiPie, cardList };
}

export default function MultiDimension() {
  return (
    <Space spacing={16} vertical className="w-full" style={{ alignItems: 'stretch' }}>
      <div className={styles['top-row']}>
        <Row gutter={20}>
          <Col span={16}>
            <DataOverview />
          </Col>
          <Col span={8}>
            <ActivityBar />
            <ThemeRadar />
          </Col>
        </Row>
      </div>
      <Row>
        <Col span={24}>
          <CardList />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <SourcePie />
        </Col>
      </Row>
    </Space>
  );
}
