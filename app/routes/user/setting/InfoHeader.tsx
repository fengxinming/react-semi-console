import { useState } from 'react';
import { Avatar, Upload, Descriptions, Tag, Skeleton, Typography } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useUserStore } from '~/store';
import type { InfoTextProps } from './types';
import styles from './style.module.styl';

function Text({ loading, children }: InfoTextProps) {
  return (
    <Skeleton loading={loading} paragraph={{ rows: 1 }} title={false} active>
      {children}
    </Skeleton>
  );
}

/** 账号信息头部:可上传头像 + Descriptions(用户名/实名/账号ID/手机号/注册时间)。 */
export default function InfoHeader() {
  const { t } = useTranslation();
  const userInfo = useUserStore((s) => s.user);
  const loading = !userInfo;
  const [avatar, setAvatar] = useState('');

  const avatarSrc = avatar || userInfo?.avatar;

  return (
    <div className="flex">
      <Upload
        showUploadList={false}
        beforeUpload={() => false}
        // 参数类型由 antd UploadProps 推导，不在本文件内写类型定义
        // / The argument type is inferred from antd's UploadProps; no local type definition here
        onChange={({ file }) => {
          setAvatar(file.originFileObj ? URL.createObjectURL(file.originFileObj) : '');
        }}
      >
        <Skeleton
          loading={loading}
          avatar={{ shape: 'circle', size: 100 }}
          title={false}
          paragraph={false}
          active
        >
          <Avatar size={100}>
            {avatarSrc ? <img src={avatarSrc} alt="avatar" /> : <PlusOutlined />}
          </Avatar>
        </Skeleton>
      </Upload>
      <Descriptions
        className={styles['info-content']}
        column={2}
        // antd v6：labelStyle 已废弃，改用 styles.label
        // / antd v6: labelStyle is deprecated; use styles.label instead
        styles={{ label: { textAlign: 'right' } }}
        items={[
          {
            key: 'name',
            label: t('userSetting.label.name'),
            children: <Text loading={loading}>{userInfo?.name}</Text>,
          },
          {
            key: 'verified',
            label: t('userSetting.label.verified'),
            children: (
              <Text loading={loading}>
                {userInfo?.verified ? (
                  <Tag color="green" className={styles['verified-tag']}>
                    {t('userSetting.value.verified')}
                  </Tag>
                ) : (
                  <Tag color="red" className={styles['verified-tag']}>
                    {t('userSetting.value.notVerified')}
                  </Tag>
                )}
                <Typography.Link role="button" className="ml-[12px]">
                  {t('userSetting.btn.edit')}
                </Typography.Link>
              </Text>
            ),
          },
          {
            key: 'accountId',
            label: t('userSetting.label.accountId'),
            children: <Text loading={loading}>{userInfo?.accountId}</Text>,
          },
          {
            key: 'phoneNumber',
            label: t('userSetting.label.phoneNumber'),
            children: (
              <Text loading={loading}>
                {userInfo?.phoneNumber}
                <Typography.Link role="button" className="ml-[12px]">
                  {t('userSetting.btn.edit')}
                </Typography.Link>
              </Text>
            ),
          },
          {
            key: 'registrationTime',
            label: t('userSetting.label.registrationTime'),
            children: <Text loading={loading}>{userInfo?.registrationTime}</Text>,
          },
        ]}
      />
    </div>
  );
}
