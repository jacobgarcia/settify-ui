import React from 'react';
import styled, { css } from 'styled-components';

import { Icon } from '@credijusto/ui-components';

export const StyledTable = styled.table`
  border-collapse: collapse;
  overflow-x: scroll;
  width: 100%;

  .link {
    color: var(--color-green-500);
  }
`;

export const StyledRow = styled.tr`
  & + & {
    border-top: 1px solid var(--color-light-grey-200);
  }
  transition: background-color 70ms ease-in-out;
  &:hover {
    background-color: var(--color-yellow-100);
  }
`;

export const StyledWrapper = styled.div`
  overflow: auto;
  height: ${(props) => props.height};
  max-height: ${(props) => props.maxHeight};
`;

export const StyledHead = styled.thead`
  background-color: var(--color-light-grey-100);
  ${(props) =>
    props.isHeadless
      ? css`
          display: none;
        `
      : ''}
`;

const cellBase = (props) => `
  font-family: var(--family-sans-serif);
  font-size: 1rem;
  font-weight: var(--font-weight-regular);
  line-height: 1.6;
  box-sizing: border-box;
  color: var(--color-text);
  padding: var(--space-400) var(--space-500);

  &:first-child {
    padding-left: var(--space-400);
  }
  &:last-child {
    padding-right: var(--space-400);
  }
  text-align: ${props.textAlign};

  ${
    props.isCompact
      ? css`
          font-size: 0.875rem;
          padding: var(--space-300) var(--space-200);
        `
      : ''
  }
`;

export const StyledCellHead = styled.th`
  ${(props) => cellBase(props)}
  color: var(--color-text-light);
  cursor: default;
  flex-direction: column;
  font-size: 0.75rem;

  ${(props) =>
    props.isSortable
      ? css`
          cursor: pointer;
          transition: color 70ms ease-in-out;

          &:hover,
          &:focus {
            color: var(--color-text);
          }
        `
      : ''}

  ${(props) =>
    props.isSorted
      ? css`
          color: var(--color-text);
          font-weight: var(--font-weight-semibold);
        `
      : ''}
`;

export const StyledCellHeadContainer = styled.div`
  align-items: center;
  display: inline-flex;
  flex-direction: ${(props) => props.flexDirection};
`;

export const StyledCellHeadIconsContainer = styled.div`
  display: flex;
  flex-direction: column-reverse;
`;

export const StyledSortIcon = styled(Icon)`
  line-height: 7px;
  margin-left: var(--space-100);
  margin-right: var(--space-100);
  ${(props) =>
    props.isActive
      ? css`
          color: var(--color-text);
        `
      : ''}

  ${(props) =>
    props.isInactive
      ? css`
          color: var(--color-text-light);
        `
      : ''}
`;

export const StyledCell = styled.td`
  ${(props) => cellBase(props)}

  ${(props) =>
    props.isDate
      ? css`
          font-feature-settings: 'tnum', 'salt';
          white-space: nowrap;
        `
      : ''}
  ${(props) =>
    props.isTotal
      ? css`
          background-color: var(--color-calm-blue-100);
          border-top: 1px solid var(--color-calm-blue-400);

          &:first-child {
            font-weight: var(--font-weight-medium);
          }
        `
      : ''}
  ${(props) =>
    props.isNumber
      ? css`
          font-feature-settings: 'tnum', 'salt', 'case';
          white-space: nowrap;
        `
      : ''}
  ${(props) =>
    props.isCurrency
      ? css`
          font-feature-settings: 'tnum', 'salt', 'case';
          white-space: nowrap;
          ${props.isNull
            ? ''
            : css`
                &::first-letter {
                  color: var(--color-light-grey-600);
                  margin-right: var(--space-100);
                }
              `}
        `
      : ''}
    ${(props) =>
      props.isPercentage
        ? css`
            font-feature-settings: 'tnum', 'salt', 'case';
            white-space: nowrap;
            ${props.isNull
              ? ''
              : css`
                  &:after {
                    color: var(--color-light-grey-600);
                    content: '%';
                    margin-left: var(--space-100);
                  }
                `}
          `
        : ''}
    ${(props) =>
      props.isNull
        ? css`
            color: var(--color-text-light);
            cursor: default;
            font-feature-settings: 'tnum', 'salt', 'case';
            letter-spacing: 2px;
          `
        : ''};
`;

/**
 * Avoid passin down strange props to Link becuase React warns us
 */
export const ColouredLink = styled(({ linkColor, ...rest }) => {
  const { to, children } = rest;
  return (
    <StyledLink href={to} linkColor={linkColor}>
      {children}
    </StyledLink>
  );
})`
  &:link {
    color: ${(props) => props.linkColor};
  }
`;

export const StyledLink = styled.a`
  color: ${(props) => props.linkColor};
`;
