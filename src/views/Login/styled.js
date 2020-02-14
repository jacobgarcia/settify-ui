import styled from 'styled-components';
import { Box } from '@credijusto/ui-components';
import Logo from 'components/Logo';

const InputSide = styled(Box)`
  background-color: #f4f6f9;
  justify-content: center;
  align-items: center;
  padding: var(--space-500);
  box-sizing: border-box;

  form {
    width: 100%;
    max-width: 400px;
  }
`;

const LoginContainer = styled(Box)`
  min-height: 100%;
  flex-direction: column;

  @media (min-width: 800px) {
    flex-direction: row;
  }
`;

const LoginHeader = styled.h1`
  font-family: var(--family-sans-serif);
  font-weight: 700;
  font-size: 48px;
  margin: 0;
  color: var(--credijusto-grey-dark);
  cursor: default;
  line-height: 1;
  text-align: left;
  width: 100%;
`;

const LoginSubtitle = styled.p`
  font-family: var(--family-sans-serif);
  font-weight: 400;
  line-height: 1.5;
  cursor: default;
  font-size: 1rem;
  text-align: left;
  width: 100%;
`;

const StyledLeftPanel = styled(Box)`
  flex: 1;

  ${LoginHeader},
  ${LoginSubtitle} {
    max-width: 400px;
    margin: 0 auto;
  }
`;

const StyledLogo = styled(Logo)`
  position: absolute;
  top: var(--space-500);
  left: var(--space-500);
  height: 44px;
`;

export {
  InputSide,
  LoginContainer,
  LoginHeader,
  LoginSubtitle,
  StyledLeftPanel,
  StyledLogo,
};
