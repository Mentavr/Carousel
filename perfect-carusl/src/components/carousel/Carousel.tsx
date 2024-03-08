import clsx from 'clsx';
import cls from './style.module.css';
import { ImgDataType } from '../../utils/types/imgData.type';
import { useState } from 'react';
interface propCarousel {
  activeImg: number;
  setActiveImg: (id:number) => void;
  activeAnimation: boolean;
}

export const Carousel = ({ id, img, activeAnimation,  activeImg,  setActiveImg}: ImgDataType & propCarousel) => {

  return (
    <button type='button' className={clsx(cls.container, activeAnimation && cls.animation)} onClick={() => setActiveImg(id - 1)}>
      <div className={cls.imgWrapper}>
        <img className={cls.img} src={img} alt='Картинка' />
      </div>
    </button>
  );
};
