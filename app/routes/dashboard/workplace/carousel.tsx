import { Carousel } from 'antd';
import styles from './style.module.styl';

const imageSrc = [
  '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/f7e8fc1e09c42e30682526252365be1c.jpg~tplv-uwbnlip3yd-webp.webp',
  '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/94e8dd2d6dc4efb2c8cfd82c0ff02a2c.jpg~tplv-uwbnlip3yd-webp.webp',
  '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/ec447228c59ae1ebe185bab6cd776ca4.jpg~tplv-uwbnlip3yd-webp.webp',
  '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/1d1580d2a5a1e27415ff594c756eabd8.jpg~tplv-uwbnlip3yd-webp.webp',
];

export default function CarouselWidget() {
  return (
    <Carousel autoplay className={styles.carousel}>
      {imageSrc.map((src) => (
        <div key={src}>
          <img src={src} className={styles['carousel-img']} />
        </div>
      ))}
    </Carousel>
  );
}
