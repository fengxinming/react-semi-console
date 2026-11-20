import { Typography, Row, Col, Result, Card } from 'antd';
import { useTranslation } from 'react-i18next';
import UserInfoHeader from './UserInfoHeader';
import MyProject from './MyProject';
import MyTeam from './MyTeam';
import LatestNews from './LatestNews';

const { Title } = Typography;

export default function UserInfo() {
  const { t } = useTranslation();

  return (
    <>
      <UserInfoHeader />
      <Row gutter={16}>
        <Col span={16}>
          <Card variant="borderless" className="mt-[16px]">
            <div className="flex justify-between">
              <Title level={5}>{t('userInfo.title.project')}</Title>
              <Typography.Link>{t('userInfo.btn.more')}</Typography.Link>
            </div>
            <MyProject />
          </Card>
        </Col>
        <Col span={8}>
          <Card variant="borderless" className="mt-[16px]">
            <div className="flex justify-between">
              <Title level={5}>{t('userInfo.title.team')}</Title>
            </div>
            <MyTeam />
          </Card>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={16}>
          <Card variant="borderless" className="mt-[16px]">
            <div className="flex justify-between">
              <Title level={5}>{t('userInfo.title.news')}</Title>
              <Typography.Link>{t('userInfo.btn.all')}</Typography.Link>
            </div>
            <LatestNews />
          </Card>
        </Col>
        <Col span={8}>
          <Card variant="borderless" className="mt-[16px]">
            <div className="flex justify-between">
              <Title level={5}>{t('userInfo.title.notice')}</Title>
            </div>
            <Result
              status="404"
              subTitle={t('userInfo.notice.empty')}
              className="!pt-[60px] !pb-[130px]"
            />
          </Card>
        </Col>
      </Row>
    </>
  );
}
