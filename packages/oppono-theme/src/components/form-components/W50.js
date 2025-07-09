import React from 'react';
import {styled} from 'frontity';
import {size} from '../../functions/size';


const W50 = ({className, children}) => {
  return (
    <div>
      <div className={className}>
        {children}
      </div>
    </div>
  );
};

export default styled(W50)`
display: flex;
justify-content: space-between;
margin-right: ${size(-30)};
margin-left: ${size(-30)};
flex-wrap: wrap;
align-items: stretch;
align-content: flex-start;
label{
  height: 100%;
  input{
   margin-top: auto;
  }
}
@media(max-width: 991.98px){
  margin: 0 auto;
  flex-direction: column;
  width: 100%;
  flex: 1 1 100%;
}
>* {
  margin-right: ${size(30)};
  margin-left: ${size(30)};
  width: calc(50% - ${size(2 * 30)});
  flex: 1 1 calc(50% - ${size(2 * 30)});
  @media(max-width: 991.98px){
     width: 100%;
     padding: 0;
     margin-left: 0;
  }
}
`;