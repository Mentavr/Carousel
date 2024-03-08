import cls from './style.module.css';
import { RenderImg } from '../../../components';
import { ImgData } from '../../../utils/data/ImgData';
import { useRef, useState } from 'react';
import clsx from 'clsx';

export const PerfectCarousel = () => {
  const [activeImg, setActiveImg] = useState(0);
  const [activeAnimation, setActiveAnimation] = useState(false);
  const [activeBackground, setActiveBackground] = useState(ImgData[ImgData.length - 1].img);

  const firstImg = activeImg;
  const secondImg = ImgData[activeImg + 1] ? activeImg + 1 : activeImg + 1 - ImgData.length;
  const thirdImg = ImgData[activeImg + 2] ? activeImg + 2 : activeImg + 2 - ImgData.length;
  const filterData = [ImgData[firstImg], ImgData[secondImg], ImgData[thirdImg]];

  const ref = useRef<HTMLImageElement>(null);
  const refSection = useRef<HTMLImageElement>(null);

  const handlerOpen = () => {
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

  const handlerMouseParallax = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    if (!ref.current || !refSection.current) return;
    const x = (e.clientX / refSection.current.clientWidth) * 2;
    const y = (e.clientY / refSection.current.clientHeight) * 2;
    ref.current.style.top = '0';
    ref.current.style.left = '0';
    ref.current.style.transform = `translateX(-${x}%) translateY(-${y}%)`;
  };

  return (
    <section
      ref={refSection}
      className={cls.carouselContainer}
      onMouseMove={(e: React.MouseEvent<HTMLImageElement, MouseEvent>) => handlerMouseParallax(e)}
    >
      <div ref={ref} className={cls.backgroundImgContainer}>
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
                  <RenderImg
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
              className={clsx(cls.button, cls.next)}
              onClick={handlerOpen}
              type='button'
              disabled={activeAnimation}
            ></button>
          </div>
        </div>
      </div>
    </section>
  );
};
