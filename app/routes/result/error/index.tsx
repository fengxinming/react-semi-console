import { Typography, Result, Button } from 'antd';
import { LinkOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import styles from './style.module.styl';

export default function ResultError() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div>
      <div className={styles.wrapper}>
        <Result
          className={styles.result}
          status="error"
          title={t('error.result.title')}
          subTitle={t('error.result.subTitle')}
          extra={[
            <Button
              key="back"
              className="mr-[16px]"
              onClick={() => navigate('/dashboard/workplace')}
            >
              {t('error.result.goBack')}
            </Button>,
            <Button key="retry" type="primary" onClick={() => navigate(-1)}>
              {t('error.result.retry')}
            </Button>,
          ]}
        />
        <div className={styles['details-wrapper']}>
          <Typography.Title level={5} className="mt-0">
            {t('error.detailTitle')}
          </Typography.Title>
          <Typography.Paragraph className="mb-0">
            <ol>
              <li>
                {t('error.detailLine.record')}
                <Typography.Link>
                  <LinkOutlined />
                  {t('error.detailLine.record.link')}
                </Typography.Link>
              </li>
              <li>
                {t('error.detailLine.auth')}
                <Typography.Link>{t('error.detailLine.auth.link')}</Typography.Link>
              </li>
            </ol>
          </Typography.Paragraph>
        </div>
      </div>
    </div>
  );
}
