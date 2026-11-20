import { Result, Button } from 'antd';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import styles from './style.module.styl';

export default function Exception404() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <div className={styles.wrapper}>
      <Result
        status="404"
        subTitle={t('exception.result.404.description')}
        extra={[
          <Button key="retry" className="!mr-[16px]" onClick={() => navigate(-1)}>
            {t('exception.result.backPrev')}
          </Button>,
          <Button key="back" type="primary" onClick={() => navigate('/')}>
            {t('exception.result.backHome')}
          </Button>,
        ]}
      />
    </div>
  );
}
