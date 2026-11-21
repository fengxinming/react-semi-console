import type { ButtonProps } from '@douyinfe/semi-ui/lib/es/button';

export type IconButtonProps = Omit<ButtonProps, 'icon' | 'onClick' | 'className'> & {
  icon: React.ReactNode;
  className?: string;
  onClick?: () => void;
  tooltip?: string;
};

export interface SearchResult {
  key: string;
  name: string;
}
