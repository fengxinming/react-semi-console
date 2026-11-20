import { Carousel } from 'antd';
import { useTranslation } from 'react-i18next';
import styles from './style.module.styl';
import type { BannerItem } from './types';

const BANNER_IMAGE =
  'http://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/6c85f43aed61e320ebec194e6a78d6d3.png~tplv-uwbnlip3yd-png.png';

/** 登录页左侧轮播：3 条 slogan（走 i18n）+ 配图。移植自参考 arco-design-pro。 */
export default function LoginBanner() {
  const { t } = useTranslation();
  const data: BannerItem[] = [1, 2, 3].map((n) => ({
    slogan: t(`login.banner.slogan${n}`),
    subSlogan: t(`login.banner.subSlogan${n}`),
    image: BANNER_IMAGE,
  }));

  return (
    <Carousel className={styles.carousel} effect="fade">
      {data.map((item) => (
        <div key={item.slogan}>
          <div className={styles['carousel-item']}>
            <div className={styles['carousel-title']}>{item.slogan}</div>
            <div className={styles['carousel-sub-title']}>{item.subSlogan}</div>
            <img alt="banner-image" className={styles['carousel-image']} src={item.image} />
          </div>
        </div>
      ))}
    </Carousel>
  );
}
