import React, {useCallback, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import styled from 'styled-components';
import {AppContainer} from "../common/AppContainer";
import {Button, Segment, Loader} from "semantic-ui-react";
import {showError} from "../../services/errors";
import {get, post} from "../../services/api";

const IMAGE_SIZE = 300;

const useImageData = () => {
  const [imageData, setImageData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const {imageId} = useParams();

  useEffect(() => {
    setIsLoading(true);
    get(`/image/${imageId}`).then((res) => {
      setImageData(res.data);
      setIsLoading(false);
    }).catch(err => {
      console.log(err);
      setIsLoading(false);
      showError('Image was not found');
    });
  }, []);

  return {
    imageData,
    isImageLoading: isLoading
  }
};

export const ImageView = () => {
  const {imageData, isImageLoading} = useImageData();
  const [description, setDescription] = useState('');
  const [isLabelLoading, setIsLabelLoading] = useState(false);

  const generateLabel = () => {
    if(!imageData) return;
    setIsLabelLoading(true);
    post(`/generate/${imageData.id}`).then((res) => {
      setDescription(res.data.join(' / '));
      setIsLabelLoading(false);
    }).catch(err => {
      console.log(err);
      showError('Could not generate labels for this image');
      setIsLabelLoading(false);
    })
  };

  return (
    <AppContainer>
      {
        isImageLoading ?
          <Loader size='big'>Loading</Loader>
          :
          (imageData ? (
            <Wrapper>
              <Image src={imageData.src}/>
              <DescriptionPanel>
                {description ? (
                  description
                ) : (
                  <Button primary onClick={generateLabel} loading={isLabelLoading}>Generate label</Button>
                )}
              </DescriptionPanel>
            </Wrapper>
          ) : null)
      }
    </AppContainer>
  )
};

const Wrapper = styled.div`
  display: flex;
`;

const Image = styled.img`
  height: ${IMAGE_SIZE}px;
  width: ${IMAGE_SIZE}px;
`;

const DescriptionPanel = styled(Segment)`
  margin: 40px !important;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
