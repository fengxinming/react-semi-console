import { Button, Empty } from '@douyinfe/semi-ui';
import { IconAlertCircle } from '@douyinfe/semi-icons';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import styles from './style.module.styl';

export default function Exception500() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <div className={styles.wrapper}>
      <Empty
        image={<IconAlertCircle style={{ fontSize: 72 }} />}
        description={t('exception.result.500.description')}
      >
        <div>
          <Button
            key="backPrev"
            type="secondary"
            className="!mr-[16px]"
            onClick={() => navigate(-1)}
          >
            {t('exception.result.backPrev')}
          </Button>
          <Button key="backHome" type="primary" theme="solid" onClick={() => navigate('/')}>
            {t('exception.result.backHome')}
          </Button>
        </div>
      </Empty>
    </div>
  );
}
