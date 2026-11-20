import { useState } from 'react';
import {
  Steps,
  Form,
  Input,
  Select,
  DatePicker,
  Button,
  Typography,
  Space,
  Card,
  Switch,
  Result,
} from 'antd';
import type { Rule } from 'antd/es/form';
import { useTranslation } from 'react-i18next';
import styles from './style.module.styl';

const { Title, Paragraph } = Typography;
const RangePicker = DatePicker.RangePicker;

export default function StepForm() {
  const { t } = useTranslation();
  const [current, setCurrent] = useState(0);
  const [form] = Form.useForm();

  const viewForm = () => {
    const values = form.getFieldsValue();
    form.setFieldsValue(values);
    setCurrent(0);
  };

  const reCreateForm = () => {
    form.resetFields();
    setCurrent(0);
  };

  const toNext = async () => {
    try {
      await form.validateFields();
      setCurrent(current + 1);
    } catch {
      /* validation failed, stay on current step */
    }
  };

  return (
    <div className={styles.container}>
      <Card>
        <Title level={5}>{t('stepForm.title')}</Title>
        <div className={styles.wrapper}>
          {/* antd v6：Steps 的 items.description 已废弃，改用 items.content（渲染结果一致）。
              / antd v6: Steps' items.description is deprecated; use items.content (same rendering). */}
          <Steps
            current={current}
            items={[
              {
                title: t('stepForm.title.basicInfo'),
                content: t('stepForm.desc.basicInfo'),
              },
              {
                title: t('stepForm.title.channel'),
                content: t('stepForm.desc.channel'),
              },
              {
                title: t('stepForm.title.created'),
                content: t('stepForm.desc.created'),
              },
            ]}
          />
          <Form form={form} className={styles.form}>
            {current === 0 && (
              <Form.Item noStyle>
                <Form.Item
                  label={t('stepForm.basicInfo.name')}
                  name="basic.name"
                  rules={
                    [
                      {
                        required: true,
                        message: t('stepForm.basicInfo.name.required'),
                      },
                      {
                        validator: (_, value) => {
                          if (value && !/^[\u4e00-\u9fa5a-zA-Z0-9]{1,20}$/g.test(value)) {
                            return Promise.reject(
                              new Error(t('stepForm.basicInfo.name.placeholder')),
                            );
                          }
                          return Promise.resolve();
                        },
                      },
                    ] as Rule[]
                  }
                >
                  <Input placeholder={t('stepForm.basicInfo.name.placeholder')} />
                </Form.Item>
                {/* antd v6 废弃了 Select.Option 子组件，改用 options 属性
                    / antd v6 deprecates Select.Option; use the options prop */}
                <Form.Item
                  label={t('stepForm.basicInfo.channelType')}
                  initialValue="app"
                  name="basic.channelType"
                  rules={[
                    {
                      required: true,
                      message: t('stepForm.basicInfo.channelType.required'),
                    },
                  ]}
                >
                  <Select
                    options={[
                      { value: 'app', label: 'APP通用渠道' },
                      { value: 'site', label: '网页通用渠道' },
                      { value: 'game', label: '游戏通用渠道' },
                    ]}
                  />
                </Form.Item>
                <Form.Item
                  label={t('stepForm.basicInfo.time')}
                  name="basic.time"
                  rules={[
                    {
                      required: true,
                      message: t('stepForm.basicInfo.time.required'),
                    },
                  ]}
                >
                  <RangePicker className="w-full" />
                </Form.Item>
                <Form.Item
                  label={t('stepForm.basicInfo.link')}
                  extra={t('stepForm.basicInfo.link.tips')}
                  name="basic.link"
                  // 示例值改为中性占位域名，避免残留 arco 品牌链接
                  // / Use a neutral placeholder domain instead of the leftover arco brand link
                  initialValue={'https://example.com'}
                  rules={[{ required: true }]}
                >
                  <Input placeholder={t('stepForm.basicInfo.link.placeholder')} />
                </Form.Item>
              </Form.Item>
            )}
            {current === 1 && (
              <Form.Item noStyle>
                <Form.Item
                  label={t('stepForm.channel.source')}
                  name="channel.source"
                  rules={[
                    {
                      required: true,
                      message: t('stepForm.channel.source.required'),
                    },
                  ]}
                >
                  <Input placeholder={t('stepForm.channel.source.placeholder')} />
                </Form.Item>
                <Form.Item
                  label={t('stepForm.channel.media')}
                  name="channel.media"
                  rules={[
                    {
                      required: true,
                      message: t('stepForm.channel.media.required'),
                    },
                  ]}
                >
                  <Input placeholder={t('stepForm.channel.media.placeholder')} />
                </Form.Item>
                <Form.Item
                  label={t('stepForm.channel.keywords')}
                  name="channel.keywords"
                  initialValue={['今日头条', '火山']}
                  rules={[{ required: true }]}
                >
                  <Select mode="tags" tokenSeparators={[',']} />
                </Form.Item>
                <Form.Item
                  label={t('stepForm.channel.remind')}
                  initialValue={true}
                  name="channel.remind"
                  valuePropName="checked"
                  rules={[{ required: true }]}
                >
                  <Switch />
                </Form.Item>

                <Form.Item
                  label={t('stepForm.channel.content')}
                  name="channel.content"
                  rules={[
                    {
                      required: true,
                      message: t('stepForm.channel.content.required'),
                    },
                  ]}
                >
                  <Input.TextArea placeholder={t('stepForm.channel.content.placeholder')} />
                </Form.Item>
              </Form.Item>
            )}
            {current !== 2 ? (
              // 占位标签列用于对齐按钮，antd 默认会在 label 后追加冒号（::after），
              // 这里只有空格会渲染出多余的「:」，需显式关闭
              // / Placeholder label column used to align the buttons. antd appends a colon
              // after the label via ::after, which renders a stray ":" for a blank label.
              <Form.Item label=" " colon={false}>
                <Space>
                  {current === 1 && (
                    <Button size="large" onClick={() => setCurrent(current - 1)}>
                      {t('stepForm.prev')}
                    </Button>
                  )}
                  {current !== 2 && (
                    <Button type="primary" size="large" onClick={toNext}>
                      {t('stepForm.next')}
                    </Button>
                  )}
                </Space>
              </Form.Item>
            ) : (
              <Form.Item noStyle>
                <Result
                  status="success"
                  title={t('stepForm.created.success.title')}
                  subTitle={t('stepForm.created.success.desc')}
                  extra={[
                    <Button key="reset" className="mr-[16px]" onClick={viewForm}>
                      {t('stepForm.created.success.view')}
                    </Button>,
                    <Button key="again" type="primary" onClick={reCreateForm}>
                      {t('stepForm.created.success.again')}
                    </Button>,
                  ]}
                />
              </Form.Item>
            )}
          </Form>
        </div>
        {current === 2 && (
          <div className={styles['form-extra']}>
            <Title level={5}>{t('stepForm.created.extra.title')}</Title>
            <Paragraph type="secondary">
              {t('stepForm.created.extra.desc')}
              <Button type="link">{t('stepForm.created.extra.detail')}</Button>
            </Paragraph>
          </div>
        )}
      </Card>
    </div>
  );
}
