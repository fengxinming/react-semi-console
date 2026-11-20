import { Descriptions, Table, Typography, Skeleton, Tag, Space, Button, Badge } from 'antd';
import { useTranslation } from 'react-i18next';
import { useEnterpriseQuery, useAuthListQuery } from '~/hooks/api/useUser';
import type { VerifiedInfo, AuthRecord } from '~/api/types';
import styles from './style.module.styl';

const DEFAULT_ENTERPRISE: VerifiedInfo = {
  accountType: '',
  isVerified: true,
  verifiedTime: '',
  legalPersonName: '',
  certificateType: '',
  certificationNumber: '',
  enterpriseName: '',
  enterpriseCertificateType: '',
  organizationCode: '',
};

/** 实名认证:企业信息 Descriptions + 认证记录 Table。自取 verified/enterprise、verified/authList。 */
export default function Verified() {
  const { t } = useTranslation();
  const { data: enterprise = DEFAULT_ENTERPRISE, isLoading: loading } = useEnterpriseQuery();
  const { data: tableData = [], isLoading: tableLoading } = useAuthListQuery();

  const loadingNode = <Skeleton paragraph={{ rows: 1 }} title={false} active />;

  return (
    <div className={styles['verified']}>
      <Typography.Title level={5}>{t('userSetting.verified.enterprise')}</Typography.Title>
      <Descriptions
        className={styles['verified-enterprise']}
        // antd v6：labelStyle 已废弃，改用 styles.label
        // / antd v6: labelStyle is deprecated; use styles.label instead
        styles={{ label: { textAlign: 'right' } }}
        layout="horizontal"
        column={3}
        items={Object.entries(enterprise).map(([key, value]) => ({
          key,
          label: t(`userSetting.verified.label.${key}`),
          children: loading ? (
            loadingNode
          ) : typeof value === 'boolean' ? (
            value ? (
              <Tag color="green">{t('userSetting.value.verified')}</Tag>
            ) : (
              <Tag color="red">{t('userSetting.value.notVerified')}</Tag>
            )
          ) : (
            (value as string)
          ),
        }))}
      />
      <Typography.Title level={5}>{t('userSetting.verified.records')}</Typography.Title>
      <Table<AuthRecord>
        rowKey="createdTime"
        columns={[
          {
            title: t('userSetting.verified.authType'),
            dataIndex: 'authType',
          },
          {
            title: t('userSetting.verified.authContent'),
            dataIndex: 'authContent',
          },
          {
            title: t('userSetting.verified.authStatus'),
            dataIndex: 'authStatus',
            render: (val: AuthRecord['authStatus']) =>
              val ? (
                <Badge status="success" text={t('userSetting.verified.status.success')} />
              ) : (
                <Badge status="processing" text={t('userSetting.verified.status.waiting')} />
              ),
          },
          {
            title: t('userSetting.verified.createdTime'),
            dataIndex: 'createdTime',
          },
          {
            title: t('userSetting.verified.operation'),
            onHeaderCell: () => ({ style: { paddingLeft: '15px' } }),
            render: (_: unknown, record: AuthRecord) => (
              <Space>
                <Button type="link">{t('userSetting.verified.operation.view')}</Button>
                {record.authStatus ? null : (
                  <Button type="link">{t('userSetting.verified.operation.revoke')}</Button>
                )}
              </Space>
            ),
          },
        ]}
        dataSource={tableData}
        loading={tableLoading}
        pagination={false}
      />
    </div>
  );
}
