import Meta from './Meta';
import { css } from '@emotion/react';
import { useState } from 'react';
import { Icon } from '@components/core';

export default function Layout({ preview, children }) {
  const [theme, setTheme] = useState('light');

  return (
    <>
      <Meta />
      <main
        style={{
          '--background-color': theme === 'dark' ? '#222222' : '#ffffff',
          '--text-color': theme === 'dark' ? '#f3f3f3' : '#2c2c2c',
        }}
        css={css`
          overflow: hidden;
          background-color: var(--background-color);
          color: var(--text-color);
        `}
      >
        {children}

        <button
          css={css`
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: transparent;
            cursor: pointer;
            border: none;

            &:hover svg {
              transform: rotate(90deg);
            }
          `}
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        >
          <Icon
            type="sun"
            styles={css`
              fill: var(--text-color);
              transition: transform 0.3s;
            `}
          />
        </button>
      </main>
    </>
  );
}
