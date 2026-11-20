import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import { Avatar, Badge, Button, Empty, Listy, Popover, Tabs, Tag, Typography } from 'antd';
import { BellOutlined } from '@ant-design/icons';
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
  // / One pass groups notices by tab and counts unread so that render can consume the result
  // directly, instead of filtering the same array over and over.
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

  // 标记为已读：本地乐观更新缓存（useMarkRead 内部 onMutate）
  const markAllRead = () => markReadMutate(undefined);
  const markRead = (id: string) => markReadMutate(id);

  const tabItems = TABS.map((tab) => {
    const count = unreadByTab.get(tab.key) ?? 0;
    return { key: tab.key, label: count > 0 ? `${t(tab.label)} (${count})` : t(tab.label) };
  });

  const NotificationPopup = (
    <div className={styles['notice-panel']}>
      <Tabs activeKey={noticeTab} onChange={(k) => setNoticeTab(k as NoticeTab)} items={tabItems} />
      {currentTabNotices.length === 0 ? (
        <div className={styles['notice-empty']}>
          <Empty description={t('common.empty')} />
        </div>
      ) : (
        <>
          {/* antd v6 起 List 废弃，改用 Listy：它只有 items/rowKey/itemRender 三个核心入参，
              没有 List.Item.Meta，也没有 footer，所以两栏布局与底部按钮都改为自己拼装。
              / antd v6 deprecates List in favor of Listy, which only takes items/rowKey/itemRender:
              it has neither List.Item.Meta nor a footer, so the two-column layout and the footer
              are composed by hand. */}
          <Listy
            items={currentTabNotices}
            rowKey="id"
            itemRender={(n) => (
              <div
                className={styles['notice-item']}
                style={{ opacity: n.read ? 0.5 : 1 }}
                onClick={() => {
                  if (!n.read) {
                    markRead(n.id);
                  }
                }}
              >
                <Avatar shape="circle" size={36}>
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
              </div>
            )}
          />
          <div className={styles['notice-footer']}>
            <div className={styles['notice-footer-item']}>
              <Button type="link" size="small" onClick={() => void markAllRead()}>
                {t('navbar.notice.readAll')}
              </Button>
            </div>
            <div className={styles['notice-footer-item']}>
              <Button type="link" size="small" onClick={() => navigate('/dashboard/workplace')}>
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
      placement="bottomRight"
      // 弹层容器自带 12px 内边距，会让面板四周多出一圈空白（再叠上 .notice-panel 自己的
      // 背景/边框/阴影就成了内外两层框）。这里清零内边距，让 Tabs 分隔线、列表分隔线铺满弹层。
      // / The popover container ships with 12px padding, leaving a blank gutter around the panel
      // (and a double frame once .notice-panel's own bg/border/shadow is added). Zero it so the
      // tab divider and list dividers span the whole popup.
      styles={{ container: { padding: 0 } }}
      onOpenChange={(open) => {
        if (open) {
          refetch();
        }
      }}
    >
      <Badge count={unread} dot>
        <IconButton icon={<BellOutlined />} />
      </Badge>
    </Popover>
  );
}
