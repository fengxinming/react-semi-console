import { Card } from '@douyinfe/semi-ui';
import cs from 'classnames';
import { IconPlus } from '@douyinfe/semi-icons';
import type { AddCardProps } from './types';
import styles from './style.module.styl';

export default function AddCard({ description }: AddCardProps) {
  // Semi Card 直接保留 bordered；这里原来是带边框卡片。
  // / Semi Card keeps `bordered`; this card uses the default bordered style.
  return (
    <Card
      className={cs(styles['card-block'], styles['add-card'])}
      bordered
      title={null}
    >
      <div className={styles.content}>
        <div className="text-[22px]">
          <IconPlus />
        </div>
        <div className={styles.description}>{description}</div>
      </div>
    </Card>
  );
}
