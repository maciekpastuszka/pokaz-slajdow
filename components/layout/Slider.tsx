import { css } from '@emotion/react';
import { useEffect, useRef } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { COLORS } from '@lib/constants';
import mq from '@utils/mq';
import Link from 'next/link';
import { use } from 'ast-types';

function Arrow({ type, callback }) {
  return (
    <button
      css={css`
        border: none;
        background: transparent;
        cursor: pointer;
        height: 40px;
        padding-right: 20px;
        opacity: 0.7;
        ${type === 'next' && `transform: rotate(180deg);`}

        ${mq(
          'small',
          css`
            padding-right: 100px;
          `
        )}

        &:hover {
          opacity: 1;
        }
      `}
      onClick={callback}
    >
      <span
        css={css`
          border-top: 1px solid ${COLORS['text-light']};
          position: relative;
          display: block;
          width: 80px;
          ${mq(
            'small',
            css`
              width: 150px;
            `
          )}

          &:after {
            content: ' ';
            display: block;
            top: 0;
            left: -2px;
            transform: translateY(-50%);
            border-top: 5px solid transparent;
            border-bottom: 5px solid transparent;
            border-right: 10px solid ${COLORS['text-light']};
            position: absolute;
          }
        `}
      />
    </button>
  );
}

export default function Slider({ content }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  const animationInterval = useRef();

  const initAutoplay = () => {
    clearInterval(animationInterval.current);

    const autoplay = () => {
      emblaApi?.scrollNext();
    };

    animationInterval.current = setInterval(autoplay, 4000);
  };

  useEffect(() => {
    initAutoplay();

    return () => clearInterval(animationInterval.current);
  }, [emblaApi]);

  const scrollPrev = () => {
    initAutoplay();
    emblaApi?.scrollPrev();
  };

  const scrollNext = () => {
    initAutoplay();
    emblaApi?.scrollNext();
  };

  return (
    <div
      css={css`
        overflow: hidden;
        position: relative;
        background-color: ${COLORS['background-dark']};

        &:after {
          content: ' ';
          display: block;
          width: 100%;
          position: absolute;
          height: 100%;
          background: linear-gradient(
            180deg,
            ${COLORS['background-dark']} -10%,
            transparent 20%,
            transparent 80%,
            ${COLORS['background-dark']} 110%
          );
          top: 0;
        }
      `}
    >
      <div ref={emblaRef}>
        <div
          css={css`
            display: flex;
            opacity: var(--slider-opacity);
            transition: opacity 0.3s;
          `}
        >
          <div
            css={css`
              background-image: url(https://patrycjapastuszka.com/wp-content/uploads/2020/11/DSC04345-1.jpg);
              background-size: cover;
              background-position: center;
              height: 100vh;
              width: 100%;
              position: relative;
              flex-shrink: 0;
            `}
          />
          <div
            css={css`
              background-image: url(https://patrycjapastuszka.com/wp-content/uploads/2021/10/igamati0710.jpg);
              background-size: cover;
              background-position: center;
              height: 100vh;
              width: 100%;
              position: relative;
              flex-shrink: 0;
            `}
          />
          <div
            css={css`
              background-image: url(https://patrycjapastuszka.com/wp-content/uploads/2021/10/kd0101.jpg);
              background-size: cover;
              background-position: center;
              height: 100vh;
              width: 100%;
              position: relative;
              flex-shrink: 0;
            `}
          />
        </div>
      </div>

      <div
        css={css`
          position: absolute;
          padding: 40px 20px;
          bottom: 0;
          left: 0;
          width: 100%;
          display: flex;
          justify-content: center;
          z-index: 1;
        `}
      >
        <Arrow type="prev" callback={scrollPrev} />
        <Arrow type="next" callback={scrollNext} />
      </div>
    </div>
  );
}
