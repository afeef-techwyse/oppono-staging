import React from "react";
import { styled } from "frontity";
import { size } from "../../functions/size";
import gsap from "gsap";

const ProductsMobileOption = ({ className, children }) => {
  const [showRemaining, setShowRemaining] = React.useState(false);
  const mobileOptionRef = React.useRef(null);

  React.useEffect(() => {
    const showMoreBtn = mobileOptionRef.current.querySelector(
      ".show-all-specs"
    );
    const toggleShowRemaining = () =>
      setShowRemaining((prevState) => !prevState);
    showMoreBtn?.addEventListener("click", toggleShowRemaining);
    return () => showMoreBtn?.removeEventListener("click", toggleShowRemaining);
  }, []);

  React.useEffect(() => {
    gsap.to(mobileOptionRef.current.querySelector(".remaining-specs"), {
      height: showRemaining ? "auto" : 0,
    });
    mobileOptionRef.current
      .querySelector(".show-all-specs")
      ?.classList.toggle("opened", showRemaining);
  }, [showRemaining]);
  return (
    <div ref={mobileOptionRef} className={className} children={children} />
  );
};

export default styled(ProductsMobileOption)`
  .mortgage-title {
    margin-top: ${size(100)};
    margin-bottom: ${size(72)};

    p {
      color: #bfb6b4;
      font-size: ${size(20)};
      font-weight: 400;
      line-height: ${size(24)};
      text-align: center;

      &.circle {
        width: ${size(34)};
        height: ${size(34)};
        border: ${size(1)} solid rgba(191, 182, 180, 0.5);
        border-radius: ${size(34)};
        margin: 0 auto ${size(5)};
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: sans-serif;
      }
      &.dark {
        color: rgba(191, 182, 180, 0.5);
        font-size: ${size(16)};
      }
    }
  }
  .mortgage-head {
    p {
      color: #bfb6b4;
      font-size: ${size(16)};
      font-weight: 400;
      line-height: ${size(24)};
      text-align: center;
      &.number {
        font-size: ${size(56)};
        font-weight: 200;
        line-height: ${size(64)};
        margin-top: ${size(4)};
      }
      &.small {
        color: rgba(181, 210, 255, 0.4);
        font-size: ${size(14)};
        font-weight: 400;
        margin-bottom: ${size(4)};
      }
    }
    button {
      margin: ${size(16)} auto 0;
      width: fit-content;
    }
  }
  .mortgage-body {
    margin-top: ${size(24)};
    border-top: ${size(1)} solid #bfb6b4;
    .m-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: ${size(15)};
      padding-bottom: ${size(15)};
      border-top: ${size(1)} solid rgba(191, 182, 180, 0.1);
      p {
        color: #bfb6b4;
        font-size: ${size(14)};
        font-weight: 400;
        line-height: ${size(16)};
      }
      .table-checkmark {
        width: ${size(16)};
        height: ${size(11)};
      }
      .exclamation {
        width: ${size(16)};
        height: ${size(17)};
      }
      &.m-head {
        padding-top: ${size(5)};
        padding-bottom: ${size(5)};
        border-top: none;
        p {
          color: rgba(191, 182, 180, 0.5);
          border-top: none;
        }
        &:first-of-type {
          padding-top: ${size(23)};
        }
        &.last-head {
          padding-bottom: ${size(23)};
        }
      }
    }
    .show-all-specs {
      color: #d2f5e9;
      font-size: ${size(14)};
      font-weight: 400;
      line-height: ${size(16)};
      margin-top: ${size(8)};
      display: flex;
      align-items: center;
      svg {
        width: ${size(12)};
        height: ${size(8)};
        margin-left: ${size(6)};
        transition: transform 500ms;
      }

      &.opened {
        svg {
          transform: scaleY(-1);
        }
      }
    }
    .remaining-specs {
      height: 0;
      overflow: hidden;
    }
  }
`;
