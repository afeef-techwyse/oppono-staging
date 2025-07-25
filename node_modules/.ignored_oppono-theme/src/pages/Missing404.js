import React from 'react';
import { connect, styled } from 'frontity';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { size } from '../functions/size';
import MegaloNum_1 from '../assets/images/fly-image-6.png';
import MegaloNum_2 from '../assets/images/last-step.png';
import FlyingObj from '../components/reusable/FlyingObj';
import classnames from 'classnames';


const Missing404 = ({ className, state, actions }) => {
    React.useEffect(() => {
        actions.theme.setActiveTheme('blue-theme');
    }, []);
    return (
        <div className={classnames(className)}>
            <Header state={state} hasSubMenu={false} />
            <div className="wrapper-404">
                {[
                    {
                        imageUrl: MegaloNum_1,
                        left: '80%',
                        level: 1,
                        top: '70%',
                        type: 'image',
                        width: 9,
                        alt: 'alt',
                    },
                    {
                        imageUrl: MegaloNum_2,
                        left: '20%',
                        level: 1,
                        top: '30%',
                        type: 'image',
                        width: 9,
                        alt: 'alt',
                    }].map((obj, index) => <FlyingObj
                        key={index}
                        width={+obj.width}
                        imageUrl={obj.imageUrl}
                        alt={obj.alt}
                        type={obj.type}
                        level={+obj.level}
                        top={obj.top}
                        left={obj.left}
                    />)}
                <h1 className={'primary'}>404</h1>
                <p className={'primary'}>Ooops! Looks like this page doesn't exist.</p>
            </div>
            <Footer />
        </div>
    );
};

export default styled(connect(Missing404))`
  height: calc(var(--vh, 1vh) * 100);
  background-size: cover;
  background-position: center;

  .wrapper-404 {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 80%;

    h1 {
      font-size: ${size(180)};
      @media (max-width: 991.98px) {
        font-size: ${size(140)};
      }
      @media (max-width: 575.98px) {
        font-size: ${size(100)};
      }
    }

    p {
      font-size: ${size(22)};
      max-width: 85rem;
      text-align: center;

      span {
        font-size: ${size(19)};
        opacity: .5;
        font-style: italic;
      }
    }
  }
`;
