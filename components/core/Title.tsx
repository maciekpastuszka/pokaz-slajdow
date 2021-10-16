import { css } from '@emotion/react';
import mq from '@utils/mq';

interface ITitle {
  size: '1' | '2' | '3' | '4';
  type: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span' | 'div';
  children: React.ReactChildren;
}

export default function Title({ children, size, type: Type = 'span' }: ITitle) {
  const sizes = {
    1: '4em',
    2: '3em',
    3: '2em',
  };

  return (
    <Type
      css={css`
        font-size: 2rem;
        margin: 0 0 20px 0;

        ${mq(
          'small',
          css`
            font-size: 3rem;
          `
        )}

        ${mq(
          'medium',
          css`
            font-size: ${sizes[size] || '1em'};
          `
        )}
      `}
    >
      {children}
    </Type>
  );
}
