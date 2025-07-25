import React from "react";
import {connect, styled} from "frontity";
import {size} from "../../functions/size";
import classnames from "classnames";

const StepsProgress = styled(
    connect(({className, state, horizontal = false}) => {
      const [active, setActive] = React.useState(0);
      return (
          <div className={className} data-mob={horizontal} style={{flexDirection:horizontal?'row':'column'}}>
            {
              [
                ...Array(state.theme.activeStep.total || 0).keys(),
              ].map((index) =>
                  <div key={index}
                       className={classnames('step-indicator',
                           {
                             active: index === state.theme.activeStep.current,
                             finished: index < state.theme.activeStep.current
                           })}
                       style={{
                         height: horizontal
                             ? "100%"
                             : (100 / state.theme.activeStep.total + 4) + "%",
                         width: !horizontal
                             ? "100%"
                             : 100 / state.theme.activeStep.total + "%",
                       }}
                  >
                    <div className="step-name">{state.theme.activeStep.allStepsNames[index]} <span className="checkmark"><svg aria-hidden="true" focusable="false" data-prefix="fal" data-icon="check" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="svg-inline--fa fa-check fa-w-14 fa-2x"><path fill="currentColor" d="M413.505 91.951L133.49 371.966l-98.995-98.995c-4.686-4.686-12.284-4.686-16.971 0L6.211 284.284c-4.686 4.686-4.686 12.284 0 16.971l118.794 118.794c4.686 4.686 12.284 4.686 16.971 0l299.813-299.813c4.686-4.686 4.686-12.284 0-16.971l-11.314-11.314c-4.686-4.686-12.284-4.686-16.97 0z" className=""></path></svg></span></div>
                  </div>
              )
            }

          </div>
      );
    })
)`
  position: relative;
	
	&[data-mob="true"] {
		display: flex !important;
	}
  
	@media screen and (min-width: 998px) {
		width: 2px;
		&[data-mob="true"] {
			display: none !important;
		}
	}
  height: ${({horizontal}) => (!horizontal ? "" : `2px`)};
  background-color: rgba(191, 182, 180, 0.1);
  display: flex !important;
  //align-items: stretch;
  //justify-content: stretch;

  &:after {
    content: "";
    width: ${({horizontal}) => (horizontal ? "120%" : size(20))};
    height: ${({horizontal}) => (!horizontal ? "120%" : size(20))};
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 100;
    cursor: pointer;
  }

  .step-indicator {
    position: relative;
    width: 100%;
    transition: transform 500ms;
    background-color: rgba(191, 182, 180, 0.5);
    box-sizing: border-box;

    .step-name {
      position: absolute;
      left: ${size(15)};
      padding-left: 8px !important;
      top: 50%;
      transform: translateY(-50%);
      pointer-events: none;
			opacity: 0.5;
      transition: opacity 400ms;
      color: #bfb6b4;
      font-size: ${size(12)};
      font-weight: 400;
      text-align: left;
      text-transform: capitalize;
      white-space: nowrap;

			@media screen and (max-width: 998px) {
				display: none;
			}
    }

		span.checkmark {
			position: absolute;
			right: -24px;
			top: 1px;
			width: 13px;
			height: 13px;
			border: 1px solid #fff;
			border-radius: 100%;
			text-align: center;
			opacity: 0;
			margin: auto;
			top: 0;
			bottom: 0;

			svg {
				width: 7px;
				position: absolute;
				color: inherit!important;
				left: 0;
				right: 0;
				margin: auto;
				top: 0;
				bottom: 0;
			}
		}

    &.active {
      background-color: #0c9564;

      .step-name {
				opacity: 1;
        color: #0c9564;

      }
    }

    &.finished {
      background-color: white;

      .step-name {
				opacity: 1;
        color: white;

				span.checkmark {
					opacity: 1;
				}

      }
    }

  }

  &:hover {
    .current {
      background-color: green;
    }

    .step-name {
      opacity: 1;
    }
  }
`;

export default StepsProgress;
