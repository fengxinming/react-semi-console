import { Alert, App, Button, Divider, Drawer, InputNumber, Radio, Space, Switch } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
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
  const { message } = App.useApp();
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
    message.success(t('settings.copySettings.message'));
  };

  return (
    <Drawer
      // antd v6 起 width 已废弃，改用 size（size 支持数值宽度）/ antd v6 deprecates `width`, use `size` (accepts a number)
      size={300}
      title={
        <span className="flex items-center gap-[8px]">
          <SettingOutlined />
          {t('settings.title')}
        </span>
      }
      open={visible}
      onClose={onClose}
      // 原 Arco Drawer 用 okText/cancelText/onOk 把按钮渲染在 **底部 footer**，
      // 迁移时曾误放进 header 的 extra（跑到顶部且挤得标题折行）。
      // 这里改用 antd Drawer 的 footer，恢复按钮在底部右侧、与参考站一致。
      // / Arco's okText/cancelText/onOk rendered these buttons in the **bottom footer**; the
      // migration wrongly moved them into the header `extra` (top, squeezing the title into two
      // lines). Use antd's `footer` to restore the bottom-right placement, matching the reference.
      footer={
        <Space>
          <Button onClick={onClose}>{t('settings.close')}</Button>
          <Button type="primary" onClick={copyConfig}>
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
          <Radio.Group
            optionType="button"
            buttonStyle="solid"
            size="small"
            value={navMode}
            onChange={(e) => setSettings({ navMode: e.target.value as NavMode })}
          >
            <Radio.Button value="inline">{t('settings.navMode.inline')}</Radio.Button>
            <Radio.Button value="horizontal">{t('settings.navMode.horizontal')}</Radio.Button>
          </Radio.Group>
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
            onChange={(v) => v != null && setSettings({ menuWidth: Number(v) })}
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

      <Alert showIcon type="info" title={t('settings.alertContent')} className="mt-[8px]" />
    </Drawer>
  );
}
