import { Button, Empty } from '@douyinfe/semi-ui';
import { IconSearch } from '@douyinfe/semi-icons';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import styles from './style.module.styl';

export default function Exception404() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <div className={styles.wrapper}>
      <Empty
        image={<IconSearch style={{ fontSize: 72 }} />}
        description={t('exception.result.404.description')}
      >
        <div>
          <Button key="retry" type="secondary" className="!mr-[16px]" onClick={() => navigate(-1)}>
            {t('exception.result.backPrev')}
          </Button>
          <Button key="back" type="primary" theme="solid" onClick={() => navigate('/')}>
            {t('exception.result.backHome')}
          </Button>
        </div>
      </Empty>
    </div>
  );
}
