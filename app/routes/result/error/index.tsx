import { Typography, Button, Space } from '@douyinfe/semi-ui';
import { IconAlertCircle, IconLink } from '@douyinfe/semi-icons';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import styles from './style.module.styl';

export default function ResultError() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div>
      <div className={styles.wrapper}>
        {/* Semi 无 Result，用 Icon + Typography + Space 自行拼装 */}
        {/* / Semi has no Result; compose it from Icon + Typography + Space */}
        <div className={styles.result + ' text-center'}>
          <IconAlertCircle style={{ fontSize: 64, color: 'var(--semi-color-danger)' }} />
          <Typography.Title heading={3}>{t('error.result.title')}</Typography.Title>
          <Typography.Paragraph type="secondary" className="my-[8px]">
            {t('error.result.subTitle')}
          </Typography.Paragraph>
          <Space>
            <Button className="mr-[16px]" onClick={() => navigate('/dashboard/workplace')}>
              {t('error.result.goBack')}
            </Button>
            <Button type="primary" theme="solid" onClick={() => navigate(-1)}>
              {t('error.result.retry')}
            </Button>
          </Space>
        </div>
        <div className={styles['details-wrapper']}>
          <Typography.Title heading={5} className="mt-0">
            {t('error.detailTitle')}
          </Typography.Title>
          <Typography.Paragraph className="mb-0">
            <ol>
              <li>
                {t('error.detailLine.record')}
                <Typography.Text link>
                  <IconLink />
                  {t('error.detailLine.record.link')}
                </Typography.Text>
              </li>
              <li>
                {t('error.detailLine.auth')}
                <Typography.Text link>{t('error.detailLine.auth.link')}</Typography.Text>
              </li>
            </ol>
          </Typography.Paragraph>
        </div>
      </div>
    </div>
  );
}
