import { useMemo } from 'react';
import { Avatar, Listy, Skeleton, Typography } from 'antd';
import { useTeamsQuery } from '~/hooks/api/useUser';
import type { TeamItem } from '~/api/types';
import styles from './style.module.styl';

const { Text } = Typography;

/** 我的团队:头像 + 团队名 + 共X人。自取 /users/teamList。 */
export default function MyTeam() {
  const { data = [], isLoading: loading } = useTeamsQuery();

  // antd v6 起 List 整体废弃，改用 Listy。Listy 只按 rowKey 做 diff（没有下标兜底），
  // 而数据里没有唯一字段（mock 的头像可能重复），因此沿用改造前 List 用下标作 key 的做法。
  // / antd v6 deprecates List in favor of Listy. Listy diffs only by rowKey (no index fallback),
  // and the data has no unique field (mock avatars can repeat), so the index keeps serving as the
  // key, exactly as the previous List did.
  const items = useMemo(() => {
    const source: TeamItem[] = data.length ? data : Array.from({ length: 4 }, () => ({}));
    return source.map((item, index) => ({ ...item, key: String(index) }));
  }, [data]);

  return (
    <Listy
      className={styles['team-list']}
      items={items}
      rowKey="key"
      itemRender={(item) => (
        <Skeleton
          loading={loading}
          active
          paragraph={{ rows: 2, width: ['80%', '20%'] }}
          title={false}
          avatar={{ shape: 'circle' }}
        >
          {/* Listy 没有 List.Item.Meta，头像与内容由 .list-item 自己排成两栏。
              Skeleton 在 loading=false 时原样返回 children，所以这里必须只给一个根节点。
              / Listy has no List.Item.Meta, so .list-item lays the avatar and content out in two
              columns. Skeleton returns children as-is when loading=false, hence the single root. */}
          <div className={styles['list-item']}>
            <Avatar size={48}>
              <img src={item.avatar} alt={item.name} />
            </Avatar>
            <div className={styles['list-item-content']}>
              <div className={styles['list-item-title']}>{item.name}</div>
              <Text type="secondary" className="text-[12px]">
                {`共${(item.members || 0).toLocaleString()}人`}
              </Text>
            </div>
          </div>
        </Skeleton>
      )}
    />
  );
}