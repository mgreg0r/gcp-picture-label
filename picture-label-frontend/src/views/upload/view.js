import React, {useCallback, useRef} from 'react';
import {useHistory} from 'react-router-dom';
import {AppContainer} from "../common/AppContainer";
import {Button} from "semantic-ui-react";
import styled from 'styled-components';
import {showError} from "../../services/errors";
import {post} from "../../services/api";

export const UploadView = () => {
  const uploadRef = useRef();
  const history = useHistory();

  const upload = useCallback((ev) => {
    const file = ev.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then((res) => {
      history.push(`/image/${res.data.imageId}`);
    }).catch(err => {
      showError('Could not upload this image');
    });
  }, [history]);

  return (
    <AppContainer>
      <Wrapper>
        <Button
          primary
          content="Upload image"
          labelPosition="left"
          icon="file"
          onClick={() => uploadRef.current.click()}
        />
        <input
          ref={uploadRef}
          type="file"
          hidden
          onChange={upload}
        />
      </Wrapper>
    </AppContainer>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
