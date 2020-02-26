import styled from 'styled-components';

import { appWidthMixin } from '@credijusto/ui-components';

import Logo from '../Logo';

const StyledLogo = styled(Logo)`
  cursor: pointer;
  height: 30px;
  line-height: 0;
  padding: 0;
  padding-right: var(--space-500);

  &:hover {
    opacity: 0.8;
  }
`;

const StyledNavbar = styled.nav`
  background-color: var(--color-light-grey-100);
  box-shadow: 0 2px 4px 0 rgba(224, 224, 224, 0.5);
  display: block;
  height: var(--navbar-height);
  left: 0;
  position: ${({ isRelative }) => (isRelative ? 'relative' : 'fixed')};
  top: 0;
  width: 100%;
  z-index: var(--navigation-z-index);
`;

const NavbarContainer = styled.div`
  align-items: center;
  display: flex;
  height: 100%;
  width: 100%;
  line-height: 1;

  ${appWidthMixin}

  max-width: ${({ fluid }) => fluid && 'none'};
`;

const ActionItems = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  height: 100%;
  padding-left: var(--size-300);
  position: relative;
`;

export { StyledNavbar, NavbarContainer, ActionItems, StyledLogo };
