import React from 'react';

export default function useMedia() {
  const [media, setMedia] = React.useState('desktop');
  
  React.useEffect(() => {
    // Handler to call on window resize
  
    function handleResize() {
      if (window.innerWidth >= 992) setMedia('desktop');
      else if (window.innerWidth >= 576) setMedia('tablet');
      else if (window.innerWidth < 576) setMedia('mobile');
    }
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Call handler right away so state gets updated with initial window size
    handleResize();
    
    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Empty array ensures that effect is only run on mount
  
  return media;
}