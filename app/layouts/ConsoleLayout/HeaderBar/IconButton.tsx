import { forwardRef } from 'react';
import { Button, Tooltip } from 'antd';
import styles from './style.module.styl';
import type { IconButtonProps } from './types';

const cs = (...args: (string | undefined | false | null | Record<string, boolean>)[]) => {
  const out: string[] = [];
  for (const a of args) {
    if (!a) {
      continue;
    }
    if (typeof a === 'string') {
      out.push(a);
    } else if (typeof a === 'object') {
      for (const k of Object.keys(a)) {
        if (a[k]) {
          out.push(k);
        }
      }
    }
  }
  return out.join(' ');
};

const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ icon, className, onClick, tooltip, ...rest }, ref) => {
    const btn = (
      <Button
        ref={ref}
        icon={icon}
        shape="circle"
        className={cs(styles['icon-button'], className)}
        onClick={onClick}
        {...rest}
      />
    );
    return tooltip ? <Tooltip title={tooltip}>{btn}</Tooltip> : btn;
  },
);

IconButton.displayName = 'IconButton';

export default IconButton;
