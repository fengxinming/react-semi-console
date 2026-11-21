import { useMemo } from 'react';
import { Avatar, List, Skeleton, Typography } from '@douyinfe/semi-ui';
import { useNewsQuery } from '~/hooks/api/useUser';
import type { NewsItem } from '~/api/types';
import styles from './style.module.styl';

const { Paragraph } = Typography;

/** 最新动态:头像 + 标题 + 单行省略描述。自取 /user/latestNews。 */
export default function LatestNews() {
  const { data = [], isLoading: loading } = useNewsQuery();

  // 同 MyTeam：Semi List 用 dataSource + renderItem 渲染，没有 rowKey 也没有下标兜底。
  // 动态数据自带 id，骨架屏占位数据没有，就用下标作 key 补齐。
  // / Same as MyTeam: Semi List renders via dataSource + renderItem, with no rowKey and no index
  // fallback. Real news items carry an id; the skeleton placeholders do not, so the index fills in.
  const items = useMemo(() => {
    const source: NewsItem[] = data.length ? data : Array.from({ length: 4 }, () => ({}));
    return source.map((item, index) => ({ ...item, key: String(item.id ?? index) }));
  }, [data]);

  return (
    <List
      className={styles['news-list']}
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
          {/* 见 MyTeam：Semi List 无 List.Item.Meta，.list-item 承担「头像 + 内容」两栏布局 */}
          {/* / See MyTeam: Semi List has no List.Item.Meta, so .list-item provides the two columns */}
          <div className={styles['list-item']} key={item.key}>
            <Avatar size="medium">
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
