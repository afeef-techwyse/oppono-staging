import React from "react";
import { styled } from "frontity";
import { size } from "../../functions/size";
import Button from "./Button";
import Link from "../reusable/Link";
import img1 from "../../assets/images/form_2_img.png";
import img2 from "../../assets/images/form_1_img.png";

const ProductsPortion = ({ className }) => {
  return (
    <div className={className}>
      <p className={"primary"}>
        We make lending a breeze.
        {/* <img src={img1} alt="FlyImg" /> */}
      </p>
      <p className={"primary opacity-5"}>
        Want to join us?
        {/* <img src={img2} alt="FlyImg" /> */}
      </p>
      <Link href={"/create-account"}>
        <Button label={"Sign up!"} />
      </Link>
    </div>
  );
};

export default styled(ProductsPortion)`
  max-width: fit-content !important;
  position: relative;
  margin: ${size(80)} auto 0;
  padding-bottom: ${size(120)};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  p {
    font-size: ${size(60)};
    font-weight: 300;
    font-style: normal;
    letter-spacing: normal;
    line-height: ${size(65)};
    text-align: center;
    display: inline-block;
    position: relative;
    z-index: 0;
    &.opacity-5 {
      color: rgba(210, 244, 233, 0.7) !important;
      img {
        left: auto !important;
        right: -4% !important;
        top: 60% !important;
      }
    }
    @media (max-width: 991.98px) {
      font-size: ${size(45)};
      line-height: ${size(48)};
    }
    @media (max-width: 575.98px) {
      font-size: ${size(40)};
      line-height: 1.2;
    }
  }

  ${Button} {
    background: #fe412d;
    margin-top: ${size(40)};
    color: #fff;
    &:hover {
      background: transparent;
    }
  }

  img {
    width: ${size(92)};
    height: ${size(110)};
    object-fit: contain;
    position: absolute;
    left: 8%;
    top: 4%;
    z-index: -1;
    transform: translate(-50%, -50%);
    @media (max-width: 991.98px) {
      width: ${size(52)};
      height: ${size(62)};
    }
    @media (max-width: 575.98px) {
      width: ${size(58)};
      height: ${size(69)};
    }
  }
`;
