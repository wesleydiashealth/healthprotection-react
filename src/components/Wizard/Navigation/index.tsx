import React, { useContext } from 'react';
import {
  HiOutlineArrowNarrowLeft,
  HiOutlineArrowNarrowRight,
} from 'react-icons/hi';
import { BsCheck } from 'react-icons/bs';
import {
  CarouselContext,
  ButtonBack,
  ButtonNext,
  DotGroup,
} from 'pure-react-carousel';

import { useApp } from 'contexts/app';
import { useWizard } from 'contexts/wizard';

import Container from './styles';

const Navigation: React.FC = () => {
  const context = useApp();
  const { labels } = context;

  const wizardContext = useWizard();
  const { steps } = wizardContext;

  const carouselContext = useContext(CarouselContext);
  const { setStoreState } = carouselContext;

  return (
    <Container>
      <ButtonBack>
        <>
          <HiOutlineArrowNarrowLeft size={20} />
          {labels.step_1_previous}
        </>
      </ButtonBack>
      <DotGroup
        showAsSelectedForCurrentSlideOnly
        renderDots={props => {
          const totalSteps = props?.totalSlides && props.totalSlides - 1;

          const parentSteps = Object.entries(steps).filter(
            ({ 0: key }) => !key.includes('_'),
          );

          const allCompleted =
            parentSteps.filter(({ 1: parentStep }) => !!parentStep.isCompleted)
              .length === parentSteps.length;

          return (
            <div className="carousel__dot-group">
              {parentSteps.map(({ 0: key }) => {
                const index = parseInt(key.replace(/^\D+/g, ''), 10);

                const isCurrent = props.currentSlide === index - 1;

                const isCompleted = Object.entries(steps)
                  .filter(
                    ({ 0: itemKey }) =>
                      parseInt(itemKey.replace(/^\D+/g, ''), 10) === index,
                  )
                  .reduce((acc: boolean, { 1: currStep }) => {
                    return currStep.isCompleted ? !!currStep.isCompleted : acc;
                  }, false);

                return (
                  <button
                    key={key}
                    aria-label="slide dot"
                    type="button"
                    className={`carousel__dot carousel__dot--${index} ${
                      isCurrent && 'carousel__dot--selected'
                    } ${isCompleted && 'carousel__dot--completed'}`}
                    onClick={() => {
                      setStoreState({ currentSlide: index - 1 });
                    }}
                  >
                    {isCompleted && <BsCheck />}
                  </button>
                );
              })}
              <button
                aria-label="slide dot"
                type="button"
                className={`carousel__dot carousel__dot--${props.totalSlides} ${
                  props.currentSlide === totalSteps && 'carousel__dot--selected'
                } ${allCompleted && 'carousel__dot--completed'}`}
                onClick={() => {
                  setStoreState({ currentSlide: totalSteps });
                }}
              >
                {allCompleted && <BsCheck />}
              </button>
            </div>
          );
        }}
      />
      <ButtonNext>
        <>
          {labels.step_1_next}
          <HiOutlineArrowNarrowRight size={20} />
        </>
      </ButtonNext>
    </Container>
  );
};

export default Navigation;
