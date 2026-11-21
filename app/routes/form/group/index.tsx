import { useState } from 'react';
import { Typography, Card, Form, Row, Col, Space, Button, Toast } from '@douyinfe/semi-ui';
import { useTranslation } from 'react-i18next';
import { submitGroupForm } from '~/api/form';
import styles from './style.module.styl';

const { Title } = Typography;

export default function GroupForm() {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const submit = (values: Record<string, unknown>) => {
    setLoading(true);
    submitGroupForm(values)
      .then(() => {
        Toast.success(t('groupForm.submitSuccess'));
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleSubmit = () => {
    form.validate().then((values) => {
      submit(values as Record<string, unknown>);
    });
  };

  const handleReset = () => {
    form.reset();
  };

  return (
    <div className={styles.container}>
      <Form layout="vertical" form={form} className={styles['form-group']}>
        <Card bordered={false}>
          <Title heading={5}>{t('groupForm.title.video')}</Title>
          <Row gutter={80}>
            <Col span={8}>
              <Form.Select
                label={t('groupForm.form.label.video.mode')}
                field="video.mode"
                initValue={'custom'}
                placeholder={t('groupForm.placeholder.video.mode')}
                optionList={[
                  { value: 'custom', label: '自定义' },
                  { value: 'mode1', label: '模式1' },
                  { value: 'mode2', label: '模式2' },
                ]}
              />
            </Col>
            <Col span={8}>
              <Form.Select
                label={t('groupForm.form.label.video.acquisition.resolution')}
                field="video.acquisition.resolution"
                placeholder={t('groupForm.placeholder.video.acquisition.resolution')}
                optionList={[
                  { value: 'resolution1', label: '分辨率1' },
                  { value: 'resolution2', label: '分辨率2' },
                  { value: 'resolution3', label: '分辨率3' },
                ]}
              />
            </Col>
            <Col span={8}>
              {/* 单位后缀用 Semi Input 的 addonAfter 拼在输入框右侧。
                  / The unit suffix is rendered via Semi Input's addonAfter. */}
              <Form.Input
                label={t('groupForm.form.label.video.acquisition.frameRate')}
                field="video.acquisition.frameRate"
                placeholder={t('groupForm.placeholder.video.acquisition.frameRate')}
                addonAfter="fps"
              />
            </Col>
          </Row>
          <Row gutter={80}>
            <Col span={8}>
              <Form.Select
                label={t('groupForm.form.label.video.encoding.resolution')}
                field="video.encoding.resolution"
                placeholder={t('groupForm.placeholder.video.encoding.resolution')}
                optionList={[
                  { value: 'resolution1', label: '分辨率1' },
                  { value: 'resolution2', label: '分辨率2' },
                  { value: 'resolution3', label: '分辨率3' },
                ]}
              />
            </Col>
            <Col span={8}>
              <Form.Input
                label={t('groupForm.form.label.video.encoding.rate.min')}
                field="video.encoding.rate.min"
                placeholder={t('groupForm.placeholder.video.encoding.rate.min')}
                addonAfter="bps"
              />
            </Col>
            <Col span={8}>
              <Form.Input
                label={t('groupForm.form.label.video.encoding.rate.max')}
                field="video.encoding.rate.max"
                placeholder={t('groupForm.placeholder.video.encoding.rate.max')}
                addonAfter="bps"
              />
            </Col>
          </Row>
          <Row gutter={80}>
            <Col span={8}>
              <Form.Input
                label={t('groupForm.form.label.video.encoding.rate.default')}
                field="video.encoding.rate.default"
                placeholder={t('groupForm.placeholder.video.encoding.rate.default')}
                addonAfter="fps"
              />
            </Col>
            <Col span={8}>
              <Form.Input
                label={t('groupForm.form.label.video.encoding.frameRate')}
                field="video.encoding.frameRate"
                placeholder={t('groupForm.placeholder.video.encoding.frameRate')}
                addonAfter="fps"
              />
            </Col>
            <Col span={8}>
              <Form.Input
                label={t('groupForm.form.label.video.encoding.profile')}
                field="video.encoding.profile"
                placeholder={t('groupForm.placeholder.video.encoding.profile')}
                addonAfter="bps"
              />
            </Col>
          </Row>
        </Card>
        <Card bordered={false}>
          <Title heading={5}>{t('groupForm.title.audio')}</Title>
          <Row gutter={80}>
            <Col span={8}>
              <Form.Select
                label={t('groupForm.form.label.audio.mode')}
                initValue={'custom'}
                field="audio.mode"
                placeholder={t('groupForm.placeholder.audio.mode')}
                optionList={[
                  { value: 'custom', label: '自定义' },
                  { value: 'mode1', label: '模式1' },
                  { value: 'mode2', label: '模式2' },
                ]}
              />
            </Col>
            <Col span={8}>
              <Form.Select
                label={t('groupForm.form.label.audio.acquisition.channels')}
                field="audio.acquisition.channels"
                placeholder={t('groupForm.placeholder.audio.acquisition.channels')}
                optionList={[
                  { value: '1', label: '1' },
                  { value: '2', label: '2' },
                  { value: '3', label: '3' },
                ]}
              />
            </Col>
            <Col span={8}>
              <Form.Input
                label={t('groupForm.form.label.audio.encoding.rate')}
                field="audio.encoding.rate"
                placeholder={t('groupForm.placeholder.audio.encoding.rate')}
                addonAfter="bps"
              />
            </Col>
          </Row>
          <Row gutter={80}>
            <Col span={8}>
              <Form.Input
                label={t('groupForm.form.label.audio.encoding.profile')}
                field="audio.encoding.profile"
                placeholder={t('groupForm.placeholder.audio.encoding.profile')}
                addonAfter="fps"
              />
            </Col>
          </Row>
        </Card>
        <Card bordered={false} className="!mb-[32px]">
          <Title heading={5}>{t('groupForm.title.explanation')}</Title>
          <Form.TextArea
            label={t('groupForm.form.label.explanation')}
            field="audio.explanation"
            placeholder={t('groupForm.placeholder.explanation')}
          />
        </Card>
      </Form>
      <div className={styles.actions}>
        <Space>
          <Button onClick={handleReset} size="large">
            {t('groupForm.reset')}
          </Button>
          <Button type="primary" theme="solid" onClick={handleSubmit} loading={loading} size="large">
            {t('groupForm.submit')}
          </Button>
        </Space>
      </div>
    </div>
  );
}
