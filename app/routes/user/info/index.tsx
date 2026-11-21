import { Typography, Row, Col, Empty, Card } from '@douyinfe/semi-ui';
import { useTranslation } from 'react-i18next';
import UserInfoHeader from './UserInfoHeader';
import MyProject from './MyProject';
import MyTeam from './MyTeam';
import LatestNews from './LatestNews';

const { Title, Text } = Typography;

export default function UserInfo() {
  const { t } = useTranslation();

  return (
    <>
      <UserInfoHeader />
      <Row gutter={16}>
        <Col span={16}>
          <Card bordered={false} className="mt-[16px]">
            <div className="flex justify-between">
              <Title heading={5}>{t('userInfo.title.project')}</Title>
              <Text link>{t('userInfo.btn.more')}</Text>
            </div>
            <MyProject />
          </Card>
        </Col>
        <Col span={8}>
          <Card bordered={false} className="mt-[16px]">
            <div className="flex justify-between">
              <Title heading={5}>{t('userInfo.title.team')}</Title>
            </div>
            <MyTeam />
          </Card>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={16}>
          <Card bordered={false} className="mt-[16px]">
            <div className="flex justify-between">
              <Title heading={5}>{t('userInfo.title.news')}</Title>
              <Text link>{t('userInfo.btn.all')}</Text>
            </div>
            <LatestNews />
          </Card>
        </Col>
        <Col span={8}>
          <Card bordered={false} className="mt-[16px]">
            <div className="flex justify-between">
              <Title heading={5}>{t('userInfo.title.notice')}</Title>
            </div>
            {/* 空状态：保留原 subTitle 文案与类名 */}
            {/* / Empty state: keep the original subTitle text and className */}
            <Empty description={t('userInfo.notice.empty')} className="!pt-[60px] !pb-[130px]" />
          </Card>
        </Col>
      </Row>
    </>
  );
}
