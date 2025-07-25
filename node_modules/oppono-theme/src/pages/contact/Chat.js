import React from 'react';
import {connect, styled} from 'frontity';
import Container from '../../components/reusable/Container';
import {size} from '../../functions/size';
import chat_1 from '../../assets/images/chat-obj-1.png';
import chat_2 from '../../assets/images/chat-obj-2.png';
import chatbox from '../../assets/images/chatbox.png';
import FlyingObjsContainer from '../../components/reusable/FlyingObjsContainer';

const Chat = (props) => {
  return (
    <div className={props.className}>
      <FlyingObjsContainer childrenList={
        [
          {
            imageUrl: chat_2,
            left: '10%',
            level: 1,
            top: '68%',
            type: 'image',
            width: 15,
            alt: 'alt',
          },
          {
            imageUrl: chat_1,
            left: '70%',
            level: 1,
            top: '30%',
            type: 'image',
            width: 10,
            alt: 'alt',
          }]}/>
      <Container>
        <h1 className={'contact-title'}>This chatbot can answer the most FAQ</h1>
        <img className={'chatbox'} src={chatbox} alt={'chatbox'}/>
      </Container>
    </div>
  );
};

export default styled(connect(Chat))`
  width: 100%;
  height: 100%;
  padding-top: ${size(200)};
  @media (max-width: 575.98px) {
    padding-top: ${size(113)};
  }

  .chatbox {
    margin-left: auto;
    display: block;
    object-fit: contain;
    max-width: 100%;
    @media (max-width: 991.98px) {
      margin: ${size(78)} auto 0;
    }
    @media (max-width: 991.98px) {
      margin: ${size(47)} auto 0;
    }
  }
`;