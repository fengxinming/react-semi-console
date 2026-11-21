import { Card, Typography } from '@douyinfe/semi-ui';
import { useTranslation } from 'react-i18next';
import styles from './style.module.styl';

const links: Record<string, string> = {
  react: 'https://semi.design/en-US/start/getting-started',
  components: 'https://semi.design/en-US/components/overview',
  theme: 'https://semi.design/en-US/start/customize-theme',
  github: 'https://github.com/DouyinFE/semi-design',
};

export default function Docs() {
  const { t } = useTranslation();

  return (
    <Card bordered={false}>
      <div className="flex justify-between">
        <Typography.Title heading={5}>{t('workplace.docs')}</Typography.Title>
        <Typography.Text link>{t('workplace.seeMore')}</Typography.Text>
      </div>
      <div className={styles.docs}>
        {Object.entries(links).map(([key, href]) => (
          <Typography.Text
            link={{ href, target: '_blank' }}
            key={key}
            className={styles['doc-link']}
          >
            {t(`workplace.${key}`)}
          </Typography.Text>
        ))}
      </div>
    </Card>
  );
}
