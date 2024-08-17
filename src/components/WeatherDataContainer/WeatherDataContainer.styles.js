import styled from "styled-components";
import media from "../../styles/media";
import { FaExclamationTriangle } from "react-icons/fa";

export const Main = styled.main`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-content: space-between;
  height: 420px;
  margin-top: 20px;

  ${media.mobile`
    margin-top: 50px;
  `}

  > * {
    padding: 15px;
    min-height: 185px;
    border-radius: 8px;
    box-shadow: 0 4px 8px ${({ theme }) => theme.colors.cardShadow};

    ${media.mobile`
      flex-basis: 100%;
      padding: 15px 0;
      box-shadow: 0 4px 4px -4px ${({ theme }) => theme.colors.cardShadow};
      border-radius: 0;
    `}
  }
`;

export const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-basis: 100%;
  height: 100%;
  padding: 3rem;
  margin-top: 20px;
  font-size: 1.6rem;
  text-align: center;
  color: orange;
  border: 1px solid orange;
  border-radius: 8px;
  background-color: rgba(255, 165, 0, 0.1);
`;

export const ErrorIcon = styled(FaExclamationTriangle)`
  margin-bottom: 10px;
  font-size: 2.6rem;
  color: orange;
`;
