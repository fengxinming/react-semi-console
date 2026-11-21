import { useRef, useState, useCallback } from 'react';
import { Form, Typography, Button, Space, Toast } from '@douyinfe/semi-ui';
import { IconLock, IconUser } from '@douyinfe/semi-icons';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { useLogin } from '~/hooks/api/useAuth';
import styles from './style.module.styl';
import type { LoginValues } from '~/api/types';

/** 登录表单：账号/密码（必填校验）+ 登录/注册。 */
export default function LoginForm() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { mutateAsync: login } = useLogin();

  // 防重复提交状态：由下方 onSubmitClick 提交锁函数控制，而非依赖 react-query 的 isPending
  const [logging, setLogging] = useState(false);
  const lockedRef = useRef(false);

  const onSubmitClick = useCallback(async () => {
    // 防重复提交：执行中再次点击直接忽略
    if (lockedRef.current) {
      return;
    }
    lockedRef.current = true;
    setLogging(true);
    try {
      let values: LoginValues;
      try {
        values = await form.validate();
      } catch {
        // 校验不通过，Semi 已在字段下展示错误
        return;
      }
      // useLogin 内部已 setToken + 预取用户数据
      await login(values);
      Toast.success(t('login.success'));
      navigate('/dashboard/workplace');
    } catch (err) {
      form.setError('account', err instanceof Error ? err.message : t('login.form.login.errMsg'));
    } finally {
      lockedRef.current = false;
      setLogging(false);
    }
  }, [form, login, navigate, t]);

  return (
    <div className={styles['login-form-wrapper']}>
      <div className={styles['login-form-title']}>{t('login.form.title')}</div>
      <div className={styles['login-form-sub-title']}>{t('login.form.subTitle')}</div>
      <Form
        className="!mt-[32px]"
        form={form}
        layout="vertical"
        initValues={{ account: 'admin', password: 'admin' }}
      >
        <Form.Input
          field="account"
          rules={[{ required: true, message: t('login.form.userName.errMsg') }]}
          prefix={<IconUser />}
          placeholder={t('login.form.userName.placeholder')}
          onEnterPress={onSubmitClick}
        />
        <Form.Input
          field="password"
          mode="password"
          rules={[{ required: true, message: t('login.form.password.errMsg') }]}
          prefix={<IconLock />}
          placeholder={t('login.form.password.placeholder')}
          onEnterPress={onSubmitClick}
        />
        <Space spacing={16} vertical className="w-full" style={{ alignItems: 'stretch' }}>
          {/* 「记住密码」已移除：模板页的占位功能，且明文记住密码本身不安全。
              这一行现在只剩「忘记密码」，右对齐以维持原来的视觉节奏。
              / "Remember password" was removed: it was a template placeholder, and remembering a
              password in plaintext is insecure anyway. This row now holds only the "forgot
              password" link, right-aligned to keep the original visual rhythm. */}
          <div className="flex items-center justify-end">
            <Typography.Text link>{t('login.form.forgetPassword')}</Typography.Text>
          </div>
          <Button type="primary" theme="solid" block onClick={onSubmitClick} loading={logging}>
            {t('login.form.login')}
          </Button>
          <Button theme="borderless" type="tertiary" block className={styles['login-form-register-btn']}>
            {t('login.form.register')}
          </Button>
        </Space>
      </Form>
    </div>
  );
}
