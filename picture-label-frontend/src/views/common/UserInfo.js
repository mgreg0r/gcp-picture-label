import React, {useContext} from 'react';
import styled from 'styled-components';
import {UserContext} from "../../services/userContext";
import {Button} from "semantic-ui-react";

export const UserInfo = ({user}) => {
  const {logout} = useContext(UserContext);

  return (
    <Wrapper>
      <Text>
        {user}
      </Text>
      <Button primary size={'mini'} onClick={logout}>Logout</Button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 200px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding-right: 10px;
`;

const Text = styled.div`
  max-width: 100%;
  text-overflow: ellipsis;
  overflow: hidden;
`;
