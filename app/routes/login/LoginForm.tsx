import { useRef, useState, useCallback } from 'react';
import { App, Form, Input, Typography, Button, Space } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { useLogin } from '~/hooks/api/useAuth';
import styles from './style.module.styl';
import type { LoginValues } from '~/api/types';

/** 登录表单：账号/密码（必填校验）+ 登录/注册。移植自参考 arco-design-pro。 */
export default function LoginForm() {
  const [form] = Form.useForm<LoginValues>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { mutateAsync: login } = useLogin();
  const { message } = App.useApp();

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
        values = await form.validateFields();
      } catch {
        // 校验不通过，antd 已在字段下展示错误
        return;
      }
      // useLogin 内部已 setToken + 预取用户数据
      await login(values);
      message.success(t('login.success'));
      navigate('/dashboard/workplace');
    } catch (err) {
      form.setFields([
        {
          name: 'account',
          errors: [err instanceof Error ? err.message : t('login.form.login.errMsg')],
        },
      ]);
    } finally {
      lockedRef.current = false;
      setLogging(false);
    }
  }, [form, login, navigate, t, message]);

  return (
    <div className={styles['login-form-wrapper']}>
      <div className={styles['login-form-title']}>{t('login.form.title')}</div>
      <div className={styles['login-form-sub-title']}>{t('login.form.subTitle')}</div>
      <Form
        className="!mt-[32px]"
        form={form}
        layout="vertical"
        initialValues={{ account: 'admin', password: 'admin' }}
      >
        <Form.Item
          name="account"
          rules={[{ required: true, message: t('login.form.userName.errMsg') }]}
        >
          {/* variant="filled"：灰底无边框输入框，对齐 arco-design-pro 登录页视觉 / Filled variant: borderless grey input to match arco-design-pro login page */}
          <Input
            variant="filled"
            prefix={<UserOutlined />}
            placeholder={t('login.form.userName.placeholder')}
            onPressEnter={onSubmitClick}
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: t('login.form.password.errMsg') }]}
        >
          <Input.Password
            variant="filled"
            prefix={<LockOutlined />}
            placeholder={t('login.form.password.placeholder')}
            onPressEnter={onSubmitClick}
          />
        </Form.Item>
        <Space size={16} orientation="vertical" className="w-full">
          {/* 「记住密码」已移除：模板页的占位功能，且明文记住密码本身不安全。
              这一行现在只剩「忘记密码」，右对齐以维持原来的视觉节奏。
              / "Remember password" was removed: it was a template placeholder, and remembering a
              password in plaintext is insecure anyway. This row now holds only the "forgot
              password" link, right-aligned to keep the original visual rhythm. */}
          <div className="flex items-center justify-end">
            <Typography.Link>{t('login.form.forgetPassword')}</Typography.Link>
          </div>
          <Button type="primary" block onClick={onSubmitClick} loading={logging}>
            {t('login.form.login')}
          </Button>
          <Button type="text" block className={styles['login-form-register-btn']}>
            {t('login.form.register')}
          </Button>
        </Space>
      </Form>
    </div>
  );
}
