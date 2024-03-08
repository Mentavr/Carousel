import clsx from 'clsx';
import cls from './style.module.css';
import { ImgDataType } from '../../utils/types/imgData.type';
interface propCarousel {
  activeImg: number;
  setActiveImg: (id:number) => void;
  activeAnimation: boolean;
}

export const Carousel = ({ img, activeAnimation,  activeImg,  setActiveImg}: ImgDataType & propCarousel) => {
  return (
    <div className={clsx(cls.container, activeAnimation && cls.animation)}>
      <div className={cls.imgWrapper}>
        <img className={cls.img} src={img} alt='Картинка' />
      </div>
    </div>
  );
};
