import { Card, Typography, Avatar, Space, Row, Col } from 'antd';
import { MoreOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useUserStore } from '~/store';
import styles from './style.module.styl';

export default function Studio() {
  const { t } = useTranslation();
  const userInfo = useUserStore((s) => s.user);

  return (
    <Card variant="borderless">
      <Row>
        <Col span={16}>
          <Typography.Title level={5}>{t('monitor.title.studioPreview')}</Typography.Title>
        </Col>
        <Col span={8} className="text-right">
          <MoreOutlined />
        </Col>
      </Row>
      <div>
        <img
          src="http://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/c788fc704d32cf3b1136c7d45afc2669.png~tplv-uwbnlip3yd-webp.webp"
          className={styles['studio-preview']}
          alt="studio preview"
        />
        <div className="flex justify-between mt-[16px]">
          {userInfo && (
            <div>
              <Space size={12}>
                <Avatar size={24}>
                  {userInfo.avatar ? (
                    <img src={userInfo.avatar} alt="avatar" />
                  ) : (
                    (userInfo.name?.[0] ?? 'A')
                  )}
                </Avatar>
                <Typography.Text>
                  {userInfo.name}
                  {t('monitor.studioPreview.studio')}
                </Typography.Text>
              </Space>
            </div>
          )}
          <Typography.Text type="secondary">
            3,6000 {t('monitor.studioPreview.watching')}
          </Typography.Text>
        </div>
      </div>
    </Card>
  );
}
