import { useState } from 'react';
import { Steps, Form, Button, Typography, Space, Card } from '@douyinfe/semi-ui';
import { IconTickCircle } from '@douyinfe/semi-icons';
import { useTranslation } from 'react-i18next';
import styles from './style.module.styl';

const { Title, Paragraph } = Typography;

export default function StepForm() {
  const { t } = useTranslation();
  const [current, setCurrent] = useState(0);
  const [form] = Form.useForm();

  const viewForm = () => {
    const values = form.getValues();
    form.setValues(values);
    setCurrent(0);
  };

  const reCreateForm = () => {
    form.reset();
    setCurrent(0);
  };

  const toNext = async () => {
    try {
      await form.validate();
      setCurrent(current + 1);
    } catch {
      /* validation failed, stay on current step */
    }
  };

  return (
    <div className={styles.container}>
      <Card>
        <Title heading={5}>{t('stepForm.title')}</Title>
        <div className={styles.wrapper}>
          {/* 步骤条用 Semi Steps 的 children Steps.Step，描述写在 description 上。
              / Semi Steps uses child Steps.Step elements with their description on `description`. */}
          <Steps current={current}>
            <Steps.Step
              title={t('stepForm.title.basicInfo')}
              description={t('stepForm.desc.basicInfo')}
            />
            <Steps.Step
              title={t('stepForm.title.channel')}
              description={t('stepForm.desc.channel')}
            />
            <Steps.Step
              title={t('stepForm.title.created')}
              description={t('stepForm.desc.created')}
            />
          </Steps>
          <Form form={form} className={styles.form}>
            {current === 0 && (
              <>
                <Form.Input
                  label={t('stepForm.basicInfo.name')}
                  field="basic.name"
                  rules={[{ required: true, message: t('stepForm.basicInfo.name.required') }]}
                  validator={(value) => {
                    if (value && !/^[\u4e00-\u9fa5a-zA-Z0-9]{1,20}$/g.test(value)) {
                      return t('stepForm.basicInfo.name.placeholder');
                    }
                    return '';
                  }}
                  placeholder={t('stepForm.basicInfo.name.placeholder')}
                />
                <Form.Select
                  label={t('stepForm.basicInfo.channelType')}
                  field="basic.channelType"
                  initValue="app"
                  rules={[{ required: true, message: t('stepForm.basicInfo.channelType.required') }]}
                  optionList={[
                    { value: 'app', label: 'APP通用渠道' },
                    { value: 'site', label: '网页通用渠道' },
                    { value: 'game', label: '游戏通用渠道' },
                  ]}
                />
                <Form.DatePicker
                  label={t('stepForm.basicInfo.time')}
                  field="basic.time"
                  type="dateRange"
                  className="w-full"
                  rules={[{ required: true, message: t('stepForm.basicInfo.time.required') }]}
                />
                <Form.Input
                  label={t('stepForm.basicInfo.link')}
                  extraText={t('stepForm.basicInfo.link.tips')}
                  field="basic.link"
                  // 使用中性占位域名作为示例值
                  // / Use a neutral placeholder domain as the example value
                  initValue={'https://example.com'}
                  rules={[{ required: true }]}
                  placeholder={t('stepForm.basicInfo.link.placeholder')}
                />
              </>
            )}
            {current === 1 && (
              <>
                <Form.Input
                  label={t('stepForm.channel.source')}
                  field="channel.source"
                  rules={[{ required: true, message: t('stepForm.channel.source.required') }]}
                  placeholder={t('stepForm.channel.source.placeholder')}
                />
                <Form.Input
                  label={t('stepForm.channel.media')}
                  field="channel.media"
                  rules={[{ required: true, message: t('stepForm.channel.media.required') }]}
                  placeholder={t('stepForm.channel.media.placeholder')}
                />
                <Form.Select
                  label={t('stepForm.channel.keywords')}
                  field="channel.keywords"
                  initValue={['今日头条', '火山']}
                  rules={[{ required: true }]}
                  multiple
                  allowCreate
                />
                <Form.Switch
                  label={t('stepForm.channel.remind')}
                  field="channel.remind"
                  initValue={true}
                  rules={[{ required: true }]}
                />
                <Form.TextArea
                  label={t('stepForm.channel.content')}
                  field="channel.content"
                  rules={[{ required: true, message: t('stepForm.channel.content.required') }]}
                  placeholder={t('stepForm.channel.content.placeholder')}
                />
              </>
            )}
            {current !== 2 ? (
              <Space>
                {current === 1 && (
                  <Button size="large" onClick={() => setCurrent(current - 1)}>
                    {t('stepForm.prev')}
                  </Button>
                )}
                {current !== 2 && (
                  <Button type="primary" theme="solid" size="large" onClick={toNext}>
                    {t('stepForm.next')}
                  </Button>
                )}
              </Space>
            ) : (
              <div className={styles.result}>
                <IconTickCircle style={{ fontSize: 64, color: 'var(--semi-color-success)' }} />
                <Title heading={5}>{t('stepForm.created.success.title')}</Title>
                <Paragraph type="secondary">{t('stepForm.created.success.desc')}</Paragraph>
                <Space>
                  <Button className="mr-[16px]" onClick={viewForm}>
                    {t('stepForm.created.success.view')}
                  </Button>
                  <Button type="primary" theme="solid" onClick={reCreateForm}>
                    {t('stepForm.created.success.again')}
                  </Button>
                </Space>
              </div>
            )}
          </Form>
        </div>
        {current === 2 && (
          <div className={styles['form-extra']}>
            <Title heading={5}>{t('stepForm.created.extra.title')}</Title>
            <Paragraph type="secondary">
              {t('stepForm.created.extra.desc')}
              <Button theme="borderless" type="tertiary">
                {t('stepForm.created.extra.detail')}
              </Button>
            </Paragraph>
          </div>
        )}
      </Card>
    </div>
  );
}
