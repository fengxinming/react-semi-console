import { useNavigate } from 'react-router';
import { Avatar, Dropdown, Toast } from '@douyinfe/semi-ui';
import { IconMore, IconQuit, IconSetting, IconUser } from '@douyinfe/semi-icons';
import { useTranslation } from 'react-i18next';
import { useUserStore } from '~/store';
import { useSwitchRole } from '~/hooks/api/useUser';
import styles from './style.module.styl';

export default function UserMenu() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const user = useUserStore((s) => s.user);
  const { mutateAsync: switchRole } = useSwitchRole();
  const logout = useUserStore((s) => s.logout);

  const handleClick = async (key: string) => {
    if (key === 'logout') {
      logout();
      navigate('/login');
    } else if (key === 'info') {
      navigate('/user/info');
    } else if (key === 'setting') {
      navigate('/user/setting');
    } else if (key === 'role-admin') {
      await switchRole('admin');
      Toast.info({ content: t('user.role.tip') });
    } else if (key === 'role-user') {
      await switchRole('user');
      Toast.info({ content: t('user.role.tip') });
    } else {
      navigate(key);
    }
  };

  return (
    <Dropdown
      position="bottomRight"
      render={
        <Dropdown.Menu>
          <Dropdown.Item
            icon={<IconUser className={styles['dropdown-icon']} />}
            onClick={() => void handleClick('info')}
          >
            {t('menu.user.info')}
          </Dropdown.Item>
          <Dropdown.Item
            icon={<IconSetting className={styles['dropdown-icon']} />}
            onClick={() => void handleClick('setting')}
          >
            {t('menu.user.setting')}
          </Dropdown.Item>
          <Dropdown
            position="rightTop"
            render={
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => void handleClick('role-admin')}>
                  {t('user.role.admin')}
                </Dropdown.Item>
                <Dropdown.Item onClick={() => void handleClick('role-user')}>
                  {t('user.role.user')}
                </Dropdown.Item>
              </Dropdown.Menu>
            }
          >
            <Dropdown.Item icon={<IconUser className={styles['dropdown-icon']} />}>
              {t('user.role')}
            </Dropdown.Item>
          </Dropdown>
          <Dropdown
            position="rightTop"
            render={
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => void handleClick('/dashboard/workplace')}>
                  {t('menu.dashboard.workplace')}
                </Dropdown.Item>
                <Dropdown.Item onClick={() => void handleClick('/list/card')}>
                  {t('menu.list.cardList')}
                </Dropdown.Item>
              </Dropdown.Menu>
            }
          >
            <Dropdown.Item icon={<IconMore className={styles['dropdown-icon']} />}>
              {t('user.more')}
            </Dropdown.Item>
          </Dropdown>
          <Dropdown.Divider />
          <Dropdown.Item
            icon={<IconQuit className={styles['dropdown-icon']} />}
            onClick={() => void handleClick('logout')}
          >
            {t('common.logout')}
          </Dropdown.Item>
        </Dropdown.Menu>
      }
    >
      <Avatar className="cursor-pointer">{user?.name?.[0] ?? 'A'}</Avatar>
    </Dropdown>
  );
}
