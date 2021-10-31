import React, {useContext} from 'react';
import GoogleLogin from "react-google-login";

import * as Styled from './styles';
import {GOOGLE_CLIENT_ID} from "../../config";
import {UserContext} from "../../services/userContext";
import {post} from "../../services/api";


const handleLogin = callback => async googleData => {
  const res = await post('/auth/login', {
    token: googleData.tokenId
  });
  callback();
};

export const AuthView = () => {
  const {authenticate} = useContext(UserContext);

  return (
    <Styled.Wrapper>
      <Styled.LoginSegment>
        <Styled.Title>
          Image Label Project
        </Styled.Title>
        <Styled.Description>
          You need to log in to continue.
        </Styled.Description>
        <GoogleLogin
          clientId={GOOGLE_CLIENT_ID}
          buttonText="Log in with Google"
          onSuccess={handleLogin(authenticate)}
          onFailure={handleLogin(authenticate)}
          cookiePolicy={'single_host_origin'}
        />
      </Styled.LoginSegment>
    </Styled.Wrapper>
  );
};
