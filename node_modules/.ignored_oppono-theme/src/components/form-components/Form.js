import React from "react";
import { connect, css, Global, styled, Head } from "frontity";
import PropTypes from "prop-types";
import classnames from "classnames";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { size } from "../../functions/size";
import FormStep from "./FormStep";
import StepsProgress from "./StepsProgress";

gsap.registerPlugin(ScrollToPlugin);
const Form = ({
  className,
  children,
  wide,
  actions,
  state,
  endPoint,
  setCurrentTheme,
  startingStep,
  hideStepsProgress,
}) => {
  const innerRef = React.useRef(null);
  const [activeStep, setActiveStep] = React.useState(
    startingStep ? startingStep - 1 : 0
  );
  const [loading, setLoading] = React.useState(false);
  const initial = React.useRef(true);
  const reversed = React.useRef(true);
  const allStepsNames = React.useRef([]);

  const resetCallback = () => {
    reversed.current = true;
    setActiveStep(0);
  };
  const nextCallback = () => {
    initial.current = false;
    reversed.current = false;
    setActiveStep((prevState) => prevState + 1);
  };
  const prevCallback = () => {
    reversed.current = true;
    setActiveStep((prevState) => prevState - 1);
  };

  React.useEffect(() => {
    gsap.to(window, { scrollTo: 0, duration: 0.2 });
  }, [activeStep]);

  React.useEffect(() => {
    // innerRef.current.querySelector('input:not([type=hidden]), select')?.focus();
    let stepsCounter = 0;
    React.Children.forEach(children, (child) => {
      if (child.type === FormStep) {
        stepsCounter++;
        allStepsNames.current.push(child.props.stepName);
      }
    });
    actions?.theme.setActiveStep({
      total: stepsCounter,
      allStepsNames: allStepsNames.current,
    });
  }, []);
  return (
    <>
      <Global
        styles={css`
          html {
            overflow-y: scroll;
          }
        `}
      />
      <div ref={innerRef} className={classnames(className, { wide })}>
        {state.theme.activeStep.total > 1 && !hideStepsProgress ? (
          <StepsProgress />
        ) : null}
        {React.Children.map(children, (child, index) => {
          return React.cloneElement(child, {
            ...child.props,
            endPoint:
              child.props.endPoint === undefined
                ? endPoint
                : child.props.endPoint,
            active: activeStep === index,
            stepIndex: index,
            initial: initial.current,
            setCurrentTheme,
            nextCallback,
            prevCallback,
            resetCallback,
            setLoading,
            allStepsNames: allStepsNames.current,
          });
        })}
      </div>
      <div className={classnames("waiting-screen", { active: loading })}>
        Loading...
      </div>
    </>
  );
};

Form.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  wide: PropTypes.bool,
};

export default styled(connect(Form))`
	position: relative;
  padding: ${size(165)} 25px 0;

	&.wide {
    max-width: 100%;
  }

	@media (max-width: 575.98px) {
    padding-top: ${size(200)};
  }

  ${StepsProgress} {
    position: fixed;
    top: 19.5rem;
    left: ${size(55)};
    z-index: 100;

		& > div {
			margin: 1.7rem 0 !important;
		}

    @media (max-width: 575.98px) {
      display: none;
    }
  }

  .error-message {
    color: red;
    font-size: ${size(16)};
    font-weight: 400;
    margin-top: ${size(50)};
    text-align: center;
    display: block;

    a {
      color: inherit;
      text-decoration: underline;
    }
  }
`;
