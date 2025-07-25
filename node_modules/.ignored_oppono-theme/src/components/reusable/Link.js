import React from 'react';
import {connect, styled} from 'frontity';
import Button from '../form-components/Button';
import {size} from '../../functions/size';

export default styled(connect(Link))`
&:focus{
//outline: none;
//text-decoration: underline;
  ${Button}{
    background: #fe412d;
    text-decoration: none !important;
    .text{
      text-decoration: none !important;
    }
    svg{
      width: ${size(13)};
    }
  }
}
`;

function Link({onClick: click, libraries, actions, state, children, href, download = false, target, className = ''}) {
  const newHref = !!href ? href : '#';
  const isInternal = newHref.startsWith(state.source.api.replace('/wp-json', '')) || newHref.startsWith('/') || newHref.startsWith('#') || newHref.startsWith('tel:') || newHref.startsWith('mailto:') || newHref.startsWith(state.frontity.url);
  let pathname = isInternal && !newHref.startsWith('tel:') && !newHref.startsWith('mailto:') ? libraries.source.normalize(newHref) : newHref;
  let current = state.router.link === pathname;
  
  const onClick = event => {
    if ((!target || target === '_self') && isInternal && !newHref.startsWith('tel:') && !newHref.startsWith('mailto:')) {
      event.preventDefault();
    }
    
    if ((!target || target === '_self') && isInternal) {
      window.scrollTo(0, 0);
      if (!newHref.startsWith('tel:') && !newHref.startsWith('mailto:') && pathname !== state.router.link) {
        // actions.themeLoading.animationStart();
        setTimeout(() => actions.router.set(pathname), 100);
        
      }
    }
    click && click();
  };
  return (
    <a
      onFocus={() => actions.source.fetch(pathname)}
      onMouseEnter={() => actions.source.fetch(pathname)}
      download={download}
      href={pathname} target={target ? target : (isInternal ? undefined : '_blank')} className={`${current ? 'current ' : ''}${className}`} onClick={onClick}>
      {children}
    </a>
  );
}