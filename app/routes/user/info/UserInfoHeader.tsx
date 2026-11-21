import { Avatar, Space, Skeleton } from '@douyinfe/semi-ui';
import { IconMapPin, IconHome, IconUser } from '@douyinfe/semi-icons';
import { useUserStore } from '~/store';
import type { UserText } from './types';
import styles from './style.module.styl';

function Text({ loading, children }: UserText) {
  return (
    <span className={styles['user-msg-text']}>
      <Skeleton
        className="inline-block"
        loading={loading}
        active
        placeholder={<Skeleton.Paragraph rows={1} />}
      >
        {children}
      </Skeleton>
    </span>
  );
}

/** 个人信息头部:居中头像(可换) + 姓名 + 职位/组织/定位。自取 /user/info。 */
export default function UserInfoHeader() {
  const userInfo = useUserStore((s) => s.user);
  const loading = !userInfo;

  return (
    <div className={styles.header}>
      <Space spacing={8} vertical align="center" className={styles['header-content']}>
        <Skeleton
          loading={loading}
          active
          placeholder={<Skeleton.Avatar shape="circle" size="large" />}
        >
          <Avatar size="large">
            <img src={userInfo?.avatar} alt="avatar" />
          </Avatar>
        </Skeleton>
        <Skeleton loading={loading} active placeholder={<Skeleton.Paragraph rows={1} />}>
          <div className="font-medium text-[16px]/[24px]">{userInfo?.name}</div>
        </Skeleton>
        <div className={styles['user-msg']}>
          <Space spacing={18}>
            <div className={styles['user-msg']}>
              <IconUser />
              <Text loading={loading}>{userInfo?.jobName}</Text>
            </div>
            <div className={styles['user-msg']}>
              <IconHome />
              <Text loading={loading}>{userInfo?.organizationName}</Text>
            </div>
            <div className={styles['user-msg']}>
              <IconMapPin />
              <Text loading={loading}>{userInfo?.locationName}</Text>
            </div>
          </Space>
        </div>
      </Space>
    </div>
  );
}
