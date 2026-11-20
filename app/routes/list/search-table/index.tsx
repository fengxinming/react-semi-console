import { useState, useMemo } from 'react';
import { Table, Card, Button, Space, Typography } from 'antd';
import type { TablePaginationConfig } from 'antd';
import { PlusOutlined, DownloadOutlined } from '@ant-design/icons';
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

  // 分页类型直接用 antd 导出的 TablePaginationConfig，避免在本文件内定义类型
  // / Reuse antd's exported TablePaginationConfig instead of declaring a local type here
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    pageSize: 10,
    current: 1,
  });
  const [formParams, setFormParams] = useState<Record<string, any>>({});

  const { current = 1, pageSize = 10 } = pagination;

  // 分页 / 筛选条件变化时自动重新拉取（queryKey 带参，参数变化即重取）
  const { data = EMPTY_RESULT, isLoading: loading } = useSearchQuery(
    current,
    pageSize,
    formParams,
  );

  function onChangeTable(pag: TablePaginationConfig) {
    const { current: c = 1, pageSize: ps = 10 } = pag;
    setPagination((p) => ({ ...p, current: c, pageSize: ps }));
  }

  function handleSearch(params: Record<string, any>) {
    setPagination((p) => ({ ...p, current: 1 }));
    setFormParams(params);
  }

  return (
    <Card variant="borderless">
      <Title level={5}>{t('menu.list.searchTable')}</Title>
      <SearchForm onSearch={handleSearch} />
      <PermissionWrapper per={[{ resource: 'menu.list.searchTable', actions: ['write'] }]}>
        <div className="flex justify-between mb-[20px]">
          <Space>
            <Button type="primary" icon={<PlusOutlined />}>
              {t('searchTable.operations.add')}
            </Button>
            <Button>{t('searchTable.operations.upload')}</Button>
          </Space>
          <Space>
            <Button icon={<DownloadOutlined />}>{t('searchTable.operation.download')}</Button>
          </Space>
        </div>
      </PermissionWrapper>
      <Table
        rowKey="id"
        loading={loading}
        onChange={(pag) => onChangeTable(pag)}
        pagination={{
          ...pagination,
          total: data.total,
          showSizeChanger: true,
          showTotal: (total: number) => `共 ${total} 条`,
        }}
        columns={columns}
        dataSource={data.list}
      />
    </Card>
  );
}
