import {
  Banner,
  Button,
  Divider,
  InputNumber,
  Radio,
  RadioGroup,
  SideSheet,
  Space,
  Switch,
  Toast,
} from '@douyinfe/semi-ui';
import { IconSetting } from '@douyinfe/semi-icons';
import { useTranslation } from 'react-i18next';
import type { NavMode } from '~/store/types';
import { useSettingsStore } from '~/store';
import ColorPanel from './ColorPanel';
import type { SettingDrawerProps, SettingRowProps } from './types';

function Row({ label, children }: SettingRowProps) {
  return (
    <div className="flex items-center justify-between py-[8px]">
      <span className="text-[14px]">{label}</span>
      <span>{children}</span>
    </div>
  );
}

export default function SettingDrawer({ visible, onClose }: SettingDrawerProps) {
  const { t } = useTranslation();
  const navbar = useSettingsStore((s) => s.navbar);
  const menu = useSettingsStore((s) => s.menu);
  const footer = useSettingsStore((s) => s.footer);
  const menuWidth = useSettingsStore((s) => s.menuWidth);
  const colorWeak = useSettingsStore((s) => s.colorWeak);
  const navMode = useSettingsStore((s) => s.navMode);
  const setSettings = useSettingsStore((s) => s.setSettings);

  // 对齐参考：导出与 settings.json 结构完全一致的配置（6 个字段、同 key 顺序），
  // 用户可直接粘回 app/settings.json，让配置真正作用于项目。
  const copyConfig = () => {
    const { colorWeak, navbar, menu, footer, themeColor, menuWidth, navMode } =
      useSettingsStore.getState();
    const config = {
      colorWeak,
      navbar,
      menu,
      footer,
      themeColor,
      menuWidth,
      navMode,
    };
    void navigator.clipboard?.writeText(JSON.stringify(config, null, 2));
    Toast.success({ content: t('settings.copySettings.message') });
  };

  return (
    <SideSheet
      // Semi SideSheet 的 width 同名，直接传数值宽度 / SideSheet keeps `width` (accepts a number)
      width={300}
      title={
        <span className="flex items-center gap-[8px]">
          <IconSetting />
          {t('settings.title')}
        </span>
      }
      visible={visible}
      onCancel={onClose}
      // 设置抽屉的操作按钮放在 **底部 footer**；
      // 避免放进 header 的 extra（会跑到顶部并挤得标题折行）。
      // / Place the drawer actions in the **bottom footer**;
      // avoid the header `extra` slot, which would put them on top and squeeze the title.
      footer={
        <Space>
          <Button type="secondary" onClick={onClose}>
            {t('settings.close')}
          </Button>
          <Button type="primary" theme="solid" onClick={copyConfig}>
            {t('settings.copySettings')}
          </Button>
        </Space>
      }
    >
      <div className="mb-[16px]">
        <label className="text-[14px] font-medium mb-[8px]">{t('settings.themeColor')}</label>
        <ColorPanel />
        <Divider />
      </div>

      <div className="mb-[16px]">
        <label className="text-[14px] font-medium mb-[8px]">{t('settings.content')}</label>
        <Row label={t('settings.navMode')}>
          <RadioGroup
            type="button"
            buttonSize="small"
            value={navMode}
            onChange={(e) => setSettings({ navMode: e.target.value as NavMode })}
          >
            <Radio value="inline">{t('settings.navMode.inline')}</Radio>
            <Radio value="horizontal">{t('settings.navMode.horizontal')}</Radio>
          </RadioGroup>
        </Row>
        <Row label={t('settings.navbar')}>
          <Switch size="small" checked={navbar} onChange={(v) => setSettings({ navbar: v })} />
        </Row>
        <Row label={t('settings.menu')}>
          <Switch size="small" checked={menu} onChange={(v) => setSettings({ menu: v })} />
        </Row>
        <Row label={t('settings.footer')}>
          <Switch size="small" checked={footer} onChange={(v) => setSettings({ footer: v })} />
        </Row>
        <Row label={t('settings.menuWidth')}>
          <InputNumber
            className="!w-[80px]"
            size="small"
            value={menuWidth}
            onChange={(v) => v !== '' && v != null && setSettings({ menuWidth: Number(v) })}
          />
        </Row>
        <Divider />
      </div>

      <div className="mb-[16px]">
        <label className="text-[14px] font-medium mb-[8px]">{t('settings.otherSettings')}</label>
        <Row label={t('settings.colorWeak')}>
          <Switch
            size="small"
            checked={colorWeak}
            onChange={(v) => setSettings({ colorWeak: v })}
          />
        </Row>
        <Divider />
      </div>

      <Banner type="info" description={t('settings.alertContent')} className="mt-[8px]" />
    </SideSheet>
  );
}
