import gsap from "gsap";
import React from "react";
import { styled } from "frontity";
import { size } from "../functions/size";

const Col = styled.div`
  width: 50%;
  flex: 0 0 50%;
  padding: 0 ${size(13)};
  @media (max-width: 991.98px) and (min-width: 576px) {
    &.image {
      width: calc(50% - 3rem);
      flex: 0 0 calc(50% - 3rem);
    }
  }
  @media (max-width: 575.98px) {
    width: 100%;
    flex-basis: 100%;
    &.image {
      margin-bottom: ${size(40)};
    }
  }
`;
const Title = styled.div`
  color: #d2f5e9;
  font-size: ${size(40)};
  font-weight: 300;
  line-height: ${size(48)};
  text-align: left;
  padding-right: ${size(10)};
  @media (max-width: 991.98px) {
    font-size: ${size(28)};
    line-height: ${size(34)};
    padding: 0;
  }
  @media (max-width: 575.98px) {
    font-size: ${size(32)};
    line-height: ${size(40)};
    padding: 0;
  }
`;
const Description = styled.div`
  color: rgba(210, 245, 233, 0.6);
  font-size: ${size(18)};
  font-weight: 300;
  padding-right: ${size(10)};
  line-height: ${size(25)};
  text-align: left;
  margin-top: ${size(23)};
  @media (max-width: 991.98px) {
    font-size: ${size(16)};
    margin-top: ${size(16)};
    padding: 0;
  }
  @media (max-width: 575.98px) {
    font-size: ${size(15)};
    margin-top: ${size(23)};
    padding: 0;
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

const ProductsFeature = ({ className, imageUrl, alt, title, description }) => {
  const imageRef = React.useRef(null);

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
    <div className={className}>
      <Col className={"image"}>
        <div style={{ width: "70%", margin: "0 auto" }}>
          <AspectRation ratio={1}>
            <img ref={imageRef} src={imageUrl} alt={alt} />
          </AspectRation>
        </div>
      </Col>
      <Col>
        <Title className={"primary"}>{title}</Title>
        <Description>{description}</Description>
      </Col>
    </div>
  );
};

export default styled(ProductsFeature)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: ${size(80)} ${size(-13)};
  &:last-of-type {
    margin-bottom: 0;
    padding-bottom: ${size(80)};
  }
  @media (max-width: 991.98px) {
    justify-content: space-between;
  }
  @media (max-width: 575.98px) {
    justify-content: center;
    flex-wrap: wrap;
  }
`;
