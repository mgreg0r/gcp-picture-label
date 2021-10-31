import React, {useContext} from 'react';
import styled from 'styled-components';
import {UserContext} from "../../services/userContext";
import {Header} from "./Header";

const HEADER_HEIGHT = 60;

export const AppContainer = ({children}) => {
  const {user} = useContext(UserContext);

  if(!user) return null;

  return (
    <Wrapper>
      <Header height={HEADER_HEIGHT} user={user} />
      <ContentWrapper>
        {children}
      </ContentWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;

const ContentWrapper = styled.div`
  width: 100vw;
  height: calc(100vh - ${HEADER_HEIGHT}px);
`;
