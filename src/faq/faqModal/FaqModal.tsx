import React, {useEffect, useState} from 'react';
import DislikeIcon from '../../components/icons/DislikeIcon';
import LikeIcon from '../../components/icons/LikeIcon';
import Colors from '../../styles/colors';
import {
  ButtonRow,
  ButtonsContainer,
  CloseButton,
  CloseButtonText,
  ConfirmButton,
  ConfirmButtonText,
  HighlightedText,
  LikeDislikeButton,
  LikeDislikeCount,
  LikeDislikeView,
  ModalBackground,
  ModalContainer,
  ModalMessage,
  ModalTitle,
  ModalView,
} from './FaqModal.styles';
import {Text} from 'react-native';
import {likeDislikeFaq} from '../../axios/api/faq';
import {useDispatch} from 'react-redux';
import {setLoading} from '../../redux/slices/LoadingSlice';

type defaultModalProps = {
  faq: any;
  visible: boolean;
  setVisible: any;
};

function FaqModal({faq, visible, setVisible}: defaultModalProps) {
  const [likedOrDisliked, setLikedOrDisliked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [dislikeCount, setDislikeCount] = useState(0);
  
  const dispatch = useDispatch();

  const formatMessage = (content: string) => {
    if (!content) {
      return '';
    }
    const splitContent = content.split('*');
    return (
      <>
        {splitContent.map((item, index) => {
          if (index % 2 === 0) {
            return <Text key={index}>{item}</Text>;
          } else {
            return (
              <HighlightedText numberOfLines={1} key={index}>
                {item}
              </HighlightedText>
            );
          }
        })}
      </>
    );
  };


  const handleLike = async (likeOrDislike: boolean) => {
    dispatch(setLoading(true));
    const response = await likeDislikeFaq(faq.id, likeOrDislike);
    if (response) {      
      if (response.code === 204) {
        setLikedOrDisliked(true);
        if (likeOrDislike) {          
          setLikeCount(likeCount + 1);
        } else {
          setDislikeCount(dislikeCount + 1);
        }
      }
    }
    dispatch(setLoading(false));
  };

  const handleClose = () => {
    setVisible(false);
    setLikedOrDisliked(false);
  }

  useEffect(() => {
    setLikeCount(faq.likeCount);
    setDislikeCount(faq.dislikeCount);
  }, [faq]);

  return (
    <ModalView
      visible={visible}
      animationType="none"
      transparent={true}
      onRequestClose={setVisible}>
      <ModalBackground>
        <ModalContainer>
          <CloseButton onPress={handleClose}>
            <CloseButtonText>x</CloseButtonText>
          </CloseButton>
          <ModalTitle>{faq.title}</ModalTitle>
          <ModalMessage>{formatMessage(faq.content)}</ModalMessage>
          <ButtonsContainer>
            <ButtonRow>
              <LikeDislikeView>
                <LikeDislikeButton onPress={() => handleLike(true)} disabled={likedOrDisliked}>
                  <LikeIcon fill={Colors.green} />
                </LikeDislikeButton>
                <LikeDislikeCount>{likeCount}</LikeDislikeCount>
              </LikeDislikeView>
              <LikeDislikeView>
                <LikeDislikeButton onPress={() => handleLike(false)} disabled={likedOrDisliked}>
                  <DislikeIcon fill={Colors.red} />
                </LikeDislikeButton>
                <LikeDislikeCount>{dislikeCount}</LikeDislikeCount>
              </LikeDislikeView>
            </ButtonRow>
            <ConfirmButton onPress={handleClose}>
              <ConfirmButtonText>FECHAR</ConfirmButtonText>
            </ConfirmButton>
          </ButtonsContainer>
        </ModalContainer>
      </ModalBackground>
    </ModalView>
  );
}

export default FaqModal;
