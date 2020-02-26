import styled from 'styled-components';

import { cardShadow } from 'utils/mixins';

const StyledDropDown = styled.div`
  lign-items: center;
  color: var(--color-text);
  cursor: pointer;
  display: flex;
  font-family: var(--family-sans-serif);
  font-size: 0.875rem;
  font-weight: var(--font-weight-regular);
  height: 44px;
  justify-content: center;
  margin-left: ${({ isAccount }) => isAccount && 'auto'};

  &:focus {
    i.mdi-chevron-up,
    i.mdi-chevron-down {
      color: var(--color-blue-100);
    }
  }
`;

const DropDownContent = styled.div`
  align-items: center;
  display: flex;
  position: relative;
  user-select: none;
  width: 100%;
  padding: 0 var(--space-200);
`;

const DropDownText = styled.span`
  margin: auto;
  overflow-x: hidden;
  overflow-y: visible;
  padding: calc(var(--space-500) / 3);
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 70%;
`;

const DropDownItems = styled.ul`
  background: var(--color-light-grey-100);
  background-color: var(--color-light-grey-100);
  list-style: none;
  padding: 0;
  position: absolute;
  top: 38px;
  z-index: var(--navigation-item-z-index);
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  min-width: ${({ isOpen }) => isOpen && '100%'};
  right: ${({ menuStartsFrom }) => menuStartsFrom === 'right' && '0'};
  left: ${({ menuStartsFrom }) => menuStartsFrom === 'left' && '0'};

  ${cardShadow(1)}
`;

export { StyledDropDown, DropDownContent, DropDownText, DropDownItems };
