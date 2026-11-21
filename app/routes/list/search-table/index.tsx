import { useState, useMemo } from 'react';
import { Table, Card, Button, Space, Typography } from '@douyinfe/semi-ui';
import type { TablePaginationProps } from '@douyinfe/semi-ui/lib/es/table/interface';
import { IconPlus, IconDownload } from '@douyinfe/semi-icons';
import { useTranslation } from 'react-i18next';
import PermissionWrapper from '~/components/PermissionWrapper';
import SearchForm from './SearchForm';
import { getColumns } from './constants';
import { useSearchQuery } from '~/hooks/api/useSearchTable';
import type { SearchResult } from '~/api/types';

const { Title } = Typography;

// 空结果占位：模块级常量，保证引用稳定
const EMPTY_RESULT: SearchResult = { list: [], total: 0 };

export default function SearchTable() {
  const { t } = useTranslation();

  const tableCallback = (_record: Record<string, any>, _type: string) => {
    // 预留：查看 / 编辑等行操作的回调入口
  };

  const columns = useMemo(() => getColumns(t, tableCallback), [t]);

  // 分页类型用 Semi Table 导出的分页配置类型，避免在本文件内定义类型
  // / Reuse Semi's exported table pagination type instead of declaring a local type here
  const [pagination, setPagination] = useState<TablePaginationProps>({
    pageSize: 10,
    currentPage: 1,
  });
  const [formParams, setFormParams] = useState<Record<string, any>>({});

  const { currentPage = 1, pageSize = 10 } = pagination;

  // 分页 / 筛选条件变化时自动重新拉取（queryKey 带参，参数变化即重取）
  const { data = EMPTY_RESULT, isLoading: loading } = useSearchQuery(
    currentPage,
    pageSize,
    formParams,
  );

  function onChangeTable(pag?: TablePaginationProps) {
    const { currentPage: c = 1, pageSize: ps = 10 } = pag ?? {};
    setPagination((p) => ({ ...p, currentPage: c, pageSize: ps }));
  }

  function handleSearch(params: Record<string, any>) {
    setPagination((p) => ({ ...p, currentPage: 1 }));
    setFormParams(params);
  }

  return (
    <Card bordered={false}>
      <Title heading={5}>{t('menu.list.searchTable')}</Title>
      <SearchForm onSearch={handleSearch} />
      <PermissionWrapper per={[{ resource: 'menu.list.searchTable', actions: ['write'] }]}>
        <div className="flex justify-between mb-[20px]">
          <Space>
            <Button type="primary" theme="solid" icon={<IconPlus />}>
              {t('searchTable.operations.add')}
            </Button>
            <Button>{t('searchTable.operations.upload')}</Button>
          </Space>
          <Space>
            <Button icon={<IconDownload />}>{t('searchTable.operation.download')}</Button>
          </Space>
        </div>
      </PermissionWrapper>
      <Table
        rowKey="id"
        loading={loading}
        onChange={(changeInfo) => onChangeTable(changeInfo.pagination)}
        pagination={{
          ...pagination,
          total: data.total,
          showSizeChanger: true,
          showTotal: true,
          formatPageText: ({ total } = {}) => `共 ${total} 条`,
        }}
        columns={columns}
        dataSource={data.list}
      />
    </Card>
  );
}
