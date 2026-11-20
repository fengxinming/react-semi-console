import type { ReactNode } from 'react';

/** 设置抽屉 props：由 ConsoleLayout 传入，visible 即抽屉开关状态
 *  / Props of the settings drawer; `visible` is the open flag */
export interface SettingDrawerProps {
  visible: boolean;
  onClose: () => void;
}

/** 抽屉内「标签 + 控件」一行的 props / Props of one "label + control" row in the drawer */
export interface SettingRowProps {
  label: string;
  children: ReactNode;
}