import Meta from './Meta';
import { Global, css } from '@emotion/react';
import { useState } from 'react';
import { Navigation } from '@components/layout';
import { COLORS } from '@lib/constants';

export default function Layout({ preview, children }) {
  const [theme, setTheme] = useState('light');

  return (
    <>
      <Meta />

      <main
        style={
          {
            '--background-color':
              theme === 'dark' ? COLORS['background-dark'] : COLORS['background-light'],
            '--text-color': theme === 'dark' ? COLORS['text-light'] : COLORS['text-dark'],
            '--slider-opacity': theme === 'dark' ? '0.6' : '1',
          } as React.CSSProperties
        }
        css={css`
          overflow: hidden;
          background-color: var(--background-color);
          color: var(--text-color);
          transition: background-color 0.3s;
        `}
      >
        <Navigation theme={theme} setTheme={() => setTheme(theme === 'dark' ? 'light' : 'dark')} />
        {children}
      </main>
    </>
  );
}
