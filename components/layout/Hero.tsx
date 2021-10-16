import Container from '../core/Container';
import Link from 'next/link';
import { css } from '@emotion/react';

export default function Hero({ content }) {
  return (
    <Container>
      <div
        css={css`
          padding: 20px;
          color: #68bf68;
          margin: 10px;
        `}
      >
        emotion
      </div>
    </Container>
  );
}
