import { Card, Steps, Typography, Row, Col, Space, Button, Table, Badge } from '@douyinfe/semi-ui';
import { useTranslation } from 'react-i18next';
import { useLoaderData, useNavigation } from 'react-router';
import { fetchBasicProfile, fetchAdjustment } from '~/api/profile';
import type { AdjustmentItem } from '~/api/types';
import ProfileItem from './ProfileItem';
import type { ProfileLoaderData } from './types';
import styles from './style.module.styl';

export async function loader(): Promise<ProfileLoaderData> {
  const [data, preData, tableData] = await Promise.all([
    fetchBasicProfile(),
    fetchBasicProfile(),
    fetchAdjustment(),
  ]);
  return { data, preData, tableData };
}

const { Title } = Typography;

export default function ProfileBasic() {
  const { t } = useTranslation();
  const { data, preData, tableData } = useLoaderData<ProfileLoaderData>();
  const pending = useNavigation().state !== 'idle';

  return (
    <div className={styles.container}>
      <Card>
        <Row justify="space-between" align="middle">
          <Col span={16}>
            <Title heading={5}>{t('basicProfile.title.form')}</Title>
          </Col>
          <Col span={8}>
            <Space className="w-full flex justify-end">
              <Button>{t('basicProfile.cancel')}</Button>
              <Button type="primary" theme="solid">{t('basicProfile.goBack')}</Button>
            </Space>
          </Col>
        </Row>

        <Steps current={data.status} className={styles.steps}>
          <Steps.Step title={t('basicProfile.steps.commit')} />
          <Steps.Step title={t('basicProfile.steps.approval')} />
          <Steps.Step title={t('basicProfile.steps.finish')} />
        </Steps>
      </Card>

      <ProfileItem data={data} type="current" loading={pending} />
      <ProfileItem data={preData} type="origin" loading={pending} />

      <Card>
        <Title heading={5}>{t('basicProfile.adjustment.record')}</Title>
        <Table
          loading={pending}
          dataSource={tableData}
          columns={[
            {
              dataIndex: 'contentId',
              title: t('basicProfile.adjustment.contentId'),
            },
            {
              dataIndex: 'content',
              title: t('basicProfile.adjustment.content'),
            },
            {
              dataIndex: 'status',
              title: t('basicProfile.adjustment.status'),
              render: (_: unknown, record: AdjustmentItem) =>
                record.status ? (
                  <span className="inline-flex items-center gap-2">
                    <Badge dot type="success" />
                    {t('basicProfile.adjustment.success')}
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-2">
                    <Badge dot type="primary" />
                    {t('basicProfile.adjustment.waiting')}
                  </span>
                ),
            },
            {
              dataIndex: 'updatedTime',
              title: t('basicProfile.adjustment.updatedTime'),
            },
            {
              title: t('basicProfile.adjustment.operation'),
              onHeaderCell: () => ({ style: { paddingLeft: '15px' } }),
              render: () => (
                <Button theme="borderless" type="tertiary">
                  {t('basicProfile.adjustment.operation.view')}
                </Button>
              ),
            },
          ]}
        />
      </Card>
    </div>
  );
}
