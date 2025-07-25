import React from "react";
import { styled } from "frontity";
import PropTypes from "prop-types";
import classnames from "classnames";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { CustomEase } from "gsap/CustomEase";
import useCombinedRefs from "../../hooks/useCombinedRefs";
import { size } from "../../functions/size";
import Link from "../reusable/Link";

gsap.registerPlugin(ScrollToPlugin);
gsap.registerPlugin(DrawSVGPlugin);
gsap.registerPlugin(CustomEase);
const RadioInput = React.forwardRef(
  (
    {
      className,
      type = "radio",
      value,
      required,
      readOnly,
      disabled,
      label,
      name,
      checked = false,
      onChange,
    },
    forwardedRef
  ) => {
    const innerRef = React.useRef(null);
    const combinedRef = useCombinedRefs(forwardedRef, innerRef);
    const [focused, setFocused] = React.useState(false);
    const svgBorder = React.useRef({});
    const labelRef = React.useRef(null);

    React.useEffect(() => {
      gsap.to(svgBorder.current.blue, {
        duration: 1,
        drawSVG: focused ? "100%" : 0,
        delay: 0.3,
      });
    }, [focused]);
    React.useEffect(() => {
      gsap.to(svgBorder.current.gray, {
        duration: 0.5,
        fill: checked ? "#bfb6b4" : "transparent",
        ease: checked
          ? CustomEase.create(
              "custom",
              "M0,0,C0.14,0,0.242,0.438,0.272,0.561,0.313,0.728,0.354,0.963,0.362,1,0.37,0.985,0.528,0.198,0.682,0.198,0.841,0.198,1,1,1,1"
            )
          : "power2.out",
      });
      gsap.to(labelRef.current, {
        duration: 0.5,
        color: checked ? "#1b1b26" : "#bfb6b4",
        ease: checked
          ? CustomEase.create(
              "custom",
              "M0,0,C0.14,0,0.242,0.438,0.272,0.561,0.313,0.728,0.354,0.963,0.362,1,0.37,0.985,0.528,0.198,0.682,0.198,0.841,0.198,1,1,1,1"
            )
          : "power2.out",
      });
    }, [checked]);

    return (
      <div
        ref={combinedRef}
        className={classnames("checkbox", className, { focused, checked })}
      >
        <input type="checkbox" />
        <span className="checkmark" />
        <span className={"text"}>
          I agree the <Link href="#">terms and conditions</Link>
        </span>
      </div>
    );
  }
);

RadioInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.node,
  className: PropTypes.string,
  type: PropTypes.oneOf(["radio", "checkbox"]),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  readOnly: PropTypes.bool,
  disabled: PropTypes.bool,
  checked: PropTypes.bool,
  onChange: PropTypes.func,
};

export default styled(RadioInput)`
  border: none;
  outline: none;
  cursor: pointer;
  background: transparent;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  padding-left: 30px;
  padding-right: 30px;
  height: ${size(44)};
  margin-right: ${size(16)};
  &.big-radio {
    width: ${size(285)};
    height: ${size(124)};
    margin-right: ${size(20)};
    padding: 0;
    .radio-text {
      font-size: ${size(22)};
padding-left: 8px !important;;
      font-weight: 200;
      line-height: ${size(48)};

      @media (max-width: 557.98px) {
        font-size: 2rem;
      }
    }
  }
  .radio-text {
    font-size: ${size(16)};
    font-weight: 400;
    line-height: ${size(23)};
    cursor: pointer;
  }
  input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }

  svg {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    &.btn-enter {
      display: none;
    }
    &.btn-stroke path {
      transition: stroke 400ms;
      &.gray {
        stroke: rgba(191, 182, 180, 0.5);
      }
      &.blue {
        stroke: #297fff;
        fill: transparent;
      }
    }
  }

  label {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }

  &:hover {
    .btn-stroke path.gray {
      stroke: #297fff;
    }
  }

  &.focused {
    .btn-enter {
      path {
        display: block;
      }
    }
  }

  &.checked {
    .btn-enter {
      display: none;
    }
    .btn-stroke path.gray {
      stroke: none;
    }
  }
`;
