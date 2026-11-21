import { Form, Button, Card, Typography, Space, Toast } from '@douyinfe/semi-ui';
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

  const onSubmit = async (values: LoginValues) => {
    try {
      // useRegister 内部已 setToken + 预取用户数据
      await register(values);
      Toast.success(t('login.success'));
      navigate('/dashboard/workplace');
    } catch {
      /* 注册失败，Semi 已在字段下展示错误 */
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: 'var(--semi-color-bg-0)',
      }}
    >
      <Card style={{ width: 380 }}>
        <Title heading={4} style={{ textAlign: 'center' }}>
          {t('login.toRegister')}
        </Title>
        <Form form={form} layout="vertical" onSubmit={onSubmit}>
          <Form.Input
            field="account"
            label={t('login.account')}
            rules={[{ required: true }]}
            placeholder="admin"
          />
          <Form.Input
            field="password"
            mode="password"
            label={t('login.password')}
            rules={[{ required: true }]}
            placeholder="admin"
          />
          <Space style={{ width: '100%', justifyContent: 'space-between' }}>
            <Button theme="borderless" type="tertiary" onClick={() => navigate('/login')}>
              {t('login.submit')}
            </Button>
          </Space>
          <Button type="primary" theme="solid" block htmlType="submit" loading={registering}>
            {t('login.toRegister')}
          </Button>
        </Form>
      </Card>
    </div>
  );
}
