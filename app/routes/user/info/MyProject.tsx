import { Row, Col, Card, Avatar, Typography, Skeleton } from 'antd';
import { useProjectsQuery } from '~/hooks/api/useUser';
import type { ProjectItem } from '~/api/types';
import type { ProjectCardProps } from './types';
import styles from './style.module.styl';

const { Text, Title } = Typography;

function ProjectCard(props: ProjectCardProps) {
  const { loading, contributors, title, enTitle, contributorsLength } = props;

  // antd v6 废弃了 Card 的 bordered，平替是 variant：
  // 裸 bordered（等价 true）→ variant="outlined"，bordered={false} → variant="borderless"。
  // 这里原来是裸 bordered，故写 outlined。
  // / antd v6 deprecates Card's `bordered` in favor of `variant`: a bare `bordered`
  // (equivalent to true) maps to variant="outlined"; bordered={false} maps to
  // variant="borderless". This was a bare `bordered`, hence outlined.
  return (
    <Card variant="outlined" className={styles['project-wrapper']} size="small">
      <Skeleton loading={loading} paragraph={{ rows: 1 }} title={false} active>
        <Title level={5}>{title}</Title>
      </Skeleton>

      <Skeleton loading={loading} paragraph={{ rows: 1 }} title={false} active>
        <Text ellipsis className="!m-0">
          {enTitle}
        </Text>
      </Skeleton>

      <div className="mt-[22px]">
        <Skeleton loading={loading} paragraph={{ rows: 1 }} title={false} active>
          <Avatar.Group size={24}>
            {(contributors ?? []).map((item) => (
              <Avatar key={item.avatar}>
                <img src={item.avatar} alt={item.name} />
              </Avatar>
            ))}
          </Avatar.Group>
          <Text type="secondary">等{(contributorsLength ?? 0).toLocaleString()}人</Text>
        </Skeleton>
      </div>
    </Card>
  );
}

export default function MyProject() {
  const { data = [], isLoading: loading } = useProjectsQuery();
  const list = data.length ? data : Array.from({ length: 6 }, () => ({}));

  return (
    <Row gutter={12}>
      {list.map((item: ProjectItem, index) => (
        <Col
          key={item.title || index}
          span={8}
          className={index > list.length - 4 && index < list.length ? 'mt-[16px]' : undefined}
        >
          <ProjectCard {...item} loading={loading} />
        </Col>
      ))}
    </Row>
  );
}
