import { useState } from 'react';
import { Card, Tabs, TabPane } from '@douyinfe/semi-ui';
import { useTranslation } from 'react-i18next';
import InfoHeader from './InfoHeader';
import InfoForm from './InfoForm';
import Security from './Security';
import Verified from './Verified';

/** 用户设置:头部账号信息 + 圆角 Tabs(基本信息/安全设置/实名认证)。 */
export default function UserSetting() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('basic');

  return (
    <div>
      <Card bordered={false} className="px-[20px] py-[14px]">
        <InfoHeader />
      </Card>
      <Card bordered={false} className="mt-[16px]">
        {/* Semi Tabs 没有 items，用 tabList + TabPane children */}
        {/* / Semi Tabs has no `items`; use tabList plus TabPane children */}
        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          tabList={[
            { itemKey: 'basic', tab: t('userSetting.title.basicInfo') },
            { itemKey: 'security', tab: t('userSetting.title.security') },
            { itemKey: 'verified', tab: t('userSetting.label.verified') },
          ]}
        >
          <TabPane itemKey="basic">
            <InfoForm />
          </TabPane>
          <TabPane itemKey="security">
            <Security />
          </TabPane>
          <TabPane itemKey="verified">
            <Verified />
          </TabPane>
        </Tabs>
      </Card>
    </div>
  );
}
