import { Input, Select, Cascader, Button, Form, Space, Skeleton, App } from 'antd';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useUserStore } from '~/store';
import { useSaveInfo } from '~/hooks/api/useUser';
import type { BasicInfoForm } from './types';

const cascaderOptions = [
  {
    label: '北京市',
    value: 'BeiJing',
    children: [
      {
        label: '北京市',
        value: 'BeiJing',
        children: [
          { label: '海淀区', value: 'HaiDian' },
          { label: '朝阳区', value: 'ChaoYang' },
        ],
      },
    ],
  },
  {
    label: '上海市',
    value: 'ShangHai',
    children: [
      {
        label: '上海市',
        value: 'ShangHai',
        children: [
          { label: '黄浦区', value: 'HuangPu' },
          { label: '静安区', value: 'JingAn' },
        ],
      },
    ],
  },
];

/** 基础信息表单:邮箱/昵称/国家地区/所在地/地址/简介 + 保存/重置。 */
export default function InfoForm() {
  const { t, i18n } = useTranslation();
  const [form] = Form.useForm<BasicInfoForm>();
  const { message } = App.useApp();

  const user = useUserStore((s) => s.user);
  const loading = !user;
  const { mutateAsync: saveInfo, isPending: saving } = useSaveInfo();

  // 用户数据到达后回填表单（仅预填 email / 昵称，其余受控于表单自身）
  useEffect(() => {
    if (user) {
      form.setFieldsValue({ email: user.email, nickName: user.name });
    }
  }, [user, form]);

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      await saveInfo(values);
      message.success(t('userSetting.saveSuccess'));
    } catch {
      /* 校验未通过,不提交 */
    }
  };

  const handleReset = () => form.resetFields();

  const loadingNode = (rows = 1) => (
    <Skeleton paragraph={{ rows, width: Array.from({ length: rows }, () => '100%') }} title={false} active />
  );

  const lang = i18n.language;

  return (
    <div className="w-[500px] mt-[6px]">
      <Form
        form={form}
        labelCol={{ span: lang === 'en-US' ? 7 : 6 }}
        wrapperCol={{ span: lang === 'en-US' ? 17 : 18 }}
      >
        <Form.Item
          label={t('userSetting.info.email')}
          name="email"
          rules={[
            {
              type: 'email',
              required: true,
              message: t('userSetting.info.email.placeholder'),
            },
          ]}
        >
          {loading ? (
            loadingNode()
          ) : (
            <Input placeholder={t('userSetting.info.email.placeholder')} />
          )}
        </Form.Item>
        <Form.Item
          label={t('userSetting.info.nickName')}
          name="nickName"
          rules={[{ required: true, message: t('userSetting.info.nickName.placeholder') }]}
        >
          {loading ? (
            loadingNode()
          ) : (
            <Input placeholder={t('userSetting.info.nickName.placeholder')} />
          )}
        </Form.Item>
        <Form.Item
          label={t('userSetting.info.area')}
          name="rangeArea"
          rules={[{ required: true, message: t('userSetting.info.area.placeholder') }]}
        >
          {loading ? (
            loadingNode()
          ) : (
            <Select
              options={[{ label: '中国', value: '中国' }]}
              placeholder={t('userSetting.info.area.placeholder')}
            />
          )}
        </Form.Item>
        <Form.Item
          label={t('userSetting.info.location')}
          name="location"
          initialValue={['BeiJing', 'BeiJing', 'HaiDian']}
          rules={[{ required: true }]}
        >
          {loading ? loadingNode() : <Cascader options={cascaderOptions} />}
        </Form.Item>
        <Form.Item label={t('userSetting.info.address')} name="address">
          {loading ? (
            loadingNode()
          ) : (
            <Input placeholder={t('userSetting.info.address.placeholder')} />
          )}
        </Form.Item>
        <Form.Item label={t('userSetting.info.profile')} name="profile">
          {loading ? (
            loadingNode(3)
          ) : (
            <Input.TextArea placeholder={t('userSetting.info.profile.placeholder')} />
          )}
        </Form.Item>
        {/* 占位标签列用于对齐按钮；antd 会给 label 后追加冒号（::after），空白 label 会渲染出多余的「:」 */}
        {/* / Placeholder label column to align the buttons; antd appends a colon via ::after, which renders a stray ":" for a blank label */}
        <Form.Item label=" " colon={false}>
          <Space>
            <Button type="primary" loading={saving} onClick={handleSave}>
              {t('userSetting.save')}
            </Button>
            <Button onClick={handleReset}>{t('userSetting.reset')}</Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
}
