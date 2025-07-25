import React from "react";
import { styled } from "frontity";
import PropTypes from "prop-types";
import classnames from "classnames";
import { size } from "../../functions/size";

const TextArea = React.forwardRef(({ className, label, name , required, placeholder}, forwardedRef) => (
  <div className={classnames("form-group primary-input ", className)}>
    <label>
      <div className="label-text primary">{label}</div>
      <textarea name={name} required={required} placeholder={placeholder}/>
    </label>
  </div>
));

TextArea.propTypes = {
  label: PropTypes.node,
  className: PropTypes.string,
};

export default styled(TextArea)`
  label {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    .label-text {
      color: #bfb6b4;
      font-size: ${size(16)};
      font-weight: 500;
      text-align: left;
      margin-bottom: ${size(10)};
      .dark {
        color: rgba(191, 182, 180, 0.5);
      }
    }
  }
  textarea {
    outline: none;
    width: 100%;
    height: ${size(113)};
    border: 1px solid rgba(191, 182, 180, 0.5);
    background: transparent;
    padding: ${size(20)};
    color: #bfb6b4;
    font-size: ${size(22)};
    font-weight: 200;
    resize: none;
    transition: border-color 400ms;
  }
`;
