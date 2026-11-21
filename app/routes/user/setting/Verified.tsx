import { Descriptions, Table, Typography, Skeleton, Tag, Space, Button, Badge } from '@douyinfe/semi-ui';
import type { ColumnProps } from '@douyinfe/semi-ui/lib/es/table/interface';
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

  const loadingNode = <Skeleton active placeholder={<Skeleton.Paragraph rows={1} />} />;
  // Semi Descriptions 没有 styles.label，改用每条 data 的 keyStyle 让 label 右对齐
  // / Semi Descriptions has no styles.label; use keyStyle on each data item to right-align labels
  const keyStyle = { textAlign: 'right' as const };

  const columns: ColumnProps<AuthRecord>[] = [
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
          // 认证状态：圆点 + 文案自行组合
          // / Auth status: dot plus text composed manually
          <span className="inline-flex items-center gap-2">
            <Badge dot type="success" />
            {t('userSetting.verified.status.success')}
          </span>
        ) : (
          <span className="inline-flex items-center gap-2">
            <Badge dot type="primary" />
            {t('userSetting.verified.status.waiting')}
          </span>
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
          <Button theme="borderless" type="tertiary">
            {t('userSetting.verified.operation.view')}
          </Button>
          {record.authStatus ? null : (
            <Button theme="borderless" type="tertiary">
              {t('userSetting.verified.operation.revoke')}
            </Button>
          )}
        </Space>
      ),
    },
  ];

  return (
    <div className={styles['verified']}>
      <Typography.Title heading={5}>{t('userSetting.verified.enterprise')}</Typography.Title>
      <Descriptions
        className={styles['verified-enterprise']}
        layout="horizontal"
        column={3}
        data={Object.entries(enterprise).map(([key, value]) => ({
          key: t(`userSetting.verified.label.${key}`),
          keyStyle,
          value: loading ? (
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
      <Typography.Title heading={5}>{t('userSetting.verified.records')}</Typography.Title>
      <Table<AuthRecord>
        rowKey="createdTime"
        columns={columns}
        dataSource={tableData}
        loading={tableLoading}
        pagination={false}
      />
    </div>
  );
}
