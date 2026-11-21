import { ColorPicker, Typography } from '@douyinfe/semi-ui';
import { generate } from '@ant-design/colors';
import { useTranslation } from 'react-i18next';
import { useSettingsStore } from '~/store';
import styles from './style.module.styl';

export default function ColorPanel() {
  const { t } = useTranslation();
  const themeColor = useSettingsStore((s) => s.themeColor);
  const theme = useSettingsStore((s) => s.theme);
  const setSettings = useSettingsStore((s) => s.setSettings);

  const list = generate(themeColor, { theme: theme === 'dark' ? 'dark' : 'default' });

  // 只改状态，CSS 变量由 AdminLayout 统一应用（themeColor / darkMode 变化时同步），
  // 这样抽屉关闭或页面刷新后主题色依然生效，而不是像参考那样"仅临时生效"。
  const applyColor = (color: string) => {
    setSettings({ themeColor: color });
  };

  return (
    <div>
      <ColorPicker
        usePopover
        popoverProps={{ trigger: 'hover', position: 'bottomLeft' }}
        value={ColorPicker.colorStringToValue(themeColor)}
        onChange={(value) => applyColor(value.hex)}
      >
        <div className={styles['color-box']}>
          <div className="w-[100px] h-[24px] mr-[10px]" style={{ backgroundColor: themeColor }} />
          <span>{themeColor}</span>
        </div>
      </ColorPicker>
      <ul className="flex my-[16px]">
        {list.map((item) => (
          <li key={item} className="flex-1 h-[26px]" style={{ backgroundColor: item }} />
        ))}
      </ul>
      <Typography.Paragraph className="text-[12px]">
        {t('settings.color.tooltip')}
      </Typography.Paragraph>
    </div>
  );
}
