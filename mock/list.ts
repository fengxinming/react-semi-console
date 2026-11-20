const names = ['每日推荐视频集', '抖音短视频候选集', '国际新闻集合', '科技前沿速递', '财经早班车'];

const base = Array.from({ length: 100 }, (_, i) => ({
  id: `${10000000 + i}-${String((i % 9000) + 1000)}`,
  name: names[i % names.length],
  contentType: i % 3,
  filterType: i % 2,
  count: Math.floor(Math.random() * 2000),
  createdTime: (i % 60) + 1,
  status: i % 2,
}));

const qualityCategory = ['视频类', '图文类', '纯文本'];
const qualityName = ['历史导入', '内容版权', '敏感内容', '商业品牌'];

const serviceName = ['漏斗分析', '用户分布', '资源分发', '用户画像分析', '事件分析'];
const serviceDescriptions = [
  '用户行为分析之漏斗分析模型是企业实现精细化运营、进行用户行为分析的重要数据分析模型。',
  '快速诊断用户人群，地域细分情况，了解数据分布的集中度，以及主要的数据分布的区间段是什么。',
  '移动端动态化资源分发解决方案。提供稳定大流量服务支持、灵活定制的分发圈选规则，通过离线化预加载。',
  '用户画像就是将典型用户信息标签化，根据用户特征、业务场景和用户行为等信息，构建一个标签化的用户模型。',
  '事件分析即可进行筛选、分组、聚合的灵活多维数据分析。详情请点击卡片。',
];

const rulesName = [
  '内容屏蔽规则',
  '内容置顶规则',
  '内容加权规则',
  '内容分发规则',
  '多语言文字符号识别',
];
const rulesDescription = [
  '用户在执行特定的内容分发任务时，可使用内容屏蔽规则根据特定标签，过滤内容集合。',
  '该规则支持用户在执行特定内容分发任务时，对固定的几条内容置顶。',
  '选定内容加权规则后可自定义从不同内容集合获取内容的概率。',
  '内容分发时，对某些内容需要固定在C端展示的位置。',
  '精准识别英语、维语、藏语、蒙古语、朝鲜语等多种语言以及emoji表情形态的语义识别。',
];

const formatTime = (daysAgo: number) => {
  const d = new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000);
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(
    d.getHours(),
  )}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
};

const getQualityCard = () =>
  Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    title: `${qualityCategory[i % qualityCategory.length]}-${qualityName[i % qualityName.length]}`,
    time: formatTime(i % 30),
    qualityCount: 100 + ((i * 37) % 400),
    randomCount: (i * 13) % 100,
    duration: (i * 17) % 200,
  }));

const getServiceCard = () =>
  Array.from({ length: 10 }, (_, i) => {
    const index = i % serviceName.length;
    return {
      id: i + 1,
      icon: index,
      title: serviceName[index],
      description: serviceDescriptions[index],
      status: (i * 7) % 3,
    };
  });

const getRulesCard = () =>
  Array.from({ length: 10 }, (_, i) => {
    const index = i % rulesName.length;
    return {
      id: i + 1,
      index,
      title: rulesName[index],
      description: rulesDescription[index],
      status: i % 2,
    };
  });

const filterData = (q: Record<string, any>) => {
  const id = q.id as string | undefined;
  const name = q.name as string | undefined;
  const contentType = (q['contentType[]'] || q.contentType) as string[] | undefined;
  const filterType = (q['filterType[]'] || q.filterType) as string[] | undefined;
  const status = (q['status[]'] || q.status) as string[] | undefined;

  if (id) {
    return base.filter((item) => item.id === id);
  }

  let result = [...base];
  if (name) {
    result = result.filter((item) => item.name.includes(name));
  }
  if (contentType?.length) {
    result = result.filter((item) => contentType.includes(String(item.contentType)));
  }
  if (filterType?.length) {
    result = result.filter((item) => filterType.includes(String(item.filterType)));
  }
  if (status?.length) {
    result = result.filter((item) => status.includes(String(item.status)));
  }
  return result;
};

export default {
  'GET /api/list/search': async (req: any) => {
    const q = (req.query || {}) as Record<string, any>;
    const page = Number(q.page) || 1;
    const pageSize = Number(q.pageSize) || 10;
    const result = filterData(q);
    const start = (page - 1) * pageSize;
    return {
      code: 200,
      message: 'ok',
      data: { list: result.slice(start, start + pageSize), total: result.length },
    };
  },
  'GET /api/list/card': async () => ({
    code: 200,
    message: 'ok',
    data: {
      quality: getQualityCard(),
      service: getServiceCard(),
      rules: getRulesCard(),
    },
  }),
};
