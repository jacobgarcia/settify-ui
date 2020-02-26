export const appWidthMixin = `
  box-sizing: border-box;
  margin-left: auto;
  margin-right: auto;
  max-width: var(--app-width);
  padding-left: var(--space-500);
  padding-right: var(--space-500);
  width: 100%;
`;

export const cardShadow = (level) => `
  box-shadow: 0 2px calc(${level} * 3px) calc(-4px + calc(${level} * 1px))
      rgba(151, 151, 151, 0.8),
    0 calc(6px + calc(${level} * 2px)) calc(12px + calc(${level} * 2px)) 0
      rgba(16, 54, 66, 0.05);
`;
