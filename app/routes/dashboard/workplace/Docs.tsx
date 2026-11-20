import { Card, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import styles from './style.module.styl';

const links: Record<string, string> = {
  react: 'https://arco.design/react/docs/start',
  vue: 'https://arco.design/vue/docs/start',
  designLab: 'https://arco.design/themes',
  materialMarket: 'https://arco.design/material/',
};

export default function Docs() {
  const { t } = useTranslation();

  return (
    <Card variant="borderless">
      <div className="flex justify-between">
        <Typography.Title level={5}>{t('workplace.docs')}</Typography.Title>
        <Typography.Link>{t('workplace.seeMore')}</Typography.Link>
      </div>
      <div className={styles.docs}>
        {Object.entries(links).map(([key, href]) => (
          <Typography.Link key={key} className={styles['doc-link']} href={href} target="_blank">
            {t(`workplace.${key}`)}
          </Typography.Link>
        ))}
      </div>
    </Card>
  );
}
