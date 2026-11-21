import { Card, Space, Select, Input, Button, Typography, Spin, Empty } from '@douyinfe/semi-ui';
import { IconDownload, IconEmoji, IconSearch } from '@douyinfe/semi-icons';
import { useTranslation } from 'react-i18next';
import MessageList from './MessageList';
import styles from './style.module.styl';
import { useChatListQuery } from '~/hooks/api/useMonitor';

/** 实时消息流：10s 轮询拉取 chatList */
export default function ChatPanel() {
  const { t } = useTranslation();
  const { data: messageList = [], isLoading: loading } = useChatListQuery();

  return (
    <Card bordered={false} className={styles['chat-panel']}>
      <div className={styles['chat-panel-header']}>
        <Typography.Title heading={5}>{t('monitor.title.chatPanel')}</Typography.Title>
        <Space spacing={8}>
          <Select
            defaultValue="all"
            // Semi 使用 optionList 属性配置选项，不使用 Select.Option 子组件
            // / Semi configures options via the optionList prop instead of Select.Option children
            optionList={[{ value: 'all', label: t('monitor.chat.options.all') }]}
          />
          <Input
            className="w-[150px]"
            placeholder={t('monitor.chat.placeholder.searchCategory')}
            suffix={<IconSearch />}
          />
          <Button theme="borderless" type="tertiary" icon={<IconDownload />} />
        </Space>
      </div>
      <div className="flex-1 box-border overflow-y-auto my-[20px]">
        <Spin spinning={loading} className="w-full">
          {messageList.length === 0 && !loading ? <Empty /> : <MessageList data={messageList} />}
        </Spin>
      </div>
      <div className={styles['chat-panel-footer']}>
        <Space spacing={8}>
          <Input suffix={<IconEmoji />} />
          <Button type="primary" theme="solid">{t('monitor.chat.update')}</Button>
        </Space>
      </div>
    </Card>
  );
}
