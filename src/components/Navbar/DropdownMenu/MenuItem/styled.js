import styled from 'styled-components';

const DropDownItem = styled.li`
  box-sizing: border-box;
  background-color: var(--color-light-grey-100);
  color: ${({ color }) => color || 'var(--color-blue-200)'};
  display: flex;
  height: 39px;
  padding-left: 4px;
  width: 100%;
  z-index: var(--z-layer-navigation-item);

  &:hover,
  &:focus-within {
    background-color: var(--color-light-grey-200);
    border-left: var(--space-100) solid var(--color-light-grey-400);
    border-left-color: ${({ color }) => color || 'var(--color-dark-grey-100)'};
    padding-left: 0;
  }
`;

const DropDownItemLabel = styled.p`
  color: var(--color-text);
  margin: auto 0;
  padding: 0 calc(var(--space-500) / 3);
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const DropDownItemLink = styled.a`
  align-items: center;
  color: inherit;
  display: flex;
  height: 100%;
  text-decoration: none;
  width: 100%;
`;

const DropDownItemIcon = styled.i`
  padding-left: calc(var(--space-500) / 3);
`;

export { DropDownItem, DropDownItemLabel, DropDownItemLink, DropDownItemIcon };
