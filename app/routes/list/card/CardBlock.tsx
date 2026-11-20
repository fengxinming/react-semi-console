import { useState } from 'react';
import cs from 'classnames';
import { Button, Switch, Tag, Card, Descriptions, Typography, Dropdown, Skeleton } from 'antd';
import {
  StarFilled,
  LikeFilled,
  SunFilled,
  SmileFilled,
  EditFilled,
  CheckCircleFilled,
  CloseCircleFilled,
  MoreOutlined,
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import PermissionWrapper from '~/components/PermissionWrapper';
import type { CardBlockProps } from './types';
import styles from './style.module.styl';

const { Paragraph } = Typography;

const IconList = [
  { key: 'star', Comp: StarFilled },
  { key: 'thumbUp', Comp: LikeFilled },
  { key: 'sun', Comp: SunFilled },
  { key: 'smile', Comp: SmileFilled },
  { key: 'pen', Comp: EditFilled },
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
            <Button type="primary" className="!ml-[12px]" loading={loading}>
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
        <Tag color="green" icon={<CheckCircleFilled />} className="ml-[12px]">
          {t('cardList.tag.activated')}
        </Tag>
      );
    }
    switch (status) {
      case 1:
        return (
          <Tag color="green" icon={<CheckCircleFilled />} className="ml-[12px]">
            {t('cardList.tag.opened')}
          </Tag>
        );
      case 2:
        return (
          <Tag color="red" icon={<CloseCircleFilled />} className="ml-[12px]">
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
          paragraph={{ rows: type !== 'quality' ? 3 : 2 }}
          active
          className={styles['card-block-skeleton']}
        />
      );
    }
    if (type !== 'quality') {
      return <Paragraph>{card.description}</Paragraph>;
    }
    return (
      // antd v6：Descriptions 的 children / Descriptions.Item 写法已废弃，统一改用 items（附带 key 避免列表告警）
      // / antd v6 deprecates Descriptions' children / Descriptions.Item; use `items` (with keys to avoid list warnings)
      <Descriptions
        column={2}
        items={[
          {
            key: 'qualityCount',
            label: t('cardList.quality.qualityCount'),
            children: card.qualityCount,
          },
          {
            key: 'duration',
            label: t('cardList.quality.duration'),
            children: `${card.duration}s`,
          },
          {
            key: 'randomCount',
            label: t('cardList.quality.randomCount'),
            children: card.randomCount,
          },
        ]}
      />
    );
  };

  // antd v6 废弃了 Card 的 bordered，平替是 variant：
  // 裸 bordered（等价 true）→ variant="outlined"，bordered={false} → variant="borderless"。
  // 这里原来是裸 bordered，故写 outlined。
  // / antd v6 deprecates Card's `bordered` in favor of `variant`: a bare `bordered`
  // (equivalent to true) maps to variant="outlined"; bordered={false} maps to
  // variant="borderless". This was a bare `bordered`, hence outlined.
  return (
    <Card
      className={cs(styles['card-block'], styles[`${type}-card`])}
      variant="outlined"
      size="small"
      title={
        loading ? (
          <Skeleton
            active
            paragraph={{ rows: 1, width: ['100%'] }}
            title={false}
            className={styles['card-block-skeleton'] + ' w-[120px] h-[24px]'}
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
                menu={{
                  items: [
                    { key: 'op1', label: t('cardList.dropdown.operation1') },
                    { key: 'op2', label: t('cardList.dropdown.operation2') },
                  ],
                }}
                trigger={['click']}
                open={visible}
                onOpenChange={setVisible}
              >
                <div className={styles.more}>
                  <MoreOutlined />
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
