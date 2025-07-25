import React from 'react';
import {styled} from 'frontity';
import {size} from '../../functions/size';


const MegaloNum = ({className, children}) => {
  return (
    <div className={className}>
      {children}
    </div>
  );
};

export default styled(MegaloNum)`
margin-bottom: ${size(50)};
z-index:1;
position: relative;
@media(max-width: 575.98px){
  margin-bottom: ${size(30)};;
}
.number{
color: #D2F5E9;
font-size: ${size(210)};
letter-spacing: 0;
text-align: center;
line-height: 100%;
@media(max-width: 991.98px){
  font-size: ${size(180)};
}
@media(max-width: 575.98px){
  font-size: ${size(120)};
}
}
.form-headline-1{
  color: #D2F5E9;
}
`;
