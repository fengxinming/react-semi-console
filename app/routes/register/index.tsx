import { App, Form, Input, Button, Card, Typography, Space } from 'antd';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import { useRegister } from '~/hooks/api/useAuth';
import type { LoginValues } from '~/api/types';

const { Title } = Typography;

export default function Register() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { mutateAsync: register, isPending: registering } = useRegister();
  const [form] = Form.useForm();
  const { message } = App.useApp();

  const onSubmit = async (values: LoginValues) => {
    try {
      // useRegister 内部已 setToken + 预取用户数据
      await register(values);
      message.success(t('login.success'));
      navigate('/dashboard/workplace');
    } catch {
      /* 注册失败，antd 已在字段下展示错误 */
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: 'var(--ant-color-bg-container)',
      }}
    >
      <Card style={{ width: 380 }}>
        <Title level={4} style={{ textAlign: 'center' }}>
          {t('login.toRegister')}
        </Title>
        <Form form={form} layout="vertical" onFinish={onSubmit} size="large">
          <Form.Item label={t('login.account')} name="account" rules={[{ required: true }]}>
            <Input placeholder="admin" />
          </Form.Item>
          <Form.Item label={t('login.password')} name="password" rules={[{ required: true }]}>
            <Input.Password placeholder="admin" />
          </Form.Item>
          <Form.Item>
            <Space style={{ width: '100%', justifyContent: 'space-between' }}>
              <Button type="text" onClick={() => navigate('/login')}>
                {t('login.submit')}
              </Button>
            </Space>
          </Form.Item>
          <Button type="primary" block htmlType="submit" loading={registering}>
            {t('login.toRegister')}
          </Button>
        </Form>
      </Card>
    </div>
  );
}
