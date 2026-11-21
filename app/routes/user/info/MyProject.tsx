import { Row, Col, Card, Avatar, AvatarGroup, Typography, Skeleton } from '@douyinfe/semi-ui';
import { useProjectsQuery } from '~/hooks/api/useUser';
import type { ProjectItem } from '~/api/types';
import type { ProjectCardProps } from './types';
import styles from './style.module.styl';

const { Text, Title } = Typography;

function ProjectCard(props: ProjectCardProps) {
  const { loading, contributors, title, enTitle, contributorsLength } = props;

  // Semi Card 用 bordered 控制边框，裸 bordered（等价 true）即为带边框卡片
  // / Semi Card uses `bordered` to control the border; a bare `bordered` (equivalent to true) renders a bordered card
  return (
    <Card bordered className={styles['project-wrapper']}>
      <Skeleton loading={loading} active placeholder={<Skeleton.Paragraph rows={1} />}>
        <Title heading={5}>{title}</Title>
      </Skeleton>

      <Skeleton loading={loading} active placeholder={<Skeleton.Paragraph rows={1} />}>
        <Text ellipsis className="!m-0">
          {enTitle}
        </Text>
      </Skeleton>

      <div className="mt-[22px]">
        <Skeleton loading={loading} active placeholder={<Skeleton.Paragraph rows={1} />}>
          <AvatarGroup size="extra-small">
            {(contributors ?? []).map((item) => (
              <Avatar key={item.avatar}>
                <img src={item.avatar} alt={item.name} />
              </Avatar>
            ))}
          </AvatarGroup>
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
