import type { ProfileItemProps, ProfileBlockItem } from './types';
import { Descriptions, Card, Skeleton } from 'antd';
import { useTranslation } from 'react-i18next';

const skeleton = <Skeleton paragraph={{ rows: 1, style: { width: '200px' } }} active />;

export default function ProfileItem({ data, type, loading }: ProfileItemProps) {
  const { t } = useTranslation();

  const blockDataList: ProfileBlockItem[] = [];

  blockDataList.push({
    title: t(`basicProfile.title.${type}Video`),
    data: [
      { label: t('basicProfile.label.video.mode'), value: data?.video?.mode || '-' },
      {
        label: t('basicProfile.label.video.acquisition.resolution'),
        value: data?.video?.acquisition?.resolution || '-',
      },
      {
        label: t('basicProfile.label.video.acquisition.frameRate'),
        value: `${data?.video?.acquisition?.frameRate || '-'} fps`,
      },
      {
        label: t('basicProfile.label.video.encoding.resolution'),
        value: data?.video?.encoding?.resolution || '-',
      },
      {
        label: t('basicProfile.label.video.encoding.rate.min'),
        value: `${data?.video?.encoding?.rate?.min || '-'} bps`,
      },
      {
        label: t('basicProfile.label.video.encoding.rate.max'),
        value: `${data?.video?.encoding?.rate?.max || '-'} bps`,
      },
      {
        label: t('basicProfile.label.video.encoding.rate.default'),
        value: `${data?.video?.encoding?.rate?.default || '-'} bps`,
      },
      {
        label: t('basicProfile.label.video.encoding.frameRate'),
        value: `${data?.video?.encoding?.frameRate || '-'} fpx`,
      },
      {
        label: t('basicProfile.label.video.encoding.profile'),
        value: data?.video?.encoding?.profile || '-',
      },
    ],
  });

  blockDataList.push({
    title: t(`basicProfile.title.${type}Audio`),
    data: [
      { label: t('basicProfile.label.audio.mode'), value: data?.audio?.mode || '-' },
      {
        label: t('basicProfile.label.audio.acquisition.channels'),
        value: `${data?.audio?.acquisition?.channels || '-'}${t('basicProfile.unit.audio.channels')}`,
      },
      {
        label: t('basicProfile.label.audio.encoding.channels'),
        value: `${data?.audio?.encoding?.channels || '-'}${t('basicProfile.unit.audio.channels')}`,
      },
      {
        label: t('basicProfile.label.audio.encoding.rate'),
        value: `${data?.audio?.encoding?.rate || '-'} kbps`,
      },
      {
        label: t('basicProfile.label.audio.encoding.profile'),
        value: data?.audio?.encoding?.profile || '-',
      },
    ],
  });

  return (
    <Card>
      <div>
        {blockDataList.map(({ title: blockTitle, data: blockData }, index) => (
          <Descriptions
            key={blockTitle}
            colon
            // antd v6：labelStyle / contentStyle 已废弃，改用 styles.label / styles.content
            // / antd v6: labelStyle / contentStyle are deprecated; use styles.label / styles.content
            styles={{
              label: { textAlign: 'right', width: 200, paddingRight: 10 },
              content: { width: 400 },
            }}
            title={blockTitle}
            items={(loading ? blockData.map((item) => ({ ...item, value: skeleton })) : blockData).map(
              (item) => ({ label: item.label, children: item.value }),
            )}
            style={index > 0 ? { marginTop: 20 } : {}}
          />
        ))}
      </div>
    </Card>
  );
}
