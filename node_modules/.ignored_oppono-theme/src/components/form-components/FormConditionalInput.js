import React from 'react';
import RadioGroup from './RadioGroup';
import RadioInput from './RadioInput';
import PropTypes from 'prop-types';

const FormConditionalInput = ({label, yes = 'Yes', no = 'No', showOn = '1', children, checked, name,noScroll}) => {
  const [value, setValue] = React.useState(checked);
  return (
    <React.Fragment>
      <RadioGroup noScroll={noScroll} checked={checked} radioText={label}>
        <RadioInput onChange={() => setValue('1')} label={yes} value={'1'} name={name} type={'radio'}/>
        <RadioInput onChange={() => setValue('0')} label={no} value={'0'} name={name} type={'radio'}/>
      </RadioGroup>
      {value === showOn
        ? (children[0] ? children[0] : children)
        : (children[1] ? children[1] : null)}
    </React.Fragment>
  );
};

FormConditionalInput.propTypes = {
  label: PropTypes.string.isRequired,
  yes: PropTypes.string,
  no: PropTypes.string,
  showOn: PropTypes.string,
  checked: PropTypes.string,
  name: PropTypes.string,
};

export default FormConditionalInput;