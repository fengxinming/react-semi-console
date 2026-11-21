import { Typography, Button, Steps, Space } from '@douyinfe/semi-ui';
import { IconTickCircle } from '@douyinfe/semi-icons';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import styles from './style.module.styl';

export default function ResultSuccess() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div>
      <div className={styles.wrapper}>
        {/* Semi 无 Result，用 Icon + Typography + Space 自行拼装 */}
        {/* / Semi has no Result; compose it from Icon + Typography + Space */}
        <div className={styles.result + ' text-center'}>
          <IconTickCircle style={{ fontSize: 64, color: 'var(--semi-color-success)' }} />
          <Typography.Title heading={3}>{t('success.result.title')}</Typography.Title>
          <Typography.Paragraph type="secondary" className="my-[8px]">
            {t('success.result.subTitle')}
          </Typography.Paragraph>
          <Space>
            <Button className="mr-[16px]" onClick={() => window.print()}>
              {t('success.result.printResult')}
            </Button>
            <Button type="primary" theme="solid" onClick={() => navigate('/dashboard/workplace')}>
              {t('success.result.projectList')}
            </Button>
          </Space>
        </div>
        <div className={styles['steps-wrapper']}>
          <Typography.Paragraph strong>{t('success.result.progress')}</Typography.Paragraph>
          <Steps current={2}>
            <Steps.Step title={t('success.submitApplication')} description="2020/10/10 14:00:39" />
            <Steps.Step title={t('success.leaderReview')} description={t('success.processing')} />
            <Steps.Step
              title={t('success.purchaseCertificate')}
              description={t('success.waiting')}
            />
            <Steps.Step title={t('success.safetyTest')} description={t('success.waiting')} />
            <Steps.Step title={t('success.launched')} description={t('success.waiting')} />
          </Steps>
        </div>
      </div>
    </div>
  );
}
