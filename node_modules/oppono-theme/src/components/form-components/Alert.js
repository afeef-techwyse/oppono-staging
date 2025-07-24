import React from 'react';
import {styled} from 'frontity';
import Container from '../reusable/Container';
import {size} from '../../functions/size';
import {P} from './StyledComponent';


const Alert = ({className, children}) => {
  return (
    <div className={'form-wide-container'}>
      <Container>
        <div className={className}>
          {children}
        </div>
      </Container>
    </div>
  );
};

export default styled(Alert)`
display: flex;
margin-bottom: ${size(80)};
 @media(max-width: 575.98px){
   flex-direction: column;
   >div:not(:last-child){
    margin-bottom: ${size(23)};
   }
 }
 .form-group{
    margin-top: ${size(55)};
    @media(max-width: 991.98px){
      margin-bottom: 40px;
    }
    @media(max-width: 768.98px){
      margin-top: 0;
    }
 }
.form-group{
  margin-top: ${size(25)};
  @media(max-width: 991.98px){
     margin-top: ${size(20)};
  }
  @media(max-width: 575.98px){
     margin-top: ${size(25)};
  }
}
.invalid{
  margin-bottom: ${size(40)};
}
${P.F29}{
margin-bottom: 15px;
}
.col-4{
  width: 30%;
  padding-right: 5rem;
  @media(max-width: 991.98px){
    width: 40%;
  }
  @media(max-width: 575.98px){
    width: 100%;
  }
}
.col-6{
  width: 70%;
  @media(max-width: 991.98px){
    width: 60%;
  }
  @media(max-width: 575.98px){
    width: 100%;
  }
}
`;