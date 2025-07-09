import React from 'react';
import {Address} from "../../components/form-components/Address";
import Form from '../../components/form-components/Form';
import {connect, styled} from 'frontity';
import FormStep from '../../components/form-components/FormStep';
import RadioGroup from '../../components/form-components/RadioGroup';
import RadioInputVertical from "../../components/form-components/RadioInputVertical";
import FlyingObjsContainer from '../../components/reusable/FlyingObjsContainer';
import Finalize, {
	FinalizeHeading,
} from "../../components/form-components/Finalize";
import Appraiser from '../../components/form-components/Appraiser';
import {P} from '../../components/form-components/StyledComponent';
import Button from '../../components/form-components/Button';
import LastStep from '../../components/form-components/LastStep';
import intro_ball_1 from '../../assets/images/flying-1.png';
import intro_ball_2 from '../../assets/images/flying-2.png';
import Input from '../../components/form-components/Input';
import RadioInput from '../../components/form-components/RadioInput';
import W50 from '../../components/form-components/W50';
import Select from '../../components/form-components/Select';
import Alert from '../../components/form-components/Alert';
import Link from '../../components/reusable/Link';
import {size} from '../../functions/size';
import useStoredFormValue from '../../hooks/useStoredFormValue';
import useFlowAppraisers from "../../hooks/useFlowAppraisers";
import AppraiserInput from '../../components/AppraiserInput';
import debounce from '../../functions/debounce';
import opponoApi from '../../opponoApi';
import useAddress from '../../contexts/AddressProvider'

const pageName = 'e';
const EPage = ({className, setCurrentTheme, actions, state, formData}) => {
  const getEValues = useStoredFormValue(pageName);
  const section1Values = getEValues(formData.section_1?.section_name);
  const section2Values = getEValues(formData.section_2?.section_name);
  const [postalCodeErrorMessage, setPostalCodeErrorMessage] = React.useState('');
  const [[appraiser], postalCodeOnChange] = useFlowAppraisers();

  const { address, handleAddressChange } = useAddress();

  React.useEffect(() => {
    actions.theme.setSubHeader(formData.sub_header);
  }, [formData]);
  React.useEffect(() => {
    actions.theme.setLeadId();
    if ( address.postalCode || address.city  ) {
      postalCodeOnChange({target: {value: address.postalCode}})
    }
  }, []);

  const selectedAppraiser = JSON.parse(section2Values('selected-appraiser')||'{}')

  return <div className={className}>
    <Form setCurrentTheme={setCurrentTheme} startingStep={ address.postalCode || address.city ? 2 : null }>
      <FormStep pageName={pageName} activeTheme={formData.section_1?.section_theme} stepName={formData.section_1?.section_name}>
        <FlyingObjsContainer childrenList={[
          {
            imageUrl: intro_ball_2,
            left: '10%',
            level: 1,
            top: '55%',
            type: 'image',
            width: 5,
            alt: 'alt',
          },
          {
            imageUrl: intro_ball_1,
            left: '80%',
            level: 1,
            top: '5%',
            type: 'image',
            width: 9,
            alt: 'alt',
          }]}/>
        <div className="form-text-wrapper">
          <h1 className={'form-headline-1 text-left'}>{formData.section_1?.title}</h1>
          <h2 className={'form-headline-2 primary'}>{formData.section_1?.subtitle}</h2>
        </div>
        <Address
            address={{name: 'address', noScroll: true, ...formData.section_1?.address_input}}
            city={{name: 'city', ...formData.section_1?.city_input}}
            postalCode={{name: 'postal_code', ...formData.section_1?.postal_code_input}}
            postalCodeOnChange={postalCodeOnChange}
        />
        <Button icon={true} className={'next-step'} label={'Next'}/>
      </FormStep>
      <FormStep pageName={pageName} activeTheme={formData.section_2?.section_theme} stepName={formData.section_2?.section_name}>
        {appraiser?.fields
            ? 				<Appraiser className="full-width no-top-border">
							<div className="appraiser-heading">
								<h1 className={'form-headline-1 text-left'}>{formData.section_2?.title}</h1>
								<h2 className={'form-headline-2 primary'}>{formData.section_2?.subtitle}</h2>
							</div>
              <div className="row">
                <div className="col-left">
								<RadioGroup className={'vertical-radio'} radioText={'*Click to call'}>
                    {appraiser?.fields?.preferred_appraisal_company.map((appraiser, index) => {
                      const endpoint = `/appraiser/${appraiser.post_name}`;
                      const appraiserSource = state.source.get(endpoint);
                      const appraiserData = state.source[appraiserSource.type]?.[appraiserSource.id];
                      !appraiserSource.isReady && !appraiserSource.isFetching && actions.source.fetch(endpoint)
                      return <AppraiserInput
                          key={index} name={'selected-appraiser'}
                          value={JSON.stringify(appraiserData?.acf || index)}
                          label={appraiserData?.acf.company || 'Getting Info...'}
                          number={appraiserData?.acf.phone}
                          website={appraiserData?.acf.website}
                          email={appraiserData?.acf.email}
                          className={"noRadio"}/>;
                    })}
                  </RadioGroup>
									<P.Dark>*Disclaimer<br/>
									If the city you are looking for is not listed please contact your BDM directly or email us at info@oppono.com</P.Dark>
                </div>
                <div className="col-right">
                  <div className="appraiser-container">
										<p className="label">BDM contact</p>
										<p className={'name'} dangerouslySetInnerHTML={{__html: appraiser?.fields?.bdm.name}}/>
										<p className={'phone'} dangerouslySetInnerHTML={{__html: appraiser?.fields?.bdm.phone}}/>
										<p className={'email'} dangerouslySetInnerHTML={{__html: appraiser?.fields?.bdm.email}}/>
									</div>
                </div>
              </div>
							<div className="row">
								<div className="btn-group">
									<Link href={'/dashboard/'}><Button focusable={false} className={'bordered'} label={'Back to the Dashboard'}/></Link>
								</div>
							</div>
            </Appraiser>
            : <Appraiser wide>
              <div className="row">
                <div className="col-left">
                  <p className={'form-headline-1 text-left'}>NO APPRAISERS</p>
									<P.Dark>Can not find any appraisers for
                    the {address.city ? address.city : section1Values('city')} {address.postalCode ? address.postalCode : section1Values('postal_code')}</P.Dark>
                </div>
              </div>
              <div className="btn-group">
                <Button className={'prev-step'} onClick={() => handleAddressChange({})} label={'Select other area'}/>
              </div>
            </Appraiser>
        }
      </FormStep>
    </Form>
  </div>;
};

export default styled(connect(EPage))`
  width: 100%;
  height: 100%;

	.no-top-border {
		border-top: none !important;
		margin-top: 0;
	}

  .titleText {
    font-size: ${size(29)} !important;
    line-height: 1.3 !important;
  }

  .lighter-text {
    color: #BFB6B480;
  }

  .no-padding {
    margin-left: -5.5rem !important;
    margin-right: -5.5rem !important;
    margin-bottom: 3rem;

    @media(max-width: 991.98px){
      margin-left: -2.5rem !important;
      margin-right: -2.5rem !important;
    }
  }

  .notification-section {
    .label-text {
      font-size: ${size(14)};
    }

    .form-group {
      margin-bottom: 5rem;
      margin-top: 0;
    }
  }

	.row {
		margin-top: 4rem;
		position: relative;
	}

	.col-left {
		width: 90% !important;

		.radio-group {
			padding-right: 4.5rem;
			border-right: 1px solid #BFB6B4;
			padding-bottom: 2rem;
		}

		@media (max-width: 998px) {
			border-bottom: 1px solid #BFB6B4;
			margin-bottom: 4.5rem;
			padding-bottom: 4.5rem;
		}
	}

	.full-width > .container {
		width: 100%;
	}

	.appraiser-container {
		position: absolute;
		background: #212133;
		border: 1px solid #BFB6B4;
		border-radius: 23px;
		padding: 2rem;
		margin-left: 4.5rem;
		top: -2rem;

		@media (max-width: 998px) {
			position: relative;
			margin-left: 0;
		}

		.label {
			font-weight: 500;
			color: #36808B;
			font-size: ${size(14)};
			margin-bottom: 0.5rem;
		}

		.name {
			font-weight: 300;
			color: #BFB6B4;
			font-size: ${size(23)};
			margin-bottom: 1.5rem;
		}

		.phone {
			font-weight: 500;
			color: #FFF;
			font-size: ${size(14)};
			margin-bottom: 1rem;
		}
		.email {
			font-weight: 500;
			color: #FFF;
			font-size: ${size(14)};
		}
	}

  .fix-filter-e {
    margin-bottom: ${size(22)};
    border-bottom: ${size(1)} solid #bfb6b4;
    max-width: 85rem;
    padding-bottom: ${size(22)};
    align-items: center;


  }

	@media (max-width: 998px) {
		.radio-text {
			white-space: nowrap;
		}

		.radio-group {
			padding-right: 0;
			border-right: 0;

			.radio-input {
				padding-top: 0;
				border-bottom: 1px solid #B5D2FF33;
				a {
					span {
						display: none;
					}
				}
			}
		}
	}

	.notification {
		margin-top: 5rem;

		h2 {
			color: #BFB6B480;
			margin-bottom: 1.5em;
		}

		p {
			font-size: ${size(14)};
			color: #BFB6B4;
			line-height: 1.3;
		}
	}

	.radio-input {
		margin-top: 1.2rem !important;

		@media screen (max-width: 998px) {
			padding-bottom: 0;
		}
	}

	.btn-group button {
		margin-top: 2rem;
	}

  .vertical-radio {
    label a {
      color: #FFF;
			min-width: 21rem;
			display: flex;
			justify-content: space-between;
			align-items: center;
    }
  }

  ${RadioGroup}.request-type {
    margin-right: auto;
    margin-left: auto;
  }
`;
