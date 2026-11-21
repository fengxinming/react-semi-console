import type { ColumnProps } from '@douyinfe/semi-ui/lib/es/table/interface';
import { Button, Typography, Badge } from '@douyinfe/semi-ui';
import { IconFile, IconVideo, IconImage } from '@douyinfe/semi-icons';
import dayjs from 'dayjs';
import styles from './style.module.styl';
import type { T } from './types';

const { Text } = Typography;

export const ContentType = ['图文', '横版短视频', '竖版短视频'];
export const FilterType = ['规则筛选', '人工'];
export const Status = ['未上线', '已上线'];

const ContentIcon = [<IconFile key={0} />, <IconVideo key={1} />, <IconImage key={2} />];

export function getColumns(
  t: T,
  callback: (record: Record<string, any>, type: string) => void,
): ColumnProps<Record<string, any>>[] {
  return [
    {
      title: t('searchTable.columns.id'),
      dataIndex: 'id',
      render: (value: string) => <Text copyable>{value}</Text>,
    },
    {
      title: t('searchTable.columns.name'),
      dataIndex: 'name',
    },
    {
      title: t('searchTable.columns.contentType'),
      dataIndex: 'contentType',
      render: (value: number) => (
        <div className={styles['content-type']}>
          {ContentIcon[value]}
          {ContentType[value]}
        </div>
      ),
    },
    {
      title: t('searchTable.columns.filterType'),
      dataIndex: 'filterType',
      render: (value: number) => FilterType[value],
    },
    {
      title: t('searchTable.columns.contentNum'),
      dataIndex: 'count',
      sorter: (a: any, b: any) => a.count - b.count,
      render: (x: number) => Number(x).toLocaleString(),
    },
    {
      title: t('searchTable.columns.createdTime'),
      dataIndex: 'createdTime',
      render: (x: number) => dayjs().subtract(x, 'days').format('YYYY-MM-DD HH:mm:ss'),
      sorter: (a: any, b: any) => b.createdTime - a.createdTime,
    },
    {
      title: t('searchTable.columns.status'),
      dataIndex: 'status',
      render: (x: number) => (
        <span className="inline-flex items-center gap-2">
          <Badge dot type={x === 0 ? 'danger' : 'success'} />
          <Text>{Status[x]}</Text>
        </span>
      ),
    },
    {
      title: t('searchTable.columns.operations'),
      dataIndex: 'operations',
      onHeaderCell: () => ({ style: { paddingLeft: '15px' } }),
      render: (_: unknown, record: Record<string, any>) => (
        <Button theme="borderless" type="tertiary" size="small" onClick={() => callback(record, 'view')}>
          {t('searchTable.columns.operations.view')}
        </Button>
      ),
    },
  ];
}
