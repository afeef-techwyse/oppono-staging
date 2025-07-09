import React from "react";
import { styled } from "frontity";
import PropTypes from "prop-types";
import classnames from "classnames";
import gsap from "gsap";
import { size } from "../../functions/size";
import SelectTwo, { components } from "react-select";
import useCombinedRefs from "../../hooks/useCombinedRefs";
import missing from "../../assets/images/missing.svg";

const DropdownIndicator = (props) => {
  return (
    components.DropdownIndicator && (
      <components.DropdownIndicator {...props}>
        <svg
          style={{
            transition: "transform 400ms",
            transform: `scaleY(${props.selectProps.menuIsOpen ? -1 : 1})`,
          }}
          viewBox="0 0 15 13"
        >
          <path fill="#bfb6b4" d="M7.5 13L0 0h15z" />
        </svg>
      </components.DropdownIndicator>
    )
  );
};

const Select = React.forwardRef(
  (
    {
      className,
      name,
      required,
      label,
      onChange,
      serverErrorMessage,
      ...props
    },
    forwardedRef
  ) => {
    const innerRef = React.useRef(null);
    const combinedRef = useCombinedRefs(forwardedRef, innerRef);
    const [focused, setFocused] = React.useState(false);
    const selectRef = React.useRef(null);
    const [value, setValue] = React.useState("");
    const inputRef = React.useRef(null);

    const [visited, setVisited] = React.useState(false);
    const [invalid, setInvalid] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState("");

    React.useEffect(() => {
      validateInput();
    }, [visited]);

    const validateInput = () => {
      inputRef.current.validity.typeMismatch &&
        setErrorMessage("Please Add Valid Value");
      inputRef.current.validity.valueMissing && setErrorMessage("Required");
      inputRef.current.validity.valid && setErrorMessage("");
      visited && setInvalid(!inputRef.current.validity.valid);
    };

  const getFocusedOption = () => {
    return selectRef.current.select.state.focusedOption;
  }

  const isMenuOpenCheck = () => {
    return selectRef.current.state.menuIsOpen;
  }

  const onUserInteracted = () => {
    Promise.resolve().then(() => {
      const focusedOption = getFocusedOption();
      if (isMenuOpenCheck()) {
        setValue(focusedOption.value);
        inputRef.current.dispatchEvent(new Event("change"));
        setInvalid(false);
        onChange?.(focusedOption);
      }
    });
  }

    return (
      <div
        ref={combinedRef}
        className={classnames("form-group", className, { focused, invalid })}
      >
        <input
          onInvalid={() => setVisited(true)}
          ref={inputRef}
          autoComplete="off"
          name={name}
          type={"text"}
          style={{
            opacity: 0,
            height: 0,
            position: "absolute",
            visibility: "hidden",
          }}
          value={value}
          required={required}
          onChange={() => {}}
        />
        <label error-message={serverErrorMessage || errorMessage}>
          <div className="label-text">{label}</div>
          <SelectTwo
            ref={selectRef}
            {...props}
            openMenuOnFocus={true}
            autofocus={true}
            openAfterFocus={true}
            onFocus={(e) => {
              gsap.to(window, {
                duration: 0.5,
                scrollTo: {
                  y: combinedRef.current,
                  offsetY:
                    window.innerWidth < 768
                      ? 200
                      : (window.innerHeight -
                          combinedRef.current.getBoundingClientRect().height) /
                        2,
                },
              });
              setFocused(true);
            }}
            onBlur={() => {
              setFocused(false);
              setVisited(true);
            }}
            onChange={(event) => {
              setValue(event.value);
              inputRef.current.dispatchEvent(new Event("change"));
              setInvalid(false);
              onChange?.(event);
            }}
						onKeyDown={(event) => {
							if (event.key == "Enter") {
                onUserInteracted(event)
								document.querySelector('.next-step').click()
							}
						}}
            className="oppono-select"
            classNamePrefix="oppono-select"
            components={{ DropdownIndicator }}
            
          />
        </label>
      </div>
    );
  }
);

Select.propTypes = {
  label: PropTypes.node,
  placeholder: PropTypes.node,
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      label: PropTypes.string,
    })
  ).isRequired,
};

export default styled(Select)`
  &.focused {
    position: relative;
    z-index: 9999 !important;
  }
  .oppono-select {
    border-bottom: 1px solid rgba(191, 182, 180, 0.5);
    outline: none;
    width: 100%;
    &__value-container {
      padding: 0;
      height: 100%;
      div {
        margin: 0 !important;
        padding: 0;
      }
    }
    &__indicators {
      svg {
        width: ${size(15)};
        height: ${size(13)};
      }
    }
    &__single-value,
    &__input {
      white-space: nowrap;
      text-overflow: ellipsis;
      width: 100%;
      overflow: hidden;
      color: #bfb6b4;
      font-size: ${size(30)};
      font-weight: 200;
      @media (max-width: 557.98px) {
        font-size: ${size(26)};
      }
    }
    &__control {
      border: none !important;
      box-shadow: none !important;
      background: transparent;
      height: ${size(45)};
      padding-bottom: ${size(6)};
      color: #bfb6b4;
      font-size: ${size(30)};
      font-weight: 200;
      cursor: pointer;
      span {
        display: none;
      }

      @media (max-width: 557.98px) {
        height: 3.3rem;
        font-size: 2rem;

        &:placholder {
          font-size: 2rem;
        }
      }
    }
    &__menu {
      background: #373851;
      z-index: 1000000000;
    }
    &__option {
      color: #bfb6b4;
      font-size: ${size(30)};
      font-weight: 200;
      text-align: left;
      &--is-focused {
        background-color: #bfb6b4;
        color: black;
      }
      @media (max-width: 557.98px) {
        font-size: ${size(26)};
      }
    }
  }
  transition: margin-bottom 400ms;

  label {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    .label-text {
      color: #bfb6b4;
      font-size: ${size(16)};
      font-weight: 500;
      text-align: left;
      margin-bottom: ${size(7)};
      .dark {
        color: rgba(191, 182, 180, 0.5);
      }
    }
  }

  &.invalid {
    //margin-bottom: ${size(40)};
    label {
      position: relative;
      &:after {
        content: url(${missing});
        position: absolute;
        top: calc(100% + 5px);
        left: 0;
        width: ${size(22)};
        height: ${size(22)};
      }
      &:before {
        content: attr(error-message);
        position: absolute;
        top: calc(100% + 7px);
        left: ${size(31)};
        color: #bfb6b4;
        font-size: ${size(14)};
        font-weight: 200;
      }
    }
  }
`;
