import cls from './style.module.css';
import { Carousel } from '../../../components';
import { ImgData } from '../../../utils/data/ImgData';
import { useState } from 'react';
import clsx from 'clsx';

export const PerfectCarousel = () => {
  const [activeImg, setActiveImg] = useState(0);
  const [activeAnimation, setActiveAnimation] = useState(false);
  const [activeBackground, setActiveBackground] = useState(ImgData[ImgData.length - 1].img);

  const firstImg = activeImg;
  const secondImg = ImgData[activeImg + 1] ? activeImg + 1 : activeImg + 1 - ImgData.length;
  const thirdImg = ImgData[activeImg + 2] ? activeImg + 2 : activeImg + 2 - ImgData.length;
  const filterData = [ImgData[firstImg], ImgData[secondImg], ImgData[thirdImg]];

  const handlerPrev = () => {
    setTimeout(() => {
      setActiveAnimation(true);
      setTimeout(() => {
        setTimeout(() => {
          setActiveAnimation(false);
          if (activeImg === 0) {
            setActiveBackground(ImgData[ImgData.length - 1].img);
            return setActiveImg(ImgData.length - 1);
          }
          setActiveBackground(ImgData[activeImg - 1].img);
          return setActiveImg(activeImg - 1);
        }, 0);
      }, 1900);
    }, 100);
  };

  const handlerNext = () => {
    setTimeout(() => {
      setActiveAnimation(true);
      setTimeout(() => {
        setTimeout(() => {
          setActiveAnimation(false);
          if (!ImgData[activeImg + 1]) {
            setActiveBackground(ImgData[activeImg].img);
            return setActiveImg(0);
          }
          setActiveBackground(ImgData[activeImg].img);
          return setActiveImg(activeImg + 1);
        }, 0);
      }, 1900);
    }, 100);
  };

  return (
    <div className={cls.carouselContainer}>
      <div className={cls.backgroundImgContainer}>
        <img className={cls.backgroundImg} src={activeBackground} alt='Картинка заднего фона' />
      </div>
      <img
        className={clsx(cls.animImg, activeAnimation && cls.secondBackgroundImgAnimation)}
        src={ImgData[activeImg].img}
        alt='Картинка заднего фона'
      />
      <div className='container'>
        <div className={cls.content}>
          <div className={cls.carouselWrapper}>
            <div className={clsx(cls.textWrapper, activeAnimation && cls.textWrapperAnimation)}>
              <p className={clsx(cls.title)}>{ImgData[firstImg].title}</p>
              <p className={clsx(cls.text)}>{ImgData[firstImg].text}</p>
            </div>
            <div className={clsx(cls.img)}>
              {filterData.map(({ id, img }) => {
                return (
                  <Carousel
                    id={id}
                    img={img}
                    key={id}
                    activeImg={activeImg}
                    setActiveImg={setActiveImg}
                    activeAnimation={activeAnimation}
                  />
                );
              })}
            </div>
          </div>
          <div className={cls.buttonsWrapper}>
            <button
              className={clsx(cls.button, cls.prev)}
              onClick={handlerPrev}
              type='button'
              disabled={activeAnimation}
            ></button>
            <button
              className={clsx(cls.button, cls.next)}
              onClick={handlerNext}
              type='button'
              disabled={activeAnimation}
            ></button>
          </div>
        </div>
      </div>
    </div>
  );
};
