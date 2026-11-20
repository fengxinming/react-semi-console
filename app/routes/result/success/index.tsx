import { Typography, Result, Button, Steps } from 'antd';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import styles from './style.module.styl';

export default function ResultSuccess() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div>
      <div className={styles.wrapper}>
        <Result
          className={styles.result}
          status="success"
          title={t('success.result.title')}
          subTitle={t('success.result.subTitle')}
          extra={[
            <Button key="print" className="mr-[16px]" onClick={() => window.print()}>
              {t('success.result.printResult')}
            </Button>,
            <Button key="list" type="primary" onClick={() => navigate('/dashboard/workplace')}>
              {t('success.result.projectList')}
            </Button>,
          ]}
        />
        <div className={styles['steps-wrapper']}>
          <Typography.Paragraph strong>{t('success.result.progress')}</Typography.Paragraph>
          <Steps
            current={2}
            items={[
              // antd v6：items.description 已废弃，改用 items.content（渲染结果一致）。
              // / antd v6: items.description is deprecated; use items.content (same rendering).
              { title: t('success.submitApplication'), content: '2020/10/10 14:00:39' },
              { title: t('success.leaderReview'), content: t('success.processing') },
              { title: t('success.purchaseCertificate'), content: t('success.waiting') },
              { title: t('success.safetyTest'), content: t('success.waiting') },
              { title: t('success.launched'), content: t('success.waiting') },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
