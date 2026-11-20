import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import { Input, Modal } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { menuRoutes } from '~/config/menu';
import type { SearchResult } from './types';
import styles from './style.module.styl';
import type { MenuBranch, MenuRoute } from '~/config/types';

function flattenMenu(list: MenuRoute[]): SearchResult[] {
  const out: SearchResult[] = [];
  const walk = (items: MenuRoute[]) => {
    items.forEach((it) => {
      out.push({ key: it.path, name: it.name });
      const { children } = it as MenuBranch;
      if (children) {
        walk(children);
      }
    });
  };
  walk(list);
  return out;
}

// 搜索框 + 搜索弹窗是一体的，统一收进本组件
export default function SearchEntry() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [searchOpen, setSearchOpen] = useState(false);
  const [keyword, setKeyword] = useState('');

  const allSearch = useMemo(() => flattenMenu(menuRoutes), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const searchResults = useMemo(() => {
    const kw = keyword.trim().toLowerCase();
    if (!kw) {
      return allSearch;
    }
    return allSearch.filter((r) => t(r.name).toLowerCase().includes(kw));
  }, [keyword, allSearch, t]);

  const goSearch = (key: string) => {
    setSearchOpen(false);
    setKeyword('');
    navigate(key);
  };

  // 只在点击时打开搜索弹窗。Modal 关闭时 rc-dialog 会把焦点还给触发元素，
  // 若同时监听 onFocus，关闭后焦点回落会立刻再次打开弹窗（表现为点关闭没反应）。
  // / Open the search modal on click only. rc-dialog restores focus to the trigger element when the
  // modal closes, so an onFocus handler would reopen it right away (the close button looks dead).
  return (
    <>
      <Input
        className={`${styles['search-box']}`}
        placeholder={t('navbar.search.placeholder')}
        allowClear
        onClick={() => setSearchOpen(true)}
        prefix={<SearchOutlined />}
      />
      <Modal
        title={t('navbar.search.title')}
        open={searchOpen}
        footer={null}
        onCancel={() => setSearchOpen(false)}
        className="w-[520px]"
      >
        <Input
          allowClear
          autoFocus
          placeholder={t('navbar.search.placeholder')}
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="mb-[12px]"
          prefix={<SearchOutlined />}
        />
        <div className="max-h-[320px] overflow-auto">
          {searchResults.map((r) => (
            <div key={r.key} className={styles['search-item']} onClick={() => goSearch(r.key)}>
              {t(r.name)}
            </div>
          ))}
          {searchResults.length === 0 && (
            <div className={styles['search-empty']}>{t('common.empty')}</div>
          )}
        </div>
      </Modal>
    </>
  );
}
