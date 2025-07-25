import React from 'react';
import RadioGroup from './RadioGroup';
import RadioInput from './RadioInput';
import PropTypes from 'prop-types';
import Input from './Input';
import W50 from './W50';
import {styled} from 'frontity';
import {size} from '../../functions/size';
import {numberToLetters} from '../../functions/numberToletters';

const find = new RegExp('{{number}}', 'g');

const RepeatedUnit = styled.div`
margin: ${size(50)} 0 0;
.form-group{
  margin-top: ${size(25)};
  @media(max-width: 991.98px){
     margin-top: ${size(20)};
  }
  @media(max-width: 575.98px){
     margin-top: ${size(25)};
  }
}
${Input}{
  margin-bottom: ${size(40)};
}
`;

const FormRepeatableInput = ({question, number = 1, initial = 1, fixedNumber, children, name}) => {
  const [repeatingValue, setRepeatingValue] = React.useState(initial);

  const onChangeHandler = (child) => (event) => {
    event.persist();
    child.props.onChange?.(event);
  };

  return (
    <React.Fragment>
      {question
        ? <RadioGroup checked={initial} radioText={question}>
          {
            [...Array(number).keys()].map(i => <RadioInput className={'small-margin'} key={i} label={i + 1} value={i + 1} onChange={() => setRepeatingValue(i + 1)} name={name} type={'radio'}/>)
          }
        </RadioGroup>
        : null}
      {
        [...Array(fixedNumber || repeatingValue).keys()].map((repeat, index) => {

          return <RepeatedUnit key={`childrenRepeating-${repeat}`}>
					<h2 className="form-headline-3">Applicant {repeat + 1}</h2>
            {
              React.Children.map(children, child => {
                if (child.type === Input) {
                  return React.cloneElement(child,
                    {
                      ...child.props,
                      onChange: onChangeHandler(child),
                      name: child.props.name?.replace(find, repeat + 1),
                      label: child.props.label?.replace(find, numberToLetters(repeat + 1)),
                    });
                }
                else if (child.type === RadioGroup) {
                  return React.cloneElement(child,
                    {
                      ...child.props,
                      radioText: child.props.radioText?.replace(find, numberToLetters(repeat + 1)),
                      children: React.Children.map(child.props.children, radioGroupChild => {
                          return React.cloneElement(radioGroupChild,
                            {
                              ...radioGroupChild.props,
                              name: radioGroupChild.props.name?.replace(find, repeat + 1),
                              onChange: onChangeHandler(radioGroupChild),
                            });
                        },
                      ),
                    });
                }
                else if (child.type === W50) {
                  return React.cloneElement(child,
                    {
                      ...child.props,
                      children: React.Children.map(child.props.children, inputChild => {
                          return React.cloneElement(inputChild, {
                            ...inputChild.props,
                            
                            onChange: onChangeHandler(inputChild),
                            name: inputChild.props.name?.replace(find, repeat + 1),
                            label: inputChild.props.label?.replace(find, numberToLetters(repeat + 1)),
                            required: index == 0 && (inputChild.props.label == "First name" || inputChild.props.label == "Last name") ? "required" : ""
                          });
                        },
                      ),
                    });
                }
              })
            }
          </RepeatedUnit>;
        })
      }
    </React.Fragment>
  );
};

FormRepeatableInput.propTypes = {
  question: PropTypes.string,
  initial: PropTypes.number,
  number: PropTypes.number,
  fixedNumber: PropTypes.number,
  name: PropTypes.string,
};

export default FormRepeatableInput;
