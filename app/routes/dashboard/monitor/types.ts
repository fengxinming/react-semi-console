import type { ChatMessage } from '~/api/types';

/** 单条消息项 props / Props of a single message item */
export interface MessageItemProps {
  data: ChatMessage;
}

/** 消息列表 props / Props of the message list */
export interface MessageListProps {
  data: ChatMessage[];
}