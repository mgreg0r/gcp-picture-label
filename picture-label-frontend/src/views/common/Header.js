import React from 'react';
import styled from 'styled-components';
import {UserInfo} from "./UserInfo";

export const Header = ({height, user}) => (
  <Wrapper height={height}>
    <div />
    <Title>Image Label Project</Title>
    <UserInfo user={user}/>
  </Wrapper>
);

const Wrapper = styled.div`
  width: 100vw;
  height: ${({height}) => `${height}px`};
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: black;
  color: white;
  padding-left: 200px;
`;

const Title = styled.div`
  font-size: 24px;
  font-weight: bold;
`;
