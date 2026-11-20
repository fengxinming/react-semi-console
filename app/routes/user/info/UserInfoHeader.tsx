import { Avatar, Space, Skeleton } from 'antd';
import { EnvironmentOutlined, HomeOutlined, UserOutlined } from '@ant-design/icons';
import { useUserStore } from '~/store';
import type { UserText } from './types';
import styles from './style.module.styl';

function Text({ loading, children }: UserText) {
  return (
    <span className={styles['user-msg-text']}>
      <Skeleton
        className="inline-block"
        loading={loading}
        paragraph={{ rows: 1, width: ['100%'] }}
        title={false}
        active
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
      <Space size={8} orientation="vertical" align="center" className={styles['header-content']}>
        <Skeleton loading={loading} avatar={{ shape: 'circle', size: 64 }} title={false} paragraph={false} active>
          <Avatar size={64}>
            <img src={userInfo?.avatar} alt="avatar" />
          </Avatar>
        </Skeleton>
        <Skeleton
          loading={loading}
          paragraph={{ rows: 1, width: ['100%'] }}
          title={false}
          active
        >
          <div className="font-medium text-[16px]/[24px]">{userInfo?.name}</div>
        </Skeleton>
        <div className={styles['user-msg']}>
          <Space size={18}>
            <div className={styles['user-msg']}>
              <UserOutlined />
              <Text loading={loading}>{userInfo?.jobName}</Text>
            </div>
            <div className={styles['user-msg']}>
              <HomeOutlined />
              <Text loading={loading}>{userInfo?.organizationName}</Text>
            </div>
            <div className={styles['user-msg']}>
              <EnvironmentOutlined />
              <Text loading={loading}>{userInfo?.locationName}</Text>
            </div>
          </Space>
        </div>
      </Space>
    </div>
  );
}
