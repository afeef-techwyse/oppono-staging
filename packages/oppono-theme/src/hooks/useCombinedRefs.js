import React from 'react';

export default function useCombinedRefs(...refs) {
  const targetRef = React.useRef();
  
  React.useEffect(() => {
    refs.forEach(ref => {
      if (!ref) return;
      
      if (typeof ref === 'function') {
        ref(targetRef.current);
      }
      else {
        ref.current = targetRef.current;
      }
    });
  }, [refs]);
  
  return targetRef;
}