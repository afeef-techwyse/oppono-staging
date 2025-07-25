import React from "react";
import { styled } from "frontity";
import PropTypes from "prop-types";
import useCombinedRefs from "../../hooks/useCombinedRefs";
import { size } from "../../functions/size";

const RadioGroup = React.forwardRef(
  ({ className, radioText, children, checked }, forwardedRef) => {
    const innerRef = React.useRef(null);
    const combinedRef = useCombinedRefs(forwardedRef, innerRef);
    const [checkedValue, setCheckedValue] = React.useState(checked);
    React.useEffect(() => {}, [checkedValue]);

    return (
      <div ref={combinedRef} className={`form-group ${className}`}>
        <div className="label-text">{radioText}</div>
        <div className="radio-group">
          {React.Children.map(children, (child) => {
            return React.cloneElement(child, {
              ...child.props,
              checked: child.props.value === checkedValue,
              onChange: (event) => {
                child.props.onChange?.(event);
                setCheckedValue(child.props.value);
              },
              className: `${child.props.className}`,
              type: 'radio',
            });
          })}
        </div>
      </div>
    );
  }
);

RadioGroup.propTypes = {
  radioText: PropTypes.node,
  className: PropTypes.string,
  checked: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  children: PropTypes.arrayOf(PropTypes.node),
};

export default styled(RadioGroup)`
  display: flex;
  flex-direction: column;
  .label-text {
    color: #bfb6b4;
    font-size: ${size(16)};
    font-weight: 500;
    text-align: left;
    margin-bottom: ${size(15)};
    .dark {
      color: rgba(191, 182, 180, 0.5);
    }
  }
  .radio-group {
    display: flex;
    flex-wrap: wrap;
    margin: ${size(-25)} 0 0 0;
    //justify-content: space-between;
    //width: 40rem;
    > * {
      margin-top: ${size(25)};
    }
  }
`;
