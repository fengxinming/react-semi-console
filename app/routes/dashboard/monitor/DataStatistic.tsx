import { Button, Card, Radio, RadioGroup, Tabs, Table, Tag, Typography } from '@douyinfe/semi-ui';
import type { ColumnProps } from '@douyinfe/semi-ui/lib/es/table/interface';
import { useTranslation } from 'react-i18next';

const COVER_IMG =
  'https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/c788fc704d32cf3b1136c7d45afc2669.png~tplv-uwbnlip3yd-webp.webp';

const DATA = [
  {
    cover: COVER_IMG,
    name: '视频直播',
    duration: '00:05:19',
    id: '54e23ade',
    status: -1,
  },
];

export default function DataStatistic() {
  const { t } = useTranslation();

  const columns: ColumnProps<(typeof DATA)[number]>[] = [
    {
      title: t('monitor.list.title.order'),
      render: (_col, _record, index) => <span>{index + 1}</span>,
    },
    {
      title: t('monitor.list.title.cover'),
      dataIndex: 'cover',
      render: (_col, record) => (
        <div className="relative h-[68px]">
          <img className="h-full" src={record.cover} alt="cover" />
          {record.status === -1 && (
            <Tag color="red" className="absolute top-[6px] left-[6px]">
              {t('monitor.list.tag.auditFailed')}
            </Tag>
          )}
        </div>
      ),
    },
    {
      title: t('monitor.list.title.name'),
      dataIndex: 'name',
    },
    {
      dataIndex: 'duration',
      title: t('monitor.list.title.duration'),
    },
    {
      dataIndex: 'id',
      title: t('monitor.list.title.id'),
    },
  ];

  return (
    <Card>
      <Tabs
        defaultActiveKey="liveMethod"
        tabList={[
          { itemKey: 'liveMethod', tab: t('monitor.tab.title.liveMethod') },
          { itemKey: 'onlineUsers', tab: t('monitor.tab.title.onlineUsers') },
        ]}
      />
      <div className="py-[20px]">
        <RadioGroup defaultValue="3" type="button">
          <Radio value="1">{t('monitor.liveMethod.normal')}</Radio>
          <Radio value="2">{t('monitor.liveMethod.flowControl')}</Radio>
          <Radio value="3">{t('monitor.liveMethod.video')}</Radio>
          <Radio value="4">{t('monitor.liveMethod.web')}</Radio>
        </RadioGroup>

        <div>
          <div className="flex justify-between mt-[16px]">
            <Button theme="borderless" type="tertiary">{t('monitor.editCarousel')}</Button>
            <Button disabled>{t('monitor.startCarousel')}</Button>
          </div>
          <div className="mt-[16px]">
            <Table
              columns={columns}
              dataSource={DATA}
              rowKey="id"
              rowSelection
              pagination={false}
            />
            <Typography.Text type="secondary" className="block mt-[16px] text-center">
              {t('monitor.list.tip.rotations')}
              {DATA.length}
              {t('monitor.list.tip.rest')}
            </Typography.Text>
          </div>
        </div>
      </div>
    </Card>
  );
}
