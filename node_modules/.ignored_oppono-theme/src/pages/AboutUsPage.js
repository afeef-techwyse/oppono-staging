import gsap from "gsap";
import React from "react";

import { connect, styled } from "frontity";

import Container from "../components/reusable/Container";
import ProductsFeature from "../components/ProductsFeature";
import featureImg from "../assets/images/product-feature-1.png";
import ProductsPortion from "../components/form-components/ProductsPortion";
import classnames from "classnames";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { size } from "../functions/size";

const ProductFeaturesContainer = styled.div`
  > div:nth-of-type(even) {
    flex-direction: row-reverse;

    .image > .image-container {
      margin-right: 0 !important;
      margin-left: auto;

      @media (max-width: 998px) {
        margin-right: auto !important;
      }
    }
  }
  > div:nth-of-type(odd) {
    flex-direction: row;

    .image > div {
      margin-left: 0 !important;
      @media (max-width: 998px) {
        margin-left: auto !important;
      }
    }
  }

  div:nth-first-child() {

  }
`;

const AspectRation = styled.picture`
  width: 100%;
  height: 0;
  padding-top: ${({ ratio }) => ratio * 100}%;
  display: block;
  position: relative;
  img {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    object-fit: contain;
  }
`;


const AboutUsPage = ({ className, libraries, state, actions }) => {
    const imageRef = React.useRef(null);
    const data = state.source.get("/what-we-do/");
    const page =
        data.isReady && !data.isError ? state.source[data.type][data.id].acf : {};
    const Html2React = libraries.html2react.Component;
    React.useEffect(() => {
        actions.theme.setActiveTheme("dark-green-theme");
        actions.theme.setSubHeader({});
    }, []);

    function random(min, max) {
        const delta = max - min;
        return (direction = 1) => (min + delta * Math.random()) * direction;
    }

    const randomX = random(30, 60);
    const randomY = random(30, 60);
    const randomTime = random(9, 14);

    React.useEffect(() => {
        function moveX(target, direction) {
            target.current &&
                gsap.to(target.current, {
                    duration: randomTime(),
                    x: randomX(direction),
                    ease: "sine.inOut",
                    onComplete: moveX,
                    onCompleteParams: [target, direction * -1],
                });
        }
        function moveY(target, direction) {
            target.current &&
                gsap.to(target.current, {
                    duration: randomTime(),
                    y: randomY(direction),
                    ease: "sine.inOut",
                    onComplete: moveY,
                    onCompleteParams: [target, direction * -1],
                });
        }

        moveX(imageRef, Math.random() < 0.5 ? -1 : 1);
        moveY(imageRef, Math.random() < 0.5 ? -1 : 1);
    }, []);

    return (
        <div className={classnames(className)}>
            <Header state={state} />
            <Container className={"about-page-wrapper"}>
                <div className={"about-page-header"}>
                    <div className={"details"}>
                        <h1 className={"form-headline-1"}>{page.title}</h1>
                        <AspectRation ratio={1} className={"mobile-only"}>
                            <img ref={imageRef} src={page.image_top.url} alt={page.image_top.alt} />
                        </AspectRation>
                        <div className="html2react">
                            <Html2React html={page.copy_top} />
                        </div>
                    </div>
                    <div className="image">
                        <div className={"image-container"}>
                            <AspectRation ratio={1} className={"desktop-only"}>
                                <img ref={imageRef} src={page.image_top.url} alt={page.image_top.alt} />
                            </AspectRation>
                        </div>
                    </div>
                </div>
                <ProductFeaturesContainer>
                    {page.cards.map((card, index) => (
                        <ProductsFeature
                            key={index}
                            title={card.title}
                            description={card.description}
                            imageUrl={card.image.url}
                            alt={card.image.alt}
                        />
                    ))}
                </ProductFeaturesContainer>
                <div className="html2react bottom-copy">
                    <Html2React html={page.copy_bottom} />
                </div>
                <ProductsPortion />
            </Container>
            <Footer />
        </div>
    );
};
export default styled(connect(AboutUsPage))`
  .about-page-header {
    max-width: 86rem;
    margin-left: auto;
    margin-right: auto;
    display: flex;
    position: relative;
    padding-bottom: 5rem;

    .mobile-only {
      display: none;
      max-width: 220px;
      margin: auto;
    }

    @media (max-width: 998px) {
      flex-direction: column;
      & > div {
        width: 100% !important;
      }

      .mobile-only {
        display: block;
      }

      .desktop-only {
        display: none;
      }
    }

    &:after {
      content: "";
      position: absolute;
      width: 300%;
      border-bottom: 1px solid #B5D2FF33;
      height: 1px;
      bottom: 0;
      left: -100%;

      @media (max-width: 998px) {
        display: none;
      }
    }

    & > div {
      width: 50%;
    }

    .details {
      .html2react {
        padding: 0;
      }
    }

    .image-container {
      max-width: 70%;
      margin-right: 0;
      margin-left: auto;
      position: relative;
      display: flex;
      align-items: center;
      height: 100%;

      img {
        width: 100%;  
      }
    }
  }

  .about-page-wrapper {
    padding-top: ${size(180)};
    overflow: hidden;

    h1 {
      text-align: center;
			color: #d2f5e9!important;
			padding-bottom: 1rem;
			font-weight: 300;
    line-height: 9.5rem;
    font-size: 8rem;
    max-width: 80rem;
    margin: auto;

		@media (max-width: 768px) {
			font-size: 3.5rem;
    	line-height: 1.4;
    }
    }


    .html2react {
      margin-top: 1rem;
      color: rgba(210, 245, 233, 0.6);
      font-size: ${size(18)};
      font-weight: 300;
      line-height: ${size(25)};
      text-align: left;
      padding: 0 ${size(55)};
      @media (max-width: 991.98px) {
        font-size: ${size(16)};
      }
      @media (max-width: 768px) {
        padding: 0;
      }
      @media (max-width: 575.98px) {
        font-size: ${size(15)};
      }
      &.bottom-copy {
        margin-bottom: ${size(150)};
      }

      > p {
        margin-bottom: 1rem;
				line-height: 1.5;
        @media (max-width: 575.98px) {
          font-size: 1.5rem;
        }
      }
    }
  }
  ${ProductFeaturesContainer} {
    max-width: 86rem;
    margin-right: auto;
    margin-left: auto;
  }
`;
