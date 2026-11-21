import { useEffect, useRef } from 'react';
import { Button, Form, Skeleton, Space, Toast } from '@douyinfe/semi-ui';
import type { FormApi } from '@douyinfe/semi-ui/lib/es/form';
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
  // Semi 没有 Form.useForm，用 getFormApi 回调保存 formApi 引用
  // / Semi has no Form.useForm; keep the formApi reference via the getFormApi callback
  const formApiRef = useRef<FormApi<BasicInfoForm> | null>(null);

  const user = useUserStore((s) => s.user);
  const loading = !user;
  const { mutateAsync: saveInfo, isPending: saving } = useSaveInfo();

  // 用户数据到达后回填表单（仅预填 email / 昵称，其余受控于表单自身）
  useEffect(() => {
    if (user) {
      formApiRef.current?.setValues({ email: user.email, nickName: user.name } as Partial<BasicInfoForm>);
    }
  }, [user]);

  const handleSave = async () => {
    try {
      await formApiRef.current?.validate();
      const values = formApiRef.current!.getValues();
      await saveInfo(values);
      Toast.success(t('userSetting.saveSuccess'));
    } catch {
      /* 校验未通过,不提交 */
    }
  };

  const handleReset = () => formApiRef.current?.reset();

  const loadingNode = (rows = 1) => (
    <Skeleton active placeholder={<Skeleton.Paragraph rows={rows} />} />
  );

  const lang = i18n.language;

  return (
    <div className="w-[500px] mt-[6px]">
      <Form
        getFormApi={(api) => {
          formApiRef.current = api;
        }}
        labelCol={{ span: lang === 'en-US' ? 7 : 6 }}
        wrapperCol={{ span: lang === 'en-US' ? 17 : 18 }}
      >
        {loading ? (
          loadingNode()
        ) : (
          <Form.Input
            field="email"
            label={t('userSetting.info.email')}
            rules={[
              {
                type: 'email',
                required: true,
                message: t('userSetting.info.email.placeholder'),
              },
            ]}
            placeholder={t('userSetting.info.email.placeholder')}
          />
        )}
        {loading ? (
          loadingNode()
        ) : (
          <Form.Input
            field="nickName"
            label={t('userSetting.info.nickName')}
            rules={[{ required: true, message: t('userSetting.info.nickName.placeholder') }]}
            placeholder={t('userSetting.info.nickName.placeholder')}
          />
        )}
        {loading ? (
          loadingNode()
        ) : (
          <Form.Select
            field="rangeArea"
            label={t('userSetting.info.area')}
            rules={[{ required: true, message: t('userSetting.info.area.placeholder') }]}
            optionList={[{ label: '中国', value: '中国' }]}
            placeholder={t('userSetting.info.area.placeholder')}
          />
        )}
        {loading ? (
          loadingNode()
        ) : (
          <Form.Cascader
            field="location"
            label={t('userSetting.info.location')}
            initValue={['BeiJing', 'BeiJing', 'HaiDian']}
            rules={[{ required: true }]}
            treeData={cascaderOptions}
          />
        )}
        {loading ? (
          loadingNode()
        ) : (
          <Form.Input
            field="address"
            label={t('userSetting.info.address')}
            placeholder={t('userSetting.info.address.placeholder')}
          />
        )}
        {loading ? (
          loadingNode(3)
        ) : (
          <Form.TextArea
            field="profile"
            label={t('userSetting.info.profile')}
            placeholder={t('userSetting.info.profile.placeholder')}
          />
        )}
        {/* 占位标签列用于对齐按钮；Semi 不会给标签追加冒号，空白 label 不会渲染出多余的「:」 */}
        {/* / Placeholder label column to align the buttons; Semi does not append a colon to labels, so a blank label renders no stray ":" */}
        <Form.Slot label=" ">
          <Space>
            <Button type="primary" theme="solid" loading={saving} onClick={handleSave}>
              {t('userSetting.save')}
            </Button>
            <Button type="secondary" onClick={handleReset}>
              {t('userSetting.reset')}
            </Button>
          </Space>
        </Form.Slot>
      </Form>
    </div>
  );
}
