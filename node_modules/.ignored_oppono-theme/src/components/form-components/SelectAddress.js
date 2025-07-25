import React from "react";
import { styled } from "frontity";
import PropTypes from "prop-types";
import classnames from "classnames";
import gsap from "gsap";
import AsyncSelect from "react-select/async/dist/react-select.esm";
import { size } from "../../functions/size";
import SelectTwo, { components } from "react-select";
import useCombinedRefs from "../../hooks/useCombinedRefs";
import missing from "../../assets/images/missing.svg";
import { P } from "./StyledComponent";

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
const Input = (props) => {

  return (
    components.Input && (
          <components.Input
              {...props}
              autoComplete={"random-string"}
              onFocus={(e) => {
                props.onFocus(e);
                requestAnimationFrame(() => e.target.select())
              }}/>
    )
  );
};

const getHighlightedText = (text, highlight) => {
      const highlights = highlight.split(",");
      if (!highlights.length) return
      <P.D>{text}</P.D>;

      const pieces = [];

      for (let i = 0; i < highlights.length; i++) {
        highlights[i] = highlights[i].split("-");
        pieces.push(
            <>{text.slice(i ? +highlights[i - 1][1] : 0, +highlights[i][0])}</>
        );
        pieces.push(
            <strong style={{color: "#fe412d"}}>
              {text.slice(highlights[i][0], highlights[i][1])}
            </strong>
        );
      }
      pieces.push(<>{text.slice(+highlights[highlights.length - 1][1])}</>);
      return (
          <P.D>
            {pieces.map((piece, index) => (
                <React.Fragment key={index}>{piece}</React.Fragment>
            ))}
          </P.D>
      );
    }
;

const Option = (props) => {
  return (
    <components.Option {...props}>
      {/*{<P.D>{props.data.Text}</P.D>}*/}
      {getHighlightedText(props.data.Text, props.data.Highlight)}
      <P.Dark>{props.data.Description}</P.Dark>
    </components.Option>
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
      const [inputValue, setInputValue] = React.useState('');

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
      return (
          <div
              ref={combinedRef}
              className={classnames("form-group", className, {focused, invalid})}
          >
            <input
                onInvalid={() => setVisited(true)}
                ref={inputRef}
                autoComplete="off"
                name={name}
                type={"hidden"}
                style={{
                  opacity: 0,
                  height: 0,
                  position: "absolute",
                  visibility: "hidden",
                }}
                value={value}
                required={required}
            />
            <label error-message={serverErrorMessage || errorMessage}>
              <div className="label-text">{label}</div>
              <AsyncSelect
                  // styles={{
                  //   singleValue: () => ({display: focused ? 'none' : 'block'})
                  // }}
                  cacheOptions
                  onMenuOpen={() => setInputValue(value)}
                  ref={selectRef}
                  {...props}
                  inputValue={inputValue}
                  onInputChange={(e) => {
                    setInputValue(e)
                  }}
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
                  onChange={(option, state) => {
                    setValue(option.value);
                    setInputValue(option.value)
                    inputRef.current.dispatchEvent(new Event("change"));
                    setInvalid(false);
                    setTimeout(() => document.activeElement.blur(), 100);
                    onChange?.(option, state);
                  }}
                  className="oppono-select"
                  classNamePrefix="oppono-select"
                  components={{DropdownIndicator, Option, Input}}
                  noOptionsMessage={() => "Type To Search"}
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
      font-weight: 300;
      
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
      cursor: pointer;

      span {
        display: none;
      }

      @media (max-width: 557.98px) {
        height: 3.3rem;
        font-size: ${size(26)};
      }
    }

    &__menu {
      background: #373851;
      z-index: 1000000000;
      margin-top: 0;
    }

    &__menu-notice {
      font-size: ${size(20)};
    }

    &__option {
      color: #bfb6b4;
      font-size: ${size(30)};
      text-align: left;

      @media (max-width: 557.98px) {
        font-size: 2rem;
      }

      &--is-focused {
        background-color: #bfb6b4;

        ${P.Dark}, ${P.D} {
          color: black;
        }
      }

      &--is-selected {
        background-color: #acf0f6;

        ${P.Dark}, ${P.D} {
          color: black;
        }
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
