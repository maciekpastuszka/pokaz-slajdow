import Meta from '../core/Meta';
import { css } from '@emotion/react';

export default function Layout({ preview, children }) {
  return (
    <>
      <Meta />
      <main
        css={css`
          overflow: hidden;
        `}
      >
        {children}
      </main>
    </>
  );
}
