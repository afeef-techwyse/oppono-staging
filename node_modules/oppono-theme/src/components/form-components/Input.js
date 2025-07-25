import React from "react";
import { connect, styled } from "frontity";
import PropTypes from "prop-types";
import classnames from "classnames";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import useCombinedRefs from "../../hooks/useCombinedRefs";
import { size } from "../../functions/size";
import missing from "../../assets/images/missing.svg";
import CurrencyInput from 'react-currency-input-field';
import PhoneInput from 'react-phone-number-input/input'


gsap.registerPlugin(ScrollToPlugin);

const Label = styled(
  connect(({ className, children, state, error, fieldName, invalid }) => {
    const errorMessage = error || state.theme.errors?.[fieldName]?.code;
    return (
      <label
        className={classnames(className, {
          invalid: invalid || state.theme.errors?.[fieldName],
        })}
        error-message={errorMessage}
      >
        {children}
      </label>
    );
  })
)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;

  .label-text {
    color: #bfb6b4;
    font-size: ${size(16)};
    font-weight: 500;
    text-align: left;
    margin-bottom: ${size(7)};
    .dark {
      color: rgba(191, 182, 180, 0.5);
    }
    &.hidden {
      display: none;
    }
  }
  .alternate-label-text {
    &.hidden {
      display: none;
    }
  }
  &.invalid {
    &:after {
      content: "";
      background: url(${missing});
      background-size: contain;
      position: absolute;
      top: calc(100% + ${size(18)});
      left: 0;
      transform: translateY(-50%);
      width: ${size(18)};
      height: ${size(18)};
    }
    &:before {
      content: attr(error-message);
      position: absolute;
      top: calc(100% + ${size(18)});
      left: ${size(31)};
      transform: translateY(-50%);
      color: #bfb6b4;
      font-size: ${size(14)};
      font-weight: 200;
    }
    input {
      //border-bottom: 1px solid #bfb6b4;
    }
  }
`;

const Input = React.forwardRef(
  (
    {
      className,
      name,
      type,
      value: initialValue = "",
      placeholder,
      pattern,
      isCurrency,
      isPhoneNumber,
      required,
      readOnly,
      disabled,
      min,
      max,
      label,
      alternate,
      alternate_label,
      onChange,
      onCurrencyChange,
      onKeyUp,
      onKeyDown,
      defaultValue,
      error,
      noScroll,
      compareValueTo,
      compareValueToMessage
    },
    forwardedRef
  ) => {
    const innerRef = React.useRef(null);
    const combinedRef = useCombinedRefs(forwardedRef, innerRef);
    const inputRef = React.useRef(null);

    const [value, setValue] = React.useState(initialValue ?? "");
    const [valueToCompare, setValueToCompare] = React.useState(0);
    const [focused, setFocused] = React.useState(false);
    const [visited, setVisited] = React.useState(false);
    const [invalid, setInvalid] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState(error);
    const validateInput = () => {
      inputRef.current.validity.valid
        ? error || setErrorMessage("")
        : setErrorMessage("This Input is Invalid");
      inputRef.current.validity.typeMismatch &&
        setErrorMessage("Please Add Valid Value");
      inputRef.current.validity.valueMissing && setErrorMessage("Required");
      inputRef.current.validity.patternMismatch &&
        setErrorMessage("Incorrect Format");
      if (compareValueTo) {
        if (value > compareValueTo) {
          inputRef.current.setCustomValidity(compareValueToMessage)
          setErrorMessage(compareValueToMessage);
        }else{
          inputRef.current.setCustomValidity("")
        }
      }
      visited && setInvalid(!inputRef.current.validity.valid || error);
    };

    React.useEffect(() => {
      validateInput();
    }, [visited]);
    React.useEffect(() => {
      setValue(initialValue);
      setErrorMessage(error);
      error && setVisited(true);
      setTimeout(() => visited && validateInput(), 0);
    }, [initialValue, error]);

    React.useEffect(() => {
      if (valueToCompare > compareValueTo) {
        setVisited(true);
        setInvalid(true);
      }
      validateInput();
    }, [valueToCompare]);

    return (
      <div
        ref={combinedRef}
        className={classnames("form-group primary-input ", className, {
          focused,
          invalid,
        })}
      >
        <Label error={errorMessage} fieldName={name} invalid={invalid}>
          <div className={`label-text ${alternate ? "hidden" : "active"}`}>{label}</div>
          <div className={`label-text ${alternate ? "active" : "hidden"}`}>{alternate_label}</div>
          {isCurrency && <div className="currencyMasker" data-currency={isCurrency}>
            <CurrencyInput
                name="input-name"
                className="normal-input currency-input"
                prefix="$"
                decimalsLimit={2}
                placeholder={placeholder}
                onBlur={(e) => {
                  e.currentTarget.closest('label').querySelector('input:not(.currency-input)').value = parseFloat(e.currentTarget.value.replace(/\$|,/g, ''))
                }}
                onChange={(e) => {
                  e.persist();
                  
                  visited && validateInput();
                  setValue(e.target.value.replace(/\$|,/g, ''));
                  onChange?.(e);
                  // const selection = inputRef.current.selectionStart;
                  // requestAnimationFrame(() =>
                  //     inputRef.current.setSelectionRange(selection, selection)
                  // );
                }}
								onKeyUp={(e) => {
                  const val = e.target.value.replace(/\$|,/g, '')
                  setValueToCompare(val);
									onKeyUp?.(val);
								}}
                onKeyDown={(e) => {
                  const val = e.target.value.replace(/\$|,/g, '')
									onKeyDown?.(val);
								}}
            />
          </div>}
          {isPhoneNumber && <div className="phoneMasker" data-phone={isPhoneNumber}>
            <PhoneInput
                type="text"
                placeholder={placeholder}
                name="phone"
                className="normal-input"
                country="US"
                value={value}
                onChange={setValue} />
          </div>}
          <input
            defaultValue={defaultValue}
            ref={inputRef}
            name={name}
            className={"normal-input"}
            type={type === "number" ? "text" : type}
            value={value}
            placeholder={placeholder}
            required={required}
            readOnly={readOnly}
            disabled={disabled}
            max={max}
            min={min}
						data-currency={isCurrency}
						data-phone={isPhoneNumber}
            pattern={pattern}
            onInvalid={() => setVisited(true)}
            onFocus={(e) => {
              noScroll ||
                gsap.to(window, {
                  duration: 0.5,
                  scrollTo: {
                    y: combinedRef.current,
                    offsetY:
                      window.innerWidth < 768
                        ? 200
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
              setVisited(true);
            }}
            onChange={(event) => {
              event.persist();
              if (type === "number" && !/^\d*$/.test(event.target.value)) {
                setErrorMessage("numbers only is allowed");
                const selection = inputRef.current.selectionStart - 1;
                requestAnimationFrame(() =>
                  inputRef.current.setSelectionRange(selection, selection)
                );
                event.target.value = value ?? "";
                setVisited(true);
                setInvalid(true);
                return;
              }
              visited && validateInput();
              setValue(event.target.value);
              onChange?.(event);
              const selection = inputRef.current.selectionStart;
              requestAnimationFrame(() =>
                inputRef.current.setSelectionRange(selection, selection)
              );
            }}
            onKeyUp={onKeyUp}
						onKeyDown={(event) => {
              onKeyDown
							if (event.key == "Enter") {
								document.querySelector('.next-step').click()
							}
						}}
          />
        </Label>
      </div>
    );
  }
);

export default styled(Input)`
  position: relative;
  transition: margin-bottom 400ms;

  .inline-block {
    display: inline-block;
  }

  .normal-input {
    width: 100%;
    line-height: 1.35;
    border: none;
    background: transparent;
    outline: none;
		border-radius: 0 !important;
    border-bottom: 1px solid rgba(191, 182, 180, 0.5);
    height: ${size(45)};
    padding: 0 0 ${size(6)};
    caret-color: #297fff;
    color: #bfb6b4;
    font-size: ${size(30)};
    font-weight: 300;
    position: relative;

		@media (max-width: 575.98px) {
      font-size: ${size(26)};
      height: 3.3rem;
    }
    
		&::placeholder {
      color: rgba(191, 182, 180);
      opacity: 0.4;
      font-size: ${size(30)};
      font-weight: 200;
      text-align: left;
      
			@media (max-width: 575.98px) {
        font-size: ${size(26)};    
      }
    }
  }

  &.invalid {
    &:after {
      background-color: #fe412d;
    }
  }

  &.big-input {
    ${Label} {
      align-items: center;
    }

    .normal-input {
      height: ${size(131)};
      font-size: ${size(100)};
      text-align: center;
      border-bottom: 1px solid rgba(191, 182, 180, 0.5);
      @media (max-width: 991.98px) {
        height: auto;
        font-size: ${size(26)};
        border-bottom-color: rgba(191, 182, 180, 0.5);
      }
      &::placeholder {
        text-align: center;
        font-size: ${size(100)};
        @media (max-width: 991.98px) {
          font-size: ${size(26)};
        }
      }
    }
    &.has-cue {
      .cue {
        display: inline;
        color: rgba(191, 182, 180, 0.5);
        font-size: ${size(100)};
        font-weight: 200;
      }
    }
  }

  input[type="password"] {
    color: rgba(191, 182, 180, 0.5);
    &::placeholder {
      font-size: ${size(30)};
    }
  }

  &.focused {
    &:after {
      width: 100%;
    }
  }
  &:after {
    content: "";
    position: absolute;
    height: 1px;
    width: 0;
    left: 50%;
    transform: translateX(-50%);
    bottom: 0;
    background: #bfb6b4;
    transition: width 400ms;
  }

	.currencyMasker{
		display: none;
		width: 100%;
		&[data-currency='true'] {
			display: block;
		}
	}
	.phoneMasker{
		display: none;
		width: 100%;
		&[data-phone='true'] {
			display: block;
		}
	}
	.normal-input[data-currency='true'],
	.normal-input[data-phone='true'] {
		display: none;
	}
`;

Input.propTypes = {
  label: PropTypes.node,
  className: PropTypes.string,
  type: PropTypes.oneOf(["text", "email", "number", "phone", "password"])
    .isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  isCurrency: PropTypes.bool,
  isPhoneNumber: PropTypes.bool,
  readOnly: PropTypes.bool,
  disabled: PropTypes.bool,
  min: PropTypes.number,
  max: PropTypes.number,
  pattern: PropTypes.string,
  noScroll: PropTypes.bool,
};
