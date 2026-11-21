import { useState } from 'react';
import { Avatar, Upload, Descriptions, Tag, Skeleton, Typography } from '@douyinfe/semi-ui';
import { IconPlus } from '@douyinfe/semi-icons';
import { useTranslation } from 'react-i18next';
import { useUserStore } from '~/store';
import type { InfoTextProps } from './types';
import styles from './style.module.styl';

function Text({ loading, children }: InfoTextProps) {
  return (
    <Skeleton loading={loading} active placeholder={<Skeleton.Paragraph rows={1} />}>
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
  // Semi Descriptions 没有 styles.label，改用每条 data 的 keyStyle 让 label 右对齐
  // / Semi Descriptions has no styles.label; use keyStyle on each data item to right-align labels
  const keyStyle = { textAlign: 'right' as const };

  return (
    <div className="flex">
      <Upload
        action=""
        showUploadList={false}
        beforeUpload={() => false}
        // 参数类型由 Semi UploadProps 的 onChange 推导，不在本文件内写类型定义
        // / The argument type is inferred from Semi's UploadProps onChange; no local type definition here
        onChange={({ currentFile }) => {
          setAvatar(currentFile.fileInstance ? URL.createObjectURL(currentFile.fileInstance) : '');
        }}
      >
        <Skeleton
          loading={loading}
          active
          placeholder={<Skeleton.Avatar shape="circle" size="extra-large" />}
        >
          <Avatar size="extra-large">
            {avatarSrc ? <img src={avatarSrc} alt="avatar" /> : <IconPlus />}
          </Avatar>
        </Skeleton>
      </Upload>
      <Descriptions
        className={styles['info-content']}
        column={2}
        data={[
          {
            key: t('userSetting.label.name'),
            keyStyle,
            value: <Text loading={loading}>{userInfo?.name}</Text>,
          },
          {
            key: t('userSetting.label.verified'),
            keyStyle,
            value: (
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
                <Typography.Text link role="button" className="ml-[12px]">
                  {t('userSetting.btn.edit')}
                </Typography.Text>
              </Text>
            ),
          },
          {
            key: t('userSetting.label.accountId'),
            keyStyle,
            value: <Text loading={loading}>{userInfo?.accountId}</Text>,
          },
          {
            key: t('userSetting.label.phoneNumber'),
            keyStyle,
            value: (
              <Text loading={loading}>
                {userInfo?.phoneNumber}
                <Typography.Text link role="button" className="ml-[12px]">
                  {t('userSetting.btn.edit')}
                </Typography.Text>
              </Text>
            ),
          },
          {
            key: t('userSetting.label.registrationTime'),
            keyStyle,
            value: <Text loading={loading}>{userInfo?.registrationTime}</Text>,
          },
        ]}
      />
    </div>
  );
}
