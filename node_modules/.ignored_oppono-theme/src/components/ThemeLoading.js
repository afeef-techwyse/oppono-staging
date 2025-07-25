import React from 'react';
import {connect, styled} from 'frontity';
import {gsap} from 'gsap';
import SpriteSheet from './reusable/SpriteSheet';
import introLogoSrc from '../assets/sprite-sheets/intro-logo.png';
import {size} from '../functions/size';
import BGLightGreen from '../assets/images/bg-light-green.png';


const ThemeLoading = ({className, actions, state}) => {
  const logoAnimationDuration = 2;
  const [paused, setPaused] = React.useState(true);
  const animationRef = React.useRef(null);
  React.useEffect(() => {
    state.themeLoading.loading &&
    gsap.timeline()
      .call(() => {
        setPaused(false);
      })
      .to(animationRef.current, {
        autoAlpha: 1,
        duration: 0.1,
      })
      .to(animationRef.current, {
        autoAlpha: 0,
        duration: .5,
      }, `+=${logoAnimationDuration}`)
      .call(() => {
        setPaused(true);
        actions.themeLoading.animationDone();
      });
  }, [state.themeLoading.loading]);
  return (
    <div ref={animationRef} className={className}>
      <SpriteSheet
        reset={paused}
        paused={paused} duration={logoAnimationDuration} repeatDelay={10}
        className={'intro-logo'} imageUrl={introLogoSrc} frames={52}
        width={size(323)} alt={'Intro Logo'} frame_x={653} frame_y={500}
      />
    </div>
  );
};

export default styled(connect(ThemeLoading))`
width: 100%;
height: 100%;
display: flex;
justify-content: center;
align-items: center;
position: fixed;
z-index: 100000000;
top: 0;
left: 0;
visibility: hidden;
opacity: 0;
pointer-events: none;
background-size: cover;
background-repeat: no-repeat;
background-position: top center;
background-attachment: fixed;
background-image: url(${BGLightGreen});
`;