export default function mq(breakpoint, content) {
  const breakpoints = {
    small: '768px',
    medium: '996px',
    large: '1200px',
  };

  return `@media only screen and (min-width: ${breakpoints[breakpoint]}) {
  ${content.styles}
  }`;
}
