import styled, { css } from 'styled-components';

const PRIMARY_STYLE = css`
  background-color: var(--color-primary);
  color: var(--color-light-grey-100);

  &:hover,
  &:active {
    background-color: var(--color-primary-dark);
  }
  &:focus {
    :before {
      border-color: var(--color-primary);
    }
  }
  &:disabled {
    background-color: var(--color-primary-lighter);
    color: var(--color-neutral--light);
  }
`;

const SECONDARY_STYLE = css`
  background-color: var(--color-light-grey-100);
  border: 1px solid var(--color-neutral--dark);
  color: var(--color-neutral--dark);

  &:hover,
  &:active {
    border: 0;
    background-color: var(--color-neutral--lighter);
  }
  &:focus {
    :before {
      border-color: var(--color-neutral--dark);
    }
  }
  &:disabled {
    border: 1px solid var(--color-neutral--light);
    color: var(--color-neutral--light);
  }
`;

const COMPLEMENTARY_STYLE = css`
  background-color: var(--color-neutral);
  color: var(--color-light-grey-100);

  &:hover,
  &:active {
    background-color: var(--color-neutral--dark);
  }
  &:focus {
    :before {
      border-color: var(--color-neutral);
    }
  }
  &:disabled {
    background-color: var(--color-neutral--lighter);
    color: var(--color-neutral--muted);
  }
`;

const WARNING_STYLE = css`
  background-color: var(--color-alert);
  color: var(--color-light-grey-100);

  &:hover,
  &:active {
    background-color: var(--color-alert--dark);
  }
  &:focus {
    :before {
      border-color: var(--color-alert);
    }
  }
  &:disabled {
    background-color: var(--color-alert--lighter);
    color: var(--color-alert--muted);
  }
`;

const DESTRUCTIVE_STYLE = css`
  background-color: var(--color-destructive);
  color: var(--color-light-grey-100);

  &:hover,
  &:active {
    background-color: var(--color-destructive--dark);
  }
  &:focus {
    :before {
      border-color: var(--color-destructive);
    }
  }
  &:disabled {
    background-color: var(--color-destructive--lighter);
    color: var(--color-destructive--muted);
  }
`;

const BUTTON_STYLES = {
  primary: PRIMARY_STYLE,
  secondary: SECONDARY_STYLE,
  complementary: COMPLEMENTARY_STYLE,
  destructive: DESTRUCTIVE_STYLE,
  warning: WARNING_STYLE,
};

const StyledButton = styled.button`
  border: none;
  border-radius: ${(props) => (props.rounded ? '32px' : '4px')}
  box-sizing: border-box;
  cursor: pointer;
  display: inline-block;
  font-family: var(--family-sans-serif);
  font-weight: bold;
  line-height: 1;
  text-align: center;
  transition: background 120ms, border 120ms, box-shadow 120ms ease-in-out;
  user-select: none;
  white-space: nowrap;
  width: auto;
  font-size: 1rem;
  font-weight: var(--font-weight-medium);
  min-height: 36px;
  padding: var(--space-200) var(--space-400);
  height: 40px;
  min-width: 120px;
  position: relative;

  &:hover:not(:active) {
    &:hover:not(:disabled) {
      box-shadow: 0px 4px 8px rgba(31, 42, 69, 0.34),
        0px 1px 2px rgba(45, 45, 72, 0.4);
    }
  }
  &:focus {
    outline: 0;

    &:before {
      content: '';
      position: absolute;
      width: calc(100% + 4px);
      height: calc(100% + 4px);
      border: 1px solid var(--color-neutral--dark);
      right: -3px;
      top: -3px;
      border-radius: 5px;
    }
  }

  &:disabled {
    cursor: not-allowed;
    pointer-events: none;
  }

  ${(props) => BUTTON_STYLES[props.kind] || BUTTON_STYLES.primary}
`;

export default StyledButton;
