import React from 'react';
import {styled} from 'frontity';
import {size} from '../../functions/size';

const Container = ({className, children}) => {
  return (
    <div className={className + ' container'}>
      {children}
    </div>
  );
};

export default styled(Container)`
margin: 0 auto;
width: 100%;
padding: 0 ${size(25)};

@media(min-width: 991.98px){
  padding-left: ${size(55)};
  padding-right: ${size(55)};
}
`;
