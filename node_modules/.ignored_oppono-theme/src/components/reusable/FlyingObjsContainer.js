import React from 'react';
import {styled} from 'frontity';
import PropTypes from 'prop-types';
import gsap from 'gsap';
import useCombinedRefs from '../../hooks/useCombinedRefs';
import FlyingObj from './FlyingObj';

const FlyingObjsContainer = React.forwardRef(({className, childrenList}, forwardedRef) => {
  
  const innerRef = React.useRef(null);
  const combinedRef = useCombinedRefs(forwardedRef, innerRef);
  
  const [disableFloating, setDisableFloating] = React.useState(true);
  
  React.useEffect(() => {
    gsap.from(combinedRef.current.children, {
      duration: 1,
      y: (_, target) => `+=${window.innerHeight * Math.abs(+target.dataset.level)}`,
      onComplete: () => setDisableFloating(false),
      delay: 1,
      ease: 'power3.out',
    });
  }, []);
  return (
    <div ref={combinedRef} className={`flying-objs-container ${className}`}>
      {childrenList.map((child, childIndex) => <FlyingObj disableFloating={disableFloating} key={childIndex} {...child}/>)}
    </div>
  );
});

FlyingObjsContainer.propTypes = {
  className: PropTypes.string,
  childrenList: PropTypes.arrayOf(PropTypes.shape(FlyingObj.propTypes)),
};

export default styled(FlyingObjsContainer)`
position: absolute;
pointer-events: none;
z-index: 0;
height: 100%;
width: 100%;
max-width: 100vw!important;
top: -74px;
@media(max-width: 575.98px){
  display: none;
}
`;