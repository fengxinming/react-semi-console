import { useMemo } from 'react';
import { Avatar, List, Skeleton, Typography } from '@douyinfe/semi-ui';
import { useTeamsQuery } from '~/hooks/api/useUser';
import type { TeamItem } from '~/api/types';
import styles from './style.module.styl';

const { Text } = Typography;

/** 我的团队:头像 + 团队名 + 共X人。自取 /users/teamList。 */
export default function MyTeam() {
  const { data = [], isLoading: loading } = useTeamsQuery();

  // Semi List 以 dataSource + renderItem 渲染，没有 rowKey（只按数组顺序），
  // 而数据里没有唯一字段（mock 的头像可能重复），因此沿用下标作 key 的做法。
  // / Semi List renders via dataSource + renderItem with no rowKey (array order only), and the
  // data has no unique field (mock avatars can repeat), so the index keeps serving as the key.
  const items = useMemo(() => {
    const source: TeamItem[] = data.length ? data : Array.from({ length: 4 }, () => ({}));
    return source.map((item, index) => ({ ...item, key: String(index) }));
  }, [data]);

  return (
    <List
      className={styles['team-list']}
      dataSource={items}
      renderItem={(item) => (
        <Skeleton
          loading={loading}
          active
          placeholder={
            <>
              <Skeleton.Avatar shape="circle" size="medium" />
              <Skeleton.Paragraph rows={2} />
            </>
          }
        >
          {/* Semi List 没有 List.Item.Meta，头像与内容由 .list-item 自己排成两栏。
              Skeleton 在 loading=false 时原样返回 children，所以这里必须只给一个根节点。
              / Semi List has no List.Item.Meta, so .list-item lays the avatar and content out in two
              columns. Skeleton returns children as-is when loading=false, hence the single root. */}
          <div className={styles['list-item']} key={item.key}>
            <Avatar size="medium">
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
