import {
  Card,
  Space,
  Select,
  Input,
  Button,
  Typography,
  Spin,
  Result,
} from 'antd';
import { DownloadOutlined, SmileFilled } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import MessageList from './MessageList';
import styles from './style.module.styl';
import { useChatListQuery } from '~/hooks/api/useMonitor';

/** 实时消息流：10s 轮询拉取 chatList */
export default function ChatPanel() {
  const { t } = useTranslation();
  const { data: messageList = [], isLoading: loading } = useChatListQuery();

  return (
    <Card variant="borderless" className={styles['chat-panel']}>
      <div className={styles['chat-panel-header']}>
        <Typography.Title level={5}>{t('monitor.title.chatPanel')}</Typography.Title>
        <Space size={8}>
          <Select
            className="w-80px"
            defaultValue="all"
            // antd v6 废弃了 Select.Option 子组件，改用 options 属性
            // / antd v6 deprecates the Select.Option child; use the options prop instead
            options={[{ value: 'all', label: t('monitor.chat.options.all') }]}
          />
          <Input.Search placeholder={t('monitor.chat.placeholder.searchCategory')} />
          <Button type="text" icon={<DownloadOutlined />} />
        </Space>
      </div>
      <div className="flex-1 box-border overflow-y-auto my-[20px]">
        <Spin spinning={loading} className="w-full">
          {messageList.length === 0 && !loading ? (
            <Result status="404" />
          ) : (
            <MessageList data={messageList} />
          )}
        </Spin>
      </div>
      <div className={styles['chat-panel-footer']}>
        <Space size={8}>
          <Input suffix={<SmileFilled />} />
          <Button type="primary">{t('monitor.chat.update')}</Button>
        </Space>
      </div>
    </Card>
  );
}
