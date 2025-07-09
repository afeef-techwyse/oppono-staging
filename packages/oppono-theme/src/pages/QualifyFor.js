import React from 'react';
import Form from '../components/form-components/Form';
import Input from '../components/form-components/Input';
import {connect, styled} from 'frontity';
import {beaconScore} from "../functions/beaconScore";
import {monthlyPayments} from "../functions/monthlyPayment";
import {numberWithCommas} from "../functions/numberWithCommas";
import {size} from '../functions/size';
import RadioInput from '../components/form-components/RadioInput';
import RadioGroup from '../components/form-components/RadioGroup';
import FormStep from '../components/form-components/FormStep';
import Button from '../components/form-components/Button';
import W50 from '../components/form-components/W50';
import intro_ball_1 from '../assets/images/form_1_img.png';
import intro_ball_2 from '../assets/images/form_2_img.png';
import MegaloNum_1 from '../assets/images/flying-1.png';
import MegaloNum_2 from '../assets/images/last-step.png';
import FlyingObjsContainer from '../components/reusable/FlyingObjsContainer';
import ProductsTable from '../components/form-components/ProductsTable';
import {P} from '../components/form-components/StyledComponent';
import Finalize, {Bottom, FinalizeChild, FinalizeTable, Top} from '../components/form-components/Finalize';
import useMedia from '../hooks/useMedia';
import FormRepeatableInput from '../components/form-components/FormRepeatableInput';
import ProductsMobileOption from '../components/form-components/ProductsMobileOption';
import Link from '../components/reusable/Link';
import MegaloNum from '../components/form-components/MegaloNum';
import useStoredFormValue from '../hooks/useStoredFormValue';
import NeedHelp from '../components/reusable/NeedHelp';

const QualifyFor = ({className, setCurrentTheme, state, actions, formData = {}}) => {
  const pageName = 'qualify-for';
  const getQualifyValues = useStoredFormValue(pageName);
  const section1Values = getQualifyValues(formData.section_1?.section_name);


  React.useEffect(() => {
    actions.theme.setSubHeader(formData.sub_header);
  }, [formData]);
  React.useEffect(() => {
    actions.theme.setLeadId();
    actions.theme.setStepResponse({});
  }, []);
  const media = useMedia();

  const [products, setProducts] = React.useState([null, null, null]);
  const [selectedProduct, setSelectedProduct] = React.useState(null);
  React.useEffect(() => {
    const newProducts = [
      state.theme.stepResponse.data?.data?.first?.products?.[0],
      state.theme.stepResponse.data?.data?.second?.products?.[0],
      state.theme.stepResponse.data?.data?.heloc?.products?.[0],
    ];
    newProducts[0]&&(newProducts[0].typeName = 'First mortgage');
    newProducts[1]&&(newProducts[1].typeName = 'Second mortgage');
    newProducts[2]&&(newProducts[2].typeName = 'HELOC');
    setProducts(newProducts);
  }, [state.theme.stepResponse.data?.data]);
  const mortgage = +section1Values('home_value') || 0;

  return <div className={className}>
    <Form setCurrentTheme={setCurrentTheme} endPoint={'/qualify-for'}>
      <FormStep endPoint={null} pageName={pageName} activeTheme={formData.section_1?.section_theme} stepName={formData.section_1?.section_name}>
        <FlyingObjsContainer childrenList={[
          {
            imageUrl: intro_ball_2,
            left: '10%',
            level: 1,
            top: '55%',
            type: 'image',
            width: 10,
            alt: 'alt',
          },
          {
            imageUrl: intro_ball_1,
            left: '80%',
            level: 1,
            top: '5%',
            type: 'image',
            width: 15,
            alt: 'alt',
          }]}/>
        <div className="form-text-wrapper">
          <h1 className={'form-headline-1 text-left'}>{formData.section_1?.title}</h1>
          <h2 className={'form-headline-2 primary'}>{formData.section_1?.subtitle}</h2>
        </div>
        <Input noScroll className={'big-input'} isCurrency type={'number'} name={'home_value'} {...formData.section_1?.home_value_input}/>
        <Button icon={true} className={'next-step wide'} label={'Next'}/>

        <NeedHelp lineOne={'Need help?'} lineTwo={'Contact us'} link={'/get-in-touch/'}/>

      </FormStep>
      <FormStep sendSteps={[
        formData.section_1?.section_name,
      ]} apiStepNumber={1} pageName={pageName} activeTheme={formData.section_2?.section_theme} stepName={formData.section_2?.section_name}>
        <div className="form-text-wrapper">
          <h1 className={'form-headline-1 text-left'}>{formData.section_2?.title}</h1>
        </div>

        <FormRepeatableInput question={formData.section_2?.applicant_amount_label} number={4} initial={1} name={'applicants_number'}>
          <W50>
            <Input type={'text'} name={'applicant_fname_{{number}}'} {...formData.section_2?.applicant.first_name_input}/>
            <Input type={'text'} name={'applicant_lname_{{number}}'} {...formData.section_2?.applicant.last_name_input}/>
            <Input type={'text'} pattern={'^[a-zA-Z0-9.!#$%&\'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$'} name={'applicant_mail_{{number}}'} {...formData.section_2?.applicant.email_input}/>
            <Input type={'phone'} isPhoneNumber name={'applicant_phone_{{number}}'} {...formData.section_2?.applicant.phone_input}/>
          </W50>
          <RadioGroup radioText={formData.section_2?.applicant.score_label} checked={'<650'}>
            <RadioInput label={'<650'} value={'<650'} name={`applicant_score_{{number}}`} type={'radio'}/>
            <RadioInput label={'650-679'} value={'650-679'} name={`applicant_score_{{number}}`} type={'radio'}/>
            <RadioInput label={'680-749'} value={'680-749'} name={`applicant_score_{{number}}`} type={'radio'}/>
            <RadioInput label={'750-799'} value={'750-799'} name={`applicant_score_{{number}}`} type={'radio'}/>
            <RadioInput label={'800+'} value={'800+'} name={`applicant_score_{{number}}`} type={'radio'}/>
          </RadioGroup>
        </FormRepeatableInput>
        <div className="btn-group">
          <Button className={'bordered prev-step'} label={'Back'}/>
          <Button icon={true} label={'Next'} className={'next-step'}/>
        </div>
      </FormStep>
      <FormStep endPoint={null} pageName={pageName} activeTheme={formData.section_3?.section_theme} stepName={formData.section_3?.section_name}>
        <div className="form-text-wrapper wide-text">
          <h1 className={'form-headline-1 text-left'}>{formData.section_3?.title}</h1>
          <h2 className={'form-headline-3 primary'}>{formData.section_3?.subtitle}</h2>
        </div>

        {media !== 'mobile'
            ? <ProductsTable>
              <thead>
              <tr>
                <th scope={'col'}>
                </th>
                {
                  products.map(product=>
                    product&&<th key={product.ID} scope={'col'}>
                      <P.Dark>{product.typeName}</P.Dark>
                      <p>${numberWithCommas(monthlyPayments(mortgage, +product.fields.rate / 100))} / month</p>
                      <p className={'number'}>{product.fields.rate}%</p>
                      <Button className={'small next-step'} onClick={()=>{
                        setSelectedProduct(product)
                        setTimeout(() => actions.theme.setValidateAndNextCallback(new Date().getTime()), 100);
                      }} label={'I want this deal'}/>
                    </th>
                  )
                }
              </tr>
              </thead>
              <tbody>
              <tr className={'head'}>
                <td scope={'row'} className={'white'}><strong>Fixed rate</strong></td>
                {
                  products.map((product,index)=>
                      product&&
                      <td key={product.ID} className={'details'} data-label="Fixed rate">{index!==2?+product.fields.rate+'%':'--'}</td>
                  )
                }
              </tr>
              <tr className={'head'}>
                <td scope={'row'} className={'white'}><strong>Lender fee</strong></td>
                {
                  products.map(product=>
                      product&&
                      <td key={product.ID} className={'details'} data-label="Lender fee">{product.fields.fee}%</td>
                  )
                }
              </tr>
              <tr className={'head last-head'}>
                <td scope={'row'} className={'white'}><strong>Max LTV</strong></td>
                {
                  products.map(product=>
                      product&&
                      <td key={product.ID} className={'details'} data-label="LTV">{product.fields.maximum_ltv}%</td>
                  )
                }
              </tr>
              </tbody>
            </ProductsTable>
            : <div className="mortgage-options-mobile">
              {
                products.map((product, index)=>
                    product&&
                    <ProductsMobileOption key={product.ID}>
                      <div className="mortgage-title">
                        <p className={'circle'}>{index+1}</p>
                        <p>{product.typeName}</p>
                      </div>
                      <div className="mortgage-head">
                        <p className={'number'}>{product.fields.rate}%</p>
                        <p>${numberWithCommas(monthlyPayments(mortgage, +product.fields.rate / 100))} / month</p>
                        <Button className={'small next-step'} onClick={()=>{
                          setSelectedProduct(product)
                          setTimeout(() => actions.theme.setValidateAndNextCallback(new Date().getTime()), 100);
                        }} label={'I want this deal'}/>
                      </div>
                      <div className="mortgage-body">
                        <div className={'m-row m-head'}>
                          <p className="white"><strong>Fixed rate</strong></p>
                          <p>{index!==2?+product.fields.rate+.25+'%':'--'}</p>
                        </div>
                        <div className={'m-row m-head'}>
                          <p className="white"><strong>Lender fee</strong></p>
                          <p>{product.fields.fee}%</p>
                        </div>
                        <div className={'m-row m-head  m-head last-head'}>
                          <p className="white"><strong>LTV</strong></p>
                          <p>{product.fields.maximum_ltv}%</p>
                        </div>
                      </div>
                    </ProductsMobileOption>
                )
              }

            </div>
        }
        <div className="btn-group">
          <Button className={'bordered prev-step'} label={'Back'}/>
        </div>
      </FormStep>
      <FormStep pageName={pageName} activeTheme={formData.section_4?.section_theme} stepName={formData.section_4?.section_name}>
        <MegaloNum>
          <h1 className={'primary form-headline-1'}>{formData.section_4?.title}</h1>
          <p className={'primary number'}>{selectedProduct?.fields.rate}</p>
        </MegaloNum>
        <FlyingObjsContainer childrenList={[
          {
            imageUrl: MegaloNum_1,
            left: '17%',
            level: 1,
            top: '16%',
            type: 'image',
            width: 9,
            alt: 'alt',
          },
          {
            imageUrl: MegaloNum_2,
            left: '64%',
            level: 1,
            top: '20%',
            type: 'image',
            width: 9,
            alt: 'alt',
          }]}/>
        <div className="btn-group megalonum">
          <Link href={'/dashboard/c/'}><Button focusable={false} className={'wide-vertical'} label={state.theme.user.logged ? 'I want this deal' : 'Sign in to get this deal'}/></Link>

          <Link href={'/d/'} ><Button focusable={false} className={'next-step bordered wide-vertical'} label={'No, let’s see the full list'}/></Link>
        </div>
        <Finalize className={'mt-0'}>
          <Top/>
          <Bottom>
            {media === 'mobile' ? null : <FinalizeChild order={1}/>}
            {media !== 'mobile'
                ? <FinalizeChild order={2} className={'full m-border'}>
                  <FinalizeTable>
                    <tbody>
										<tr>
                      <P.White as={'td'}><strong>Max LTV</strong></P.White>
                      <P.D as={'td'}>Up to {selectedProduct?.fields.maximum_ltv}%</P.D>
                    </tr>
                    <tr>
                      <P.White as={'td'}><strong>Credit score</strong></P.White>
                      <P.D as={'td'}>{beaconScore(selectedProduct?.fields.beacon_score)}</P.D>
                    </tr>
                    <tr>
                      <P.White as={'td'}><strong>Fixed rate</strong></P.White>
                      <P.D as={'td'}>{+selectedProduct?.fields.rate+.25}%</P.D>
                    </tr>
                    <tr>
                      <P.White as={'td'}><strong>Lender fee</strong></P.White>
                      <P.D as={'td'}>{selectedProduct?.fields.fee}%</P.D>
                    </tr>
                    </tbody>
                  </FinalizeTable>
                </FinalizeChild>
                : <FinalizeChild className={'full'} order={1}>
                  <FinalizeTable>
                    <tbody>
										<tr>
                      <P.White as={'td'}><strong>Max LTV</strong></P.White>
                      <P.D as={'td'}>Up to {selectedProduct?.fields.maximum_ltv}%</P.D>
                    </tr>
                    <tr>
                      <P.White as={'td'}><strong>Credit score</strong></P.White>
                      <P.D as={'td'}>{beaconScore(selectedProduct?.fields.beacon_score)}</P.D>
                    </tr>
                    <tr>
                      <P.White as={'td'}><strong>Fixed rate</strong></P.White>
                      <P.D as={'td'}>{+selectedProduct?.fields.rate+.25}%</P.D>
                    </tr>
                    <tr>
                      <P.White as={'td'}><strong>Lender fee</strong></P.White>
                      <P.D as={'td'}>{selectedProduct?.fields.fee}%</P.D>
                    </tr>
                    </tbody>
                  </FinalizeTable>
                </FinalizeChild>}

            <FinalizeChild order={3} className={'wide m-pr-40'}>
              {selectedProduct?.fields.specifications.map(({term_id, name}) => <P.Border key={term_id}>{name}</P.Border>)}
            </FinalizeChild>
          </Bottom>
        </Finalize>
        <div className="btn-group">
          <Button className={'bordered prev-step'} label={'Back'}/>
        </div>
      </FormStep>

    </Form>
  </div>;
};

export default styled(connect(QualifyFor))`
  width: 100%;
  height: 100%;

  ${Finalize}.mt-0 {
    margin-top: 0;

    ${Bottom} {
      @media (max-width: 575.98px) {
        margin-top: ${size(20)};
      }
    }
  }

	.form-wide-container {
		margin-top: 4rem;
    max-width: initial !important;
	}

  .btn-group.megalonum {
		justify-content: space-around;
		max-width: 600px;
    ${Link}:first-of-type {
			@media (min-width: 575.98px) {
				margin-right: ${size(55)};
			}
    }

    button {
      margin-top: 0;
      margin-right: 0;
      @media (max-width: 575.98px) {
        margin-bottom: ${size(20)};
      }
    }
  }
`;
