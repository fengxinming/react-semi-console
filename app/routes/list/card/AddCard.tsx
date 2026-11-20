import { Card } from 'antd';
import cs from 'classnames';
import { PlusOutlined } from '@ant-design/icons';
import type { AddCardProps } from './types';
import styles from './style.module.styl';

export default function AddCard({ description }: AddCardProps) {
  // antd v6 废弃了 Card 的 bordered，平替是 variant：
  // 裸 bordered（等价 true）→ variant="outlined"，bordered={false} → variant="borderless"。
  // 这里原来是裸 bordered，故写 outlined。
  // / antd v6 deprecates Card's `bordered` in favor of `variant`: a bare `bordered`
  // (equivalent to true) maps to variant="outlined"; bordered={false} maps to
  // variant="borderless". This was a bare `bordered`, hence outlined.
  return (
    <Card
      className={cs(styles['card-block'], styles['add-card'])}
      variant="outlined"
      title={null}
      size="small"
    >
      <div className={styles.content}>
        <div className="text-[22px]">
          <PlusOutlined />
        </div>
        <div className={styles.description}>{description}</div>
      </div>
    </Card>
  );
}
