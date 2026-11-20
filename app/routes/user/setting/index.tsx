import { useState } from 'react';
import { Card, Tabs } from 'antd';
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
      <Card variant="borderless" className="px-[20px] py-[14px]">
        <InfoHeader />
      </Card>
      <Card variant="borderless" className="mt-[16px]">
        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          items={[
            { key: 'basic', label: t('userSetting.title.basicInfo'), children: <InfoForm /> },
            { key: 'security', label: t('userSetting.title.security'), children: <Security /> },
            { key: 'verified', label: t('userSetting.label.verified'), children: <Verified /> },
          ]}
        />
      </Card>
    </div>
  );
}
