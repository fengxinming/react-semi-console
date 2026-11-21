import { useState } from 'react';
import { Card, RadioGroup, Table, Typography } from '@douyinfe/semi-ui';
import { IconCaretup, IconCaretdown } from '@douyinfe/semi-icons';
import { useTranslation } from 'react-i18next';
import { useLoaderData, useNavigation } from 'react-router';
import type { WorkplaceLoaderData } from './types';
import type { PopularItem } from '~/api/types';

import styles from './style.module.styl';

const { Title, Paragraph, Text } = Typography;

// 热门内容榜：由路由 loader 提供数据，这里直接 useLoaderData 取用
const TITLES = [
  '经济日报:财政政策要精准提升效能',
  '"双12"遇冷消费者厌倦了电商平台的促销"套路"',
  '致敬坚守战"疫"一线的社区工作者',
  '普高还是职高?家长们陷入选校难题',
];

export default function PopularContents() {
  const { t } = useTranslation();
  const [type, setType] = useState(0);
  const { popularContents } = useLoaderData<WorkplaceLoaderData>();
  const loading = useNavigation().state !== 'idle';

  // 客户端按分类过滤（mock 返回全部数据）
  const filtered =
    type === 0
      ? popularContents
      : popularContents.map((d) => ({
          ...d,
          title: TITLES[(d.rank + type) % TITLES.length],
        }));

  const columns = [
    { title: t('workplace.column.rank'), dataIndex: 'rank', width: 65 },
    {
      title: t('workplace.column.title'),
      dataIndex: 'title',
      render: (x: string) => (
        <Paragraph className="!m-0" ellipsis>
          {x}
        </Paragraph>
      ),
    },
    {
      title: t('workplace.column.pv'),
      dataIndex: 'pv',
      width: 100,
      render: (text: number) => `${text / 1000}k`,
    },
    {
      title: t('workplace.column.increase'),
      dataIndex: 'increase',
      sorter: (a?: PopularItem, b?: PopularItem) => (a?.increase ?? 0) - (b?.increase ?? 0),
      width: 110,
      render: (text: number) => (
        <span>
          {`${(text * 100).toFixed(2)}%`}
          <span className="ml-[4px]">
            {text < 0 ? (
              <IconCaretup className={styles['caret-green']} />
            ) : (
              <IconCaretdown className={styles['caret-red']} />
            )}
          </span>
        </span>
      ),
    },
  ];

  return (
    <Card bordered={false}>
      <div className="flex justify-between">
        <Title heading={5}>{t('workplace.popularContents')}</Title>
        <Text link>{t('workplace.seeMore')}</Text>
      </div>
      <RadioGroup
        type="button"
        value={type}
        onChange={(e) => setType(e.target.value)}
        options={[
          { label: t('workplace.text'), value: 0 },
          { label: t('workplace.image'), value: 1 },
          { label: t('workplace.video'), value: 2 },
        ]}
        className="mb-[16px]"
      />
      <Table
        rowKey="rank"
        columns={columns}
        dataSource={filtered}
        loading={loading}
        tableLayout="fixed"
        pagination={{ pageSize: 5, size: 'small' }}
      />
    </Card>
  );
}
