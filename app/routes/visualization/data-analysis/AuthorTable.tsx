import { useMemo } from 'react';
import { Card, Table, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import { useLoaderData, useNavigation } from 'react-router';
import type { DataAnalysisLoaderData } from './types';
import type { AuthorItem } from '~/api/types';

const { Title } = Typography;

/** 作者榜单:由路由 loader 提供数据，这里直接 useLoaderData 取用。 */
export default function AuthorTable() {
  const { t } = useTranslation();
  const { authorList } = useLoaderData<DataAnalysisLoaderData>();
  const loading = useNavigation().state !== 'idle';

  const columns = useMemo(
    () => [
      { title: t('dataAnalysis.authorTable.rank'), dataIndex: 'id' },
      { title: t('dataAnalysis.authorTable.author'), dataIndex: 'author' },
      {
        title: t('dataAnalysis.authorTable.content'),
        dataIndex: 'contentCount',
        sorter: (a: AuthorItem, b: AuthorItem) => a.contentCount - b.contentCount,
        render: (value: number) => value.toLocaleString(),
      },
      {
        title: t('dataAnalysis.authorTable.click'),
        dataIndex: 'clickCount',
        sorter: (a: AuthorItem, b: AuthorItem) => a.clickCount - b.clickCount,
        render: (value: number) => value.toLocaleString(),
      },
    ],
    [t],
  );

  return (
    <Card variant="borderless" className="w-full">
      <Title level={5}>{t('dataAnalysis.title.authorsList')}</Title>
      <div className="h-[378px]">
        <Table
          rowKey="id"
          loading={loading}
          pagination={false}
          dataSource={authorList}
          columns={columns}
        />
      </div>
    </Card>
  );
}
