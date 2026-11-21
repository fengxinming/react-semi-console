import type { ProfileItemProps, ProfileBlockItem } from './types';
import { Descriptions, Card, Skeleton, Typography } from '@douyinfe/semi-ui';
import { useTranslation } from 'react-i18next';

const skeleton = (
  <Skeleton
    active
    placeholder={<Skeleton.Paragraph rows={1} style={{ width: '200px' }} />}
  />
);

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
          <div key={blockTitle} style={index > 0 ? { marginTop: 20 } : {}}>
            <Typography.Title heading={5}>{blockTitle}</Typography.Title>
            {/* Semi Descriptions 用 data（key 对应 label，value 对应内容）；
                label 样式通过每项的 keyStyle 设置。
                / Semi Descriptions uses `data` with key as label; keyStyle controls label style. */}
            <Descriptions
              data={(loading ? blockData.map((item) => ({ ...item, value: skeleton })) : blockData).map(
                (item) => ({
                  key: item.label,
                  value: item.value,
                  keyStyle: { textAlign: 'right', width: 200, paddingRight: 10 },
                }),
              )}
            />
          </div>
        ))}
      </div>
    </Card>
  );
}
