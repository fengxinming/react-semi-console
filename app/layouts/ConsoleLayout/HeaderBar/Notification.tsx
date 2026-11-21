import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import {
  Avatar,
  Badge,
  Button,
  Empty,
  List,
  Popover,
  Tabs,
  Tag,
  Typography,
} from '@douyinfe/semi-ui';
import { IconBell } from '@douyinfe/semi-icons';
import { useTranslation } from 'react-i18next';
import { useNoticesQuery, useMarkRead } from '~/hooks/api/useNotice';
import IconButton from './IconButton';
import type { NoticeItem, NoticeTab } from '~/api/types';
import styles from './style.module.styl';

const TABS = [
  { key: 'message', label: 'navbar.notice.message' },
  { key: 'notice', label: 'navbar.notice.notice' },
  { key: 'todo', label: 'navbar.notice.todo' },
] as const;

export default function Notification() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [noticeTab, setNoticeTab] = useState<NoticeTab>('message');
  const { data: notices = [], refetch } = useNoticesQuery();
  const { mutate: markReadMutate } = useMarkRead();

  // 一次遍历完成「按标签分组 + 统计未读」，渲染时直接取用，
  // 避免同一份数据在渲染里被反复 filter
  const { byTab, unreadByTab, unread } = useMemo(() => {
    const byTab = new Map<NoticeTab, NoticeItem[]>();
    const unreadByTab = new Map<NoticeTab, number>();
    let unreadCount = 0;

    for (const n of notices) {
      const group = byTab.get(n.tab);
      if (group) {
        group.push(n);
      } else {
        byTab.set(n.tab, [n]);
      }
      if (!n.read) {
        unreadByTab.set(n.tab, (unreadByTab.get(n.tab) ?? 0) + 1);
        unreadCount += 1;
      }
    }
    return { byTab, unreadByTab, unread: unreadCount };
  }, [notices]);

  const currentTabNotices = byTab.get(noticeTab) ?? [];

  const markAllRead = () => markReadMutate(undefined);
  const markRead = (id: string) => markReadMutate(id);

  // Semi Tabs 用 tabList（itemKey/tab）+ children TabPane，无 items prop
  const tabList = TABS.map((tab) => {
    const count = unreadByTab.get(tab.key) ?? 0;
    return {
      itemKey: tab.key,
      tab: count > 0 ? `${t(tab.label)} (${count})` : t(tab.label),
    };
  });

  const NotificationPopup = (
    <div className={styles['notice-panel']}>
      <Tabs
        activeKey={noticeTab}
        onChange={(k) => setNoticeTab(k as NoticeTab)}
        tabList={tabList}
      />
      {currentTabNotices.length === 0 ? (
        <div className={styles['notice-empty']}>
          <Empty description={t('common.empty')} />
        </div>
      ) : (
        <>
          {/* Semi List 用 dataSource + renderItem，无 Listy/List.Item.Meta；两栏布局自己拼装 */}
          <List
            dataSource={currentTabNotices}
            renderItem={(n) => (
              <List.Item
                className={styles['notice-item']}
                style={{ opacity: n.read ? 0.5 : 1 }}
                onClick={() => {
                  if (!n.read) {
                    markRead(n.id);
                  }
                }}
              >
                <Avatar shape="circle" size="medium">
                  {n.avatar ? <img src={n.avatar} alt={n.name} /> : (n.name?.[0] ?? '?')}
                </Avatar>
                <div className={styles['notice-item-content']}>
                  <div className={styles['notice-item-title']}>
                    <div className="flex justify-between items-center">
                      <span>{n.name}</span>
                      {!n.read && <Tag color="blue">{t('navbar.notice.unread')}</Tag>}
                    </div>
                  </div>
                  <div className={styles['notice-content']}>{n.content}</div>
                  <Typography.Text type="secondary" className="text-[12px]">
                    {n.time}
                  </Typography.Text>
                </div>
              </List.Item>
            )}
          />
          <div className={styles['notice-footer']}>
            <div className={styles['notice-footer-item']}>
              <Button
                theme="borderless"
                type="tertiary"
                size="small"
                onClick={() => void markAllRead()}
              >
                {t('navbar.notice.readAll')}
              </Button>
            </div>
            <div className={styles['notice-footer-item']}>
              <Button
                theme="borderless"
                type="tertiary"
                size="small"
                onClick={() => navigate('/dashboard/workplace')}
              >
                {t('navbar.notice.more')}
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );

  return (
    <Popover
      trigger="hover"
      content={NotificationPopup}
      position="bottomRight"
      onVisibleChange={(visible) => {
        if (visible) {
          refetch();
        }
      }}
    >
      <Badge count={unread} dot type="danger">
        <IconButton icon={<IconBell />} />
      </Badge>
    </Popover>
  );
}
