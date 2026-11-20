import { useState } from 'react';
import { App, Typography, Card, Form, Select, Input, Row, Col, Space, Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { submitGroupForm } from '~/api/form';
import styles from './style.module.styl';

const { Title } = Typography;

export default function GroupForm() {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { message } = App.useApp();

  const submit = (values: Record<string, unknown>) => {
    setLoading(true);
    submitGroupForm(values)
      .then(() => {
        message.success(t('groupForm.submitSuccess'));
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      submit(values as Record<string, unknown>);
    });
  };

  const handleReset = () => {
    form.resetFields();
  };

  return (
    <div className={styles.container}>
      <Form layout="vertical" form={form} className={styles['form-group']}>
        <Card variant="borderless">
          <Title level={5}>{t('groupForm.title.video')}</Title>
          <Row gutter={80}>
            <Col span={8}>
              <Form.Item
                label={t('groupForm.form.label.video.mode')}
                name="video.mode"
                initialValue={'custom'}
              >
                <Select
                  placeholder={t('groupForm.placeholder.video.mode')}
                  // antd v6 废弃了 Select.Option 子组件，改用 options 属性
                  // / antd v6 deprecates Select.Option; use the options prop
                  options={[
                    { value: 'custom', label: '自定义' },
                    { value: 'mode1', label: '模式1' },
                    { value: 'mode2', label: '模式2' },
                  ]}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label={t('groupForm.form.label.video.acquisition.resolution')}
                name="video.acquisition.resolution"
              >
                <Select
                  placeholder={t('groupForm.placeholder.video.acquisition.resolution')}
                  options={[
                    { value: 'resolution1', label: '分辨率1' },
                    { value: 'resolution2', label: '分辨率2' },
                    { value: 'resolution3', label: '分辨率3' },
                  ]}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              {/* antd v6：Input 的 addonAfter 已废弃，后缀改用 Space.Compact + Space.Addon 组合。
                  表单绑定必须落在 Input 上，所以 name 移到内层 noStyle 的 Form.Item，
                  它的校验错误会自动冒泡到外层 Form.Item 显示（见 form/FormItem 的 notifyParentMetaChange）。
                  / antd v6: Input's addonAfter is deprecated; compose the suffix with Space.Compact +
                  Space.Addon. The binding must stay on the Input, so `name` moves to the inner noStyle
                  Form.Item, whose errors bubble up to the outer item (see FormItem's
                  notifyParentMetaChange). */}
              <Form.Item label={t('groupForm.form.label.video.acquisition.frameRate')}>
                <Space.Compact block>
                  <Form.Item name="video.acquisition.frameRate" noStyle>
                    <Input placeholder={t('groupForm.placeholder.video.acquisition.frameRate')} />
                  </Form.Item>
                  <Space.Addon>fps</Space.Addon>
                </Space.Compact>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={80}>
            <Col span={8}>
              <Form.Item
                label={t('groupForm.form.label.video.encoding.resolution')}
                name="video.encoding.resolution"
              >
                <Select
                  placeholder={t('groupForm.placeholder.video.encoding.resolution')}
                  options={[
                    { value: 'resolution1', label: '分辨率1' },
                    { value: 'resolution2', label: '分辨率2' },
                    { value: 'resolution3', label: '分辨率3' },
                  ]}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label={t('groupForm.form.label.video.encoding.rate.min')}>
                <Space.Compact block>
                  <Form.Item name="video.encoding.rate.min" noStyle>
                    <Input placeholder={t('groupForm.placeholder.video.encoding.rate.min')} />
                  </Form.Item>
                  <Space.Addon>bps</Space.Addon>
                </Space.Compact>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label={t('groupForm.form.label.video.encoding.rate.max')}>
                <Space.Compact block>
                  <Form.Item name="video.encoding.rate.max" noStyle>
                    <Input placeholder={t('groupForm.placeholder.video.encoding.rate.max')} />
                  </Form.Item>
                  <Space.Addon>bps</Space.Addon>
                </Space.Compact>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={80}>
            <Col span={8}>
              <Form.Item label={t('groupForm.form.label.video.encoding.rate.default')}>
                <Space.Compact block>
                  <Form.Item name="video.encoding.rate.default" noStyle>
                    <Input placeholder={t('groupForm.placeholder.video.encoding.rate.default')} />
                  </Form.Item>
                  <Space.Addon>bps</Space.Addon>
                </Space.Compact>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label={t('groupForm.form.label.video.encoding.frameRate')}>
                <Space.Compact block>
                  <Form.Item name="video.encoding.frameRate" noStyle>
                    <Input placeholder={t('groupForm.placeholder.video.encoding.frameRate')} />
                  </Form.Item>
                  <Space.Addon>fps</Space.Addon>
                </Space.Compact>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label={t('groupForm.form.label.video.encoding.profile')}>
                <Space.Compact block>
                  <Form.Item name="video.encoding.profile" noStyle>
                    <Input placeholder={t('groupForm.placeholder.video.encoding.profile')} />
                  </Form.Item>
                  <Space.Addon>bps</Space.Addon>
                </Space.Compact>
              </Form.Item>
            </Col>
          </Row>
        </Card>
        <Card variant="borderless">
          <Title level={5}>{t('groupForm.title.audio')}</Title>
          <Row gutter={80}>
            <Col span={8}>
              <Form.Item
                label={t('groupForm.form.label.audio.mode')}
                initialValue={'custom'}
                name="audio.mode"
              >
                <Select
                  placeholder={t('groupForm.placeholder.audio.mode')}
                  options={[
                    { value: 'custom', label: '自定义' },
                    { value: 'mode1', label: '模式1' },
                    { value: 'mode2', label: '模式2' },
                  ]}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label={t('groupForm.form.label.audio.acquisition.channels')}
                name="audio.acquisition.channels"
              >
                <Select
                  placeholder={t('groupForm.placeholder.audio.acquisition.channels')}
                  options={[
                    { value: '1', label: '1' },
                    { value: '2', label: '2' },
                    { value: '3', label: '3' },
                  ]}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label={t('groupForm.form.label.audio.encoding.rate')}>
                <Space.Compact block>
                  <Form.Item name="audio.encoding.rate" noStyle>
                    <Input placeholder={t('groupForm.placeholder.audio.encoding.rate')} />
                  </Form.Item>
                  <Space.Addon>bps</Space.Addon>
                </Space.Compact>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={80}>
            <Col span={8}>
              <Form.Item label={t('groupForm.form.label.audio.encoding.profile')}>
                <Space.Compact block>
                  <Form.Item name="audio.encoding.profile" noStyle>
                    <Input placeholder={t('groupForm.placeholder.audio.encoding.profile')} />
                  </Form.Item>
                  <Space.Addon>fps</Space.Addon>
                </Space.Compact>
              </Form.Item>
            </Col>
          </Row>
        </Card>
        <Card variant="borderless" className="!mb-[32px]">
          <Title level={5}>{t('groupForm.title.explanation')}</Title>
          <Form.Item label={t('groupForm.form.label.explanation')} name="audio.explanation">
            <Input.TextArea placeholder={t('groupForm.placeholder.explanation')} />
          </Form.Item>
        </Card>
      </Form>
      <div className={styles.actions}>
        <Space>
          <Button onClick={handleReset} size="large">
            {t('groupForm.reset')}
          </Button>
          <Button type="primary" onClick={handleSubmit} loading={loading} size="large">
            {t('groupForm.submit')}
          </Button>
        </Space>
      </div>
    </div>
  );
}
