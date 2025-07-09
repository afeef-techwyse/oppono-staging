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
const RadioInputVertical = React.forwardRef(
  (
    {
      className,
      type = "radio",
      value,
      required,
      readOnly,
      disabled,
      label,
      number,
      website,
      email,
      name,
      checked = false,
      onChange,
    },
    forwardedRef
  ) => {
    const innerRef = React.useRef(null);
    const combinedRef = useCombinedRefs(forwardedRef, innerRef);
    const [focused, setFocused] = React.useState(false);
    const labelRef = React.useRef(null);

    return (
      <div
        ref={combinedRef}
        className={classnames("radio-input", className, { focused, checked })}
      >
        <label>
          <div className="radio-text" ref={labelRef}>
            {label}
          </div>
          <div className="appraiser-info-container">
          {number?<Link href={`tel:${number}`}><span>Tap to call</span>{number}</Link>:<h6>...</h6>}<br/>
          {email?<Link href={`mailto:${email}`}><span className={"tap-adjust"}>Tap to email</span>{email}</Link>:<h6>...</h6>}
          {website?<Link target={"_blank"} href={"https://" + `${website}`}><span className={"tap-adjust"}>Tap to visit</span>{website}</Link>:<h6>...</h6>}
          </div>
          <input
            type={type}
            value={value}
            name={name}
            checked={checked}
            required={required}
            readOnly={readOnly}
            disabled={disabled}
            onFocus={() => {
              setFocused(true);
            }}
            onBlur={() => {
              setFocused(false);
            }}
            onChange={onChange}
          />
        </label>
      </div>
    );
  }
);

RadioInputVertical.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.node,
  className: PropTypes.string,
  type: PropTypes.oneOf(["radio", "checkbox"]),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  placeholder: PropTypes.string,
  number: PropTypes.string,
  required: PropTypes.bool,
  readOnly: PropTypes.bool,
  disabled: PropTypes.bool,
  checked: PropTypes.bool,
  onChange: PropTypes.func,
  
};

export default styled(RadioInputVertical)`
  .radio-text {
    font-size: ${size(14)};
    line-height: ${size(24)};
    cursor: pointer;
    color: #bfb6b4;
  }
  .tap-adjust {
    @media(min-width: 992px) {
      margin-right: 17px;
    }
  }
  &.noRadio {
    margin-bottom: 2.5rem; 
    @media (max-width: 998px) {
      margin-bottom: 0;
      border-bottom: 1px solid #B5D2FF33;
      padding-top: 0;
    }
    label {
      padding-left: 0;
      &::after {
        display: none;
      }
    }
    .radio-text {
      width: 50%;
    }
    .appraiser-info-container {
      width: 50%;
      
      @media (max-width: 998px) {
        margin: 1.5rem 0 2rem;
      }
    }
  }
  a {
    color: #ffffff;
    font-size: ${size(16)};
    white-space: nowrap;
  }

	a span {
		font-size: 14px;
    margin-right: 30px;
    color: #BFB6B4;
    opacity: 0.5;
    white-space: nowrap;
	} 
  
	h6 {
    color: #ffffff;
    font-size: ${size(16)};
    font-weight: 400;
    line-height: ${size(24)};
    padding-bottom: ${size(2)};
  }
  input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }

  label {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    padding-left: ${size(31)};
    
		&:after {
      content: "";
      position: absolute;
      left: 0;
      top: 3px;
      width: ${size(19)};
      height: ${size(19)};
      border-radius: 50%;
      border: ${size(1)} solid rgba(191, 182, 180, 0.5);
    }
  }

  &.focused {
    label {
      &:after {
        border-color: #297fff;
      }
    }
  }

  &.checked {
    label {
      &:after {
        background: #bfb6b4;
        border-width: 0;
      }
    }
  }
`;
