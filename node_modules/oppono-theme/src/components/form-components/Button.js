import React from "react";
import { styled } from "frontity";
import PropTypes from "prop-types";
import { size } from "../../functions/size";

const Button = React.forwardRef(
    (
        {
            className,
            label,
            href,
            icon = false,
            value,
            onClick,
            focusable = true,
            disabled = false,
        },
        forwardedRef
    ) => {
        return (
            <button
                tabIndex={focusable ? null : -1}
                className={`oppono-btn ${className}`}
                type={"button"}
                onClick={onClick}
                disabled={disabled}
                aria-disabled={disabled}
            >
                <span className="text">{label}</span>
                {icon ? (
                    <svg className={"right-arrow"} viewBox="0 0 22 10">
                        <path fill="none" stroke="#fff" d="M0 5h22" />
                        <path fill="none" stroke="#fff" d="M17 10v0l5-5-5-5" />
                    </svg>
                ) : null}
            </button>
        );
    }
);

Button.propTypes = {
    label: PropTypes.node,
    className: PropTypes.string,
    href: PropTypes.string,
    icon: PropTypes.bool,
    onClick: PropTypes.func,
};

export default styled(Button)`
  outline: none;
  text-decoration: none;
  width: auto;
  min-width: 16rem;
  padding: ${size(21)} ${size(40)};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${size(100)};
  background: transparent;
  border: 1px solid #fe412d;
  color: #ffffff;
  font-size: ${size(16)};
  font-weight: 400;
  margin: 0 auto 0;
  cursor: pointer;
  white-space: nowrap;
  transition: background-color 400ms, border-color 400ms, color 400ms,
    opacity 400ms;

  .text {
    text-decoration: none;
  }

  @media (max-width: 575.98px) {
    max-width: unset;
    padding: 1.5rem 2.8rem;
  }

  .right-arrow {
    width: 0;
    height: auto;
    stroke-width: 1;
    transition: width 0.4s;
  }

  &:hover,
  &:active,
  &:focus {
    background: #fe412d;
    border-color: #fe412d !important;
    color: #ffffff !important;

    .right-arrow {
      width: ${size(22)};
    }
  }

  &.filled {
    background: #fe412d;
    border-color: #fe412d !important;
    color: #ffffff !important;

    &:hover {
      background: transparent;
      border: 1px solid #fe412d;
    }
  }
  &.small {
    padding: ${size(9)} ${size(20)};
  }
  &.bordered {
  }
  &.underlined {
    border-radius: 0;
    padding: 0;
    background: transparent;
    border: none;
    border-bottom: 1px solid rgba(191, 182, 180, 0.5);
    &.big-text {
      font-size: 40px;
    }
  }
  &.wide {
    padding: ${size(23)} ${size(76)};
  }
  &.wide-vertical {
    padding: ${size(12)} ${size(50)};
  }

  svg {
    transition: width 400ms;
    width: 0;
    height: ${size(13)};
    margin-left: ${size(8)};
    overflow: hidden;
  }

  &:disabled {
    cursor: not-allowed;
  }
`;
