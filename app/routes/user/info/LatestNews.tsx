import { useMemo } from 'react';
import { Avatar, Listy, Skeleton, Typography } from 'antd';
import { useNewsQuery } from '~/hooks/api/useUser';
import type { NewsItem } from '~/api/types';
import styles from './style.module.styl';

const { Paragraph } = Typography;

/** 最新动态:头像 + 标题 + 单行省略描述。自取 /user/latestNews。 */
export default function LatestNews() {
  const { data = [], isLoading: loading } = useNewsQuery();

  // 同 MyTeam：Listy 需要 rowKey 且没有下标兜底。动态数据自带 id，
  // 骨架屏占位数据没有，就用下标补齐。
  // / Same as MyTeam: Listy requires a rowKey with no index fallback. Real news items carry an
  // id; the skeleton placeholders do not, so the index fills in for them.
  const items = useMemo(() => {
    const source: NewsItem[] = data.length ? data : Array.from({ length: 4 }, () => ({}));
    return source.map((item, index) => ({ ...item, key: String(item.id ?? index) }));
  }, [data]);

  return (
    <Listy
      className={styles['news-list']}
      items={items}
      rowKey="key"
      itemRender={(item) => (
        <Skeleton
          loading={loading}
          active
          paragraph={{ rows: 2, width: ['60%', '90%'] }}
          title={false}
          avatar={{ shape: 'circle' }}
        >
          {/* 见 MyTeam：Listy 无 List.Item.Meta，.list-item 承担「头像 + 内容」两栏布局 */}
          {/* / See MyTeam: Listy has no List.Item.Meta, so .list-item provides the two columns */}
          <div className={styles['list-item']}>
            <Avatar size={48}>
              <img src={item.avatar} alt="" />
            </Avatar>
            <div className={styles['list-item-content']}>
              <div className={styles['list-item-title']}>{item.title}</div>
              <Paragraph ellipsis={{ rows: 1 }} type="secondary" className="text-[12px] m-0">
                {item.description}
              </Paragraph>
            </div>
          </div>
        </Skeleton>
      )}
    />
  );
}