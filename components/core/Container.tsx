import { css } from '@emotion/react';

export default function Container({ children }) {
  return (
    <div
      css={css`
        padding: 0 20px;
        margin: 0 auto;
        max-width: 1200px;
      `}
    >
      {children}
    </div>
  );
}
