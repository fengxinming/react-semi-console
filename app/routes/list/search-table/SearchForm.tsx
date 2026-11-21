import { Form, Button, Row, Col } from '@douyinfe/semi-ui';
import { IconRefresh, IconSearch } from '@douyinfe/semi-icons';
import { useTranslation } from 'react-i18next';
import { ContentType, FilterType, Status } from './constants';
import styles from './style.module.styl';
import type { SearchFormProps } from './types';

export default function SearchForm({ onSearch }: SearchFormProps) {
  const { t, i18n } = useTranslation();
  const [form] = Form.useForm();

  const colSpan = i18n.language === 'zh-CN' ? 8 : 12;

  const handleSubmit = () => {
    onSearch(form.getValues());
  };

  const handleReset = () => {
    form.reset();
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
            <Form.Input
              label={t('searchTable.columns.id')}
              field="id"
              placeholder={t('searchForm.id.placeholder')}
              showClear
            />
          </Col>
          <Col span={colSpan}>
            <Form.Input
              label={t('searchTable.columns.name')}
              field="name"
              placeholder={t('searchForm.name.placeholder')}
              showClear
            />
          </Col>
          <Col span={colSpan}>
            <Form.Select
              label={t('searchTable.columns.contentType')}
              field="contentType"
              placeholder={t('searchForm.all.placeholder')}
              optionList={ContentType.map((item, index) => ({ label: item, value: index }))}
              multiple
              showClear
            />
          </Col>
          <Col span={colSpan}>
            <Form.Select
              label={t('searchTable.columns.filterType')}
              field="filterType"
              placeholder={t('searchForm.all.placeholder')}
              optionList={FilterType.map((item, index) => ({ label: item, value: index }))}
              multiple
              showClear
            />
          </Col>
          <Col span={colSpan}>
            <Form.DatePicker
              label={t('searchTable.columns.createdTime')}
              field="createdTime"
              type="dateRange"
              showClear
              className="w-full"
              disabledDate={(date?: Date) => (date ? date.getTime() > Date.now() : false)}
            />
          </Col>
          <Col span={colSpan}>
            <Form.Select
              label={t('searchTable.columns.status')}
              field="status"
              placeholder={t('searchForm.all.placeholder')}
              optionList={Status.map((item, index) => ({ label: item, value: index }))}
              multiple
              showClear
            />
          </Col>
        </Row>
      </Form>
      <div className={styles['right-button']}>
        <Button type="primary" theme="solid" icon={<IconSearch />} onClick={handleSubmit}>
          {t('searchTable.form.search')}
        </Button>
        <Button icon={<IconRefresh />} onClick={handleReset}>
          {t('searchTable.form.reset')}
        </Button>
      </div>
    </div>
  );
}
