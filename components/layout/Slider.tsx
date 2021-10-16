import Container from '../core/Container';
import Link from 'next/link';
import useEmblaCarousel from 'embla-carousel-react';
import { css } from '@emotion/react';

export default function Slider({ content }) {
  const [emblaRef] = useEmblaCarousel({ loop: true });

  return (
    <div
      css={css`
        overflow: hidden;
      `}
    >
      <div ref={emblaRef}>
        <div
          css={css`
            position: relative;
            display: flex;
          `}
        >
          <div
            css={css`
              background-image: url(https://patrycjapastuszka.com/wp-content/uploads/2021/10/DSC04505.jpg);
              background-size: cover;
              background-position: center;
              height: 100vh;
              width: 100%;
              position: relative;
              flex-shrink: 0;
            `}
          >
            slide 1
          </div>
          <div
            css={css`
              background-image: url(https://patrycjapastuszka.com/wp-content/uploads/2021/10/DSC04505.jpg);
              background-size: cover;
              background-position: center;
              height: 100vh;
              width: 100%;
              position: relative;
              flex-shrink: 0;
            `}
          >
            slide 2
          </div>
          <div
            css={css`
              background-image: url(https://patrycjapastuszka.com/wp-content/uploads/2021/10/DSC04505.jpg);
              background-size: cover;
              background-position: center;
              height: 100vh;
              width: 100%;
              position: relative;
              flex-shrink: 0;
            `}
          >
            slide 3
          </div>
        </div>
      </div>
    </div>
  );
}
