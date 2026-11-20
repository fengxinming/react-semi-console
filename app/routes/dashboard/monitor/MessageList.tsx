import { Space, Typography } from 'antd';
import { ControlOutlined, StarOutlined } from '@ant-design/icons';
import classnames from 'classnames';
import styles from './style.module.styl';
import type { MessageItemProps, MessageListProps } from './types';

function MessageItem({ data }: MessageItemProps) {
  return (
    <div
      className={classnames({
        [styles['message-item']]: true,
        [styles['message-item-collected']]: data.isCollect,
      })}
    >
      <Space size={4} orientation="vertical" className="w-full">
        <Typography.Text type="warning">{data.username}</Typography.Text>
        <Typography.Text>{data.content}</Typography.Text>
        <div className="flex justify-between items-center">
          <div>
            <Typography.Text type="secondary">{data.time}</Typography.Text>
          </div>
          <div className={styles['message-item-actions']}>
            <div className={styles['message-item-actions-item']}>
              <ControlOutlined />
            </div>
            <div
              className={classnames([
                styles['message-item-actions-item'],
                styles['message-item-actions-collect'],
              ])}
            >
              <StarOutlined />
            </div>
          </div>
        </div>
      </Space>
    </div>
  );
}

export default function MessageList({ data }: MessageListProps) {
  return (
    <div className="h-full overflow-y-auto">
      {data && data.map((item) => <MessageItem key={item.id} data={item} />)}
    </div>
  );
}
