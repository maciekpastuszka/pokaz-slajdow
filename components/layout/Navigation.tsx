import { Container, Logo } from '@components/core';
import { useRef } from 'react';
import Link from 'next/link';
import { css } from '@emotion/react';
import { COLORS } from '@lib/constants';
import { Icon } from '@components/core';
import { useEffect, useState } from 'react';

function ListElement({ href = '/', light, children }) {
  return (
    <li>
      <Link href={href}>
        <a
          href={href}
          css={css`
            padding: 20px 30px;
            color: ${light ? `var(--text-color)` : COLORS['text-light']};
            text-decoration: none;
          `}
        >
          {children}
        </a>
      </Link>
    </li>
  );
}

export default function Navigation({ setTheme, theme }) {
  const [withBackground, toggleBackground] = useState(false);
  const [hidden, toggleHidden] = useState(false);
  const prevScrollPosition = useRef(0);

  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    toggleHidden(
      prevScrollPosition.current !== 0 &&
        prevScrollPosition.current < scrollPosition &&
        scrollPosition > 500
    );
    prevScrollPosition.current = scrollPosition;
    toggleBackground(scrollPosition > 0);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      css={css`
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        z-index: 1;
        padding: 20px 0;
        transform: ${hidden ? 'translateY(-100%)' : 'translateY(0)'};
        font-family: 'Playfair Display', serif;
        background: ${withBackground ? `var(--background-color)` : 'transparent'};
        transition: transform 0.5s, background-color 0.5s, border-bottom-color 0.6s;
        box-shadow: ${withBackground ? `0 -25px 35px ${COLORS['background-dark']}` : 'none'};
      `}
    >
      <Container>
        <ul
          css={css`
            display: flex;
            justify-content: center;
            list-style: none;
            margin: 0;
            align-items: center;
          `}
        >
          <ListElement light={withBackground} href="/">
            Home
          </ListElement>
          <ListElement light={withBackground} href="/">
            O mnie
          </ListElement>
          <ListElement light={withBackground} href="/">
            Blog
          </ListElement>

          <li>
            <Link href="/">
              <a href="/">
                <Logo
                  styles={css`
                    padding: 0 30px;
                    width: 350px;
                    height: auto;

                    path {
                      fill: ${withBackground ? `var(--text-color)` : COLORS['text-light']};
                    }
                  `}
                />
              </a>
            </Link>
          </li>

          <ListElement light={withBackground} href="/">
            FAQ
          </ListElement>
          <ListElement light={withBackground} href="/">
            Oferta
          </ListElement>
          <ListElement light={withBackground} href="/">
            Kontakt
          </ListElement>
        </ul>
      </Container>

      <button
        css={css`
          position: absolute;
          top: 50%;
          right: 30px;
          background: transparent;
          cursor: pointer;
          border: none;
          z-index: 2;
          transform: translateY(-50%);
          outline: none;
        `}
        onClick={() => setTheme()}
      >
        {theme === 'light' && (
          <Icon
            type="sun"
            styles={css`
              fill: ${withBackground ? `var(--text-color)` : COLORS['text-light']};

              @keyframes sunIn {
                from {
                  transform: rotate(0);
                  border: 10px solid transparent;
                }

                to {
                  transform: rotate(180deg);
                  border: 0 solid transparent;
                }
              }

              animation: sunIn 0.5s;
            `}
          />
        )}

        {theme === 'dark' && (
          <Icon
            type="moon"
            styles={css`
              fill: ${withBackground ? `var(--text-color)` : COLORS['text-light']};
              transform: rotate(45deg);

              @keyframes moonIn {
                from {
                  transform: rotate(-360deg);
                }

                to {
                  transform: rotate(45deg);
                }
              }

              animation: moonIn 0.5s;
            `}
          />
        )}
      </button>
    </nav>
  );
}
