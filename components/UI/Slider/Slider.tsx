import * as React from 'react';
import cx from 'classnames';
import Button from 'react-bootstrap/Button';
import { Icon } from '../Icon/Icon';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import EffectCoverflow from './effect';
import css from './Slider.module.scss';

// install Swiper modules
SwiperCore.use([EffectCoverflow]);

type SliderProps = Swiper & {
  bottom?: React.ReactNode;
  top?: React.ReactNode;
  fullWidth?: boolean;
  paginationClassName?: string;
  arrows?: boolean;
};

const context = React.createContext({
  swiper: undefined,
  slideToPrev: () => {},
  slideToNext: () => {},
  slideTo: (idx: number) => () => {},
});

export const useSliderContext = () => React.useContext(context);

const Pagination = ({ className = undefined }) => {
  const { swiper, slideTo } = useSliderContext();
  const pagintaionRef = React.useRef();

  return (
    <div className={cx(css.pagination, className)} ref={pagintaionRef}>
      {swiper?.slides?.map((item, idx) => (
        <button
          key={idx}
          className={cx(
            css.paginationDot,
            {
              [css.paginationDotActive]: idx === swiper?.realIndex,
              paginationDotActive: idx === swiper?.realIndex,
            },
            'paginationDot'
          )}
          onClick={slideTo(idx)}
          type='button'
        />
      ))}
    </div>
  );
};

const Arrows = () => {
  const { slideToPrev, slideToNext } = useSliderContext();

  return (
    <div className='arrows'>
      <Button
        onClick={slideToPrev}
        aria-label='Предыдущий слайд'
        variant='contained'
        color='primary'
        className={cx(css.control, css.prevControl, 'pagination-prev')}
      >
        <Icon name='arrow-left' size={40} />
      </Button>
      <Button
        onClick={slideToNext}
        aria-label='Следующий слайд'
        variant='contained'
        color='primary'
        className={cx(css.control, css.nextControl, 'pagination-next')}
      >
        <Icon name='arrow-right' size={40} />
      </Button>
    </div>
  );
};

export const Slider = ({
  children,
  fullWidth,
  pagination,
  paginationClassName,
  className,
  arrows,
  top,
  bottom,
  ...props
}: SliderProps) => {
  const [, setUpdate] = React.useState(null);
  const swiperRef = React.useRef<SwiperCore>();
  const [controlledSwiper, setControlledSwiper] = React.useState(null);

  const slideTo = (idx) => () => {
    swiperRef.current.slideToLoop(idx);
  };
  const onSwiper = (swiper) => {
    swiperRef.current = swiper;
    setControlledSwiper(swiper);
  };
  const slideToNext = () => {
    swiperRef.current.slideNext();
    setControlledSwiper(swiperRef.current);
  };

  const slideToPrev = () => {
    swiperRef.current.slidePrev();
    setControlledSwiper(swiperRef.current);
  };

  const value = {
    swiper: swiperRef.current,
    slideToPrev,
    slideToNext,
    slideTo,
  };

  return (
    <div className={cx(css.root, className)}>
      <context.Provider value={value}>
        {top}
        <Swiper
          onSlideChange={() => {
            setUpdate({});
          }}
          onSwiper={onSwiper}
          {...props}
        >
          {React.Children.map(children, (children, idx) => (
            <SwiperSlide key={idx}>{children}</SwiperSlide>
          ))}
        </Swiper>
        {pagination && <Pagination className={paginationClassName} />}
        {arrows && <Arrows />}
        {bottom}
      </context.Provider>
    </div>
  );
};
