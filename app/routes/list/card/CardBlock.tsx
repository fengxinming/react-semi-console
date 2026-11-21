import { useState } from 'react';
import cs from 'classnames';
import { Button, Switch, Tag, Card, Descriptions, Typography, Dropdown, Skeleton } from '@douyinfe/semi-ui';
import {
  IconStar,
  IconLikeThumb,
  IconSun,
  IconEmoji,
  IconEdit,
  IconTickCircle,
  IconAlertCircle,
  IconMore,
} from '@douyinfe/semi-icons';
import { useTranslation } from 'react-i18next';
import PermissionWrapper from '~/components/PermissionWrapper';
import type { CardBlockProps } from './types';
import styles from './style.module.styl';

const { Paragraph } = Typography;

const IconList = [
  { key: 'star', Comp: IconStar },
  { key: 'thumbUp', Comp: IconLikeThumb },
  { key: 'sun', Comp: IconSun },
  { key: 'smile', Comp: IconEmoji },
  { key: 'pen', Comp: IconEdit },
].map(({ key, Comp }) => <Comp key={key} />);

const EMPTY_CARD: CardBlockProps['card'] = {};

export default function CardBlock({
  type,
  card = EMPTY_CARD,
  loading: loadingProp,
}: CardBlockProps) {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [statusOverride, setStatusOverride] = useState<0 | 1 | 2 | undefined>(undefined);

  const status = statusOverride ?? card.status;
  const loading = loadingProp || actionLoading;

  const changeStatus = async () => {
    setActionLoading(true);
    await new Promise<void>((resolve) => {
      setTimeout(() => {
        setStatusOverride(status === 1 ? 0 : 1);
        resolve();
      }, 1000);
    });
    setActionLoading(false);
  };

  const getTitleIcon = () =>
    type === 'service' && typeof card.icon === 'number' ? (
      <div className={styles.icon}>{IconList[card.icon % IconList.length]}</div>
    ) : null;

  const getButtonGroup = () => {
    if (type === 'quality') {
      return (
        <>
          <PermissionWrapper per={[{ resource: /^menu.list.*/, actions: ['read'] }]}>
            <Button type="primary" theme="solid" className="!ml-[12px]" loading={loading}>
              {t('cardList.options.qualityInspection')}
            </Button>
          </PermissionWrapper>
          <PermissionWrapper per={[{ resource: /^menu.list.*/, actions: ['write'] }]}>
            <Button loading={loading}>{t('cardList.options.remove')}</Button>
          </PermissionWrapper>
        </>
      );
    }

    if (type === 'service') {
      return status === 1 ? (
        <Button loading={loading} onClick={changeStatus}>
          {t('cardList.options.cancel')}
        </Button>
      ) : (
        <Button loading={loading} onClick={changeStatus}>
          {status === 0 ? t('cardList.options.subscribe') : t('cardList.options.renewal')}
        </Button>
      );
    }

    return <Switch checked={!!status} loading={loading} onChange={changeStatus} />;
  };

  const getStatus = () => {
    if (type === 'rules' && status) {
      return (
        <Tag color="green" prefixIcon={<IconTickCircle />} className="ml-[12px]">
          {t('cardList.tag.activated')}
        </Tag>
      );
    }
    switch (status) {
      case 1:
        return (
          <Tag color="green" prefixIcon={<IconTickCircle />} className="ml-[12px]">
            {t('cardList.tag.opened')}
          </Tag>
        );
      case 2:
        return (
          <Tag color="red" prefixIcon={<IconAlertCircle />} className="ml-[12px]">
            {t('cardList.tag.expired')}
          </Tag>
        );
      default:
        return null;
    }
  };

  const getContent = () => {
    if (loading) {
      return (
        <Skeleton
          active
          className={styles['card-block-skeleton']}
          placeholder={<Skeleton.Paragraph rows={type !== 'quality' ? 3 : 2} />}
        />
      );
    }
    if (type !== 'quality') {
      return <Paragraph>{card.description}</Paragraph>;
    }
    return (
      // Semi Descriptions 用 data（key 对应 label，value 对应内容）
      // / Semi Descriptions uses `data` (key is the label, value is the content)
      <Descriptions
        column={2}
        data={[
          { key: t('cardList.quality.qualityCount'), value: card.qualityCount },
          { key: t('cardList.quality.duration'), value: `${card.duration}s` },
          { key: t('cardList.quality.randomCount'), value: card.randomCount },
        ]}
      />
    );
  };

  // Semi Card 用 bordered 控制边框。
  // / Semi Card uses `bordered` to control the border.
  return (
    <Card
      className={cs(styles['card-block'], styles[`${type}-card`])}
      bordered
      title={
        loading ? (
          <Skeleton
            active
            className={styles['card-block-skeleton'] + ' w-[120px] h-[24px]'}
            placeholder={<Skeleton.Paragraph rows={1} />}
          />
        ) : (
          <>
            <div
              className={cs(styles.title, {
                [styles['title-more']]: visible,
              })}
            >
              {getTitleIcon()}
              {card.title}
              {getStatus()}
              <Dropdown
                menu={[
                  { node: 'item', name: t('cardList.dropdown.operation1') },
                  { node: 'item', name: t('cardList.dropdown.operation2') },
                ]}
                trigger="click"
                visible={visible}
                onVisibleChange={setVisible}
              >
                <div className={styles.more}>
                  <IconMore />
                </div>
              </Dropdown>
            </div>
            <div className={styles.time}>{card.time}</div>
          </>
        )
      }
    >
      <div className={styles.content}>{getContent()}</div>
      <div className="flex flex-row-reverse">{getButtonGroup()}</div>
    </Card>
  );
}
