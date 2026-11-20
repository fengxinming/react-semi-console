import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';
import { Form, Input, Select, DatePicker, Button, Row, Col } from 'antd';
import { ReloadOutlined, SearchOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { ContentType, FilterType, Status } from './constants';
import styles from './style.module.styl';
import type { SearchFormProps } from './types';

export default function SearchForm({ onSearch }: SearchFormProps) {
  const { t, i18n } = useTranslation();
  const [form] = Form.useForm();

  const colSpan = i18n.language === 'zh-CN' ? 8 : 12;

  const handleSubmit = () => {
    onSearch(form.getFieldsValue());
  };

  const handleReset = () => {
    form.resetFields();
    onSearch({});
  };

  return (
    <div className={styles['search-form-wrapper']}>
      <Form
        form={form}
        className={styles['search-form']}
        labelAlign="left"
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 19 }}
      >
        <Row gutter={24}>
          <Col span={colSpan}>
            <Form.Item label={t('searchTable.columns.id')} name="id">
              <Input placeholder={t('searchForm.id.placeholder')} allowClear />
            </Form.Item>
          </Col>
          <Col span={colSpan}>
            <Form.Item label={t('searchTable.columns.name')} name="name">
              <Input placeholder={t('searchForm.name.placeholder')} allowClear />
            </Form.Item>
          </Col>
          <Col span={colSpan}>
            <Form.Item label={t('searchTable.columns.contentType')} name="contentType">
              <Select
                placeholder={t('searchForm.all.placeholder')}
                options={ContentType.map((item, index) => ({ label: item, value: index }))}
                mode="multiple"
                allowClear
              />
            </Form.Item>
          </Col>
          <Col span={colSpan}>
            <Form.Item label={t('searchTable.columns.filterType')} name="filterType">
              <Select
                placeholder={t('searchForm.all.placeholder')}
                options={FilterType.map((item, index) => ({ label: item, value: index }))}
                mode="multiple"
                allowClear
              />
            </Form.Item>
          </Col>
          <Col span={colSpan}>
            <Form.Item label={t('searchTable.columns.createdTime')} name="createdTime">
              <DatePicker.RangePicker
                allowClear
                className="w-full"
                disabledDate={(current: Dayjs) => current.isAfter(dayjs())}
              />
            </Form.Item>
          </Col>
          <Col span={colSpan}>
            <Form.Item label={t('searchTable.columns.status')} name="status">
              <Select
                placeholder={t('searchForm.all.placeholder')}
                options={Status.map((item, index) => ({ label: item, value: index }))}
                mode="multiple"
                allowClear
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <div className={styles['right-button']}>
        <Button type="primary" icon={<SearchOutlined />} onClick={handleSubmit}>
          {t('searchTable.form.search')}
        </Button>
        <Button icon={<ReloadOutlined />} onClick={handleReset}>
          {t('searchTable.form.reset')}
        </Button>
      </div>
    </div>
  );
}
