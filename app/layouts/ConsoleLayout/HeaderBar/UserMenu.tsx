import { useNavigate } from 'react-router';
import { App, Avatar, Dropdown } from 'antd';
import {
  MoreOutlined,
  PoweroffOutlined,
  SettingOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useUserStore } from '~/store';
import { useSwitchRole } from '~/hooks/api/useUser';
import styles from './style.module.styl';
import type { MenuProps } from 'antd';

export default function UserMenu() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const user = useUserStore((s) => s.user);
  const { mutateAsync: switchRole } = useSwitchRole();
  const logout = useUserStore((s) => s.logout);
  const { message } = App.useApp();

  const handleClick: MenuProps['onClick'] = async ({ key }) => {
    if (key === 'logout') {
      logout();
      navigate('/login');
    } else if (key === 'info') {
      navigate('/user/info');
    } else if (key === 'setting') {
      navigate('/user/setting');
    } else if (key === 'role-admin') {
      await switchRole('admin');
      message.info(t('user.role.tip'));
    } else if (key === 'role-user') {
      await switchRole('user');
      message.info(t('user.role.tip'));
    } else {
      navigate(key);
    }
  };

  const items: MenuProps['items'] = [
    {
      key: 'info',
      icon: <UserOutlined className={styles['dropdown-icon']} />,
      label: t('menu.user.info'),
    },
    {
      key: 'setting',
      icon: <SettingOutlined className={styles['dropdown-icon']} />,
      label: t('menu.user.setting'),
    },
    {
      key: 'role',
      icon: <UserOutlined className={styles['dropdown-icon']} />,
      label: t('user.role'),
      children: [
        { key: 'role-admin', label: t('user.role.admin') },
        { key: 'role-user', label: t('user.role.user') },
      ],
    },
    {
      key: 'more',
      icon: <MoreOutlined className={styles['dropdown-icon']} />,
      label: t('user.more'),
      children: [
        { key: '/dashboard/workplace', label: t('menu.dashboard.workplace') },
        { key: '/list/card', label: t('menu.list.cardList') },
      ],
    },
    { type: 'divider' },
    {
      key: 'logout',
      icon: <PoweroffOutlined className={styles['dropdown-icon']} />,
      label: t('common.logout'),
    },
  ];

  return (
    <Dropdown menu={{ items, onClick: handleClick }} placement="bottomRight">
      <Avatar size={32} className="cursor-pointer">
        {user?.name?.[0] ?? 'A'}
      </Avatar>
    </Dropdown>
  );
}
