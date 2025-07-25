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
      onClick,
      noScroll,
      noInput,
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
        className={classnames("radio-input", className, { focused, checked })}
      >
        <svg
          preserveAspectRatio={"none"}
          className={"btn-stroke"}
          viewBox="0 0 286 125"
        >
          <path
            className={"gray"}
            ref={(el) => (svgBorder.current.gray = el)}
            d="M15.27 1.421c.28-.27.65-.421 1.04-.421H283.5c.83 0 1.5.672 1.5 1.5v120a1.5 1.5 0 0 1-1.5 1.5H2.5a1.5 1.5 0 0 1-1.5-1.5V15.848c0-.406.17-.796.46-1.078z"
          />
          <path
            className={"blue"}
            ref={(el) => (svgBorder.current.blue = el)}
            d="M15.27 1.421c.28-.27.65-.421 1.04-.421H283.5c.83 0 1.5.672 1.5 1.5v120a1.5 1.5 0 0 1-1.5 1.5H2.5a1.5 1.5 0 0 1-1.5-1.5V15.848c0-.406.17-.796.46-1.078z"
          />
        </svg>
        <svg className="btn-enter" viewBox="0 0 286 125">
          <path
            fill="#bfb6b4"
            d="M12.532 22.312l4.928 4.96 1.152-1.2-2.912-2.88h8.928v-8.176h-1.68v6.464h-7.28l2.944-2.896-1.152-1.232z"
          />
        </svg>
        <label>
          <div className="radio-text" ref={labelRef} labeltype={label}>
            {label}
          </div>
          {noInput ? null : (
            <input
              type={type}
              value={value}
              name={name}
              checked={checked}
              required={required}
              readOnly={readOnly}
              disabled={disabled}
              onFocus={() => {
                noScroll ||
                  gsap.to(window, {
                    duration: 0.5,
                    scrollTo: {
                      y: combinedRef.current,
                      offsetY:
                        window.innerWidth < 768
                          ? 100
                          : (window.innerHeight -
                              combinedRef.current.getBoundingClientRect()
                                .height) /
                            2,
                    },
                  });
                setFocused(true);
              }}
              onBlur={() => {
                setFocused(false);
              }}
              onChange={onChange}
							onClick={onClick}
            />
          )}
        </label>
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
  noScroll: PropTypes.bool,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
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
  min-width: ${size(75)};
  height: ${size(42)};
  margin-right: ${size(31)};
  margin-top: ${size(20)};
  padding-right: 1px;
  padding-bottom: 1px;
  @media (max-width: 575.98px) {
    width: calc(50% - 1.8rem);
    height: ${size(48)};
    &:nth-of-type(even) {
      margin-right: 0;
    }
  }

  &.small-margin {
    margin-right: ${size(22)};
    @media (max-width: 575.98px) {
      margin-right: ${size(36)};
      width: calc(50% - 1.8rem);
      &:nth-of-type(even) {
        margin-right: 0;
      }
    }
  }

  &.big-radio {
    width: ${size(285)};
    height: ${size(124)};
    margin-right: ${size(20)};
    padding: 0;

    .radio-text {
      font-size: ${size(22)};
      font-weight: 200;
      line-height: ${size(48)};
      @media (max-width: 557.98px) {
        font-size: 2rem;
      }
    }
  }

  .radio-text {
    font-size: ${size(16)};
    font-weight: 500;
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
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    padding-left: ${size(20)};
    padding-right: ${size(20)};
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
