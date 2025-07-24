import axios from "axios";
import React from 'react';
import {styled} from 'frontity';
import Container from '../reusable/Container';
import Button from './Button';
import {size} from '../../functions/size';
import FormStep from "./FormStep";
import Input from "./Input";
import SelectAddress from "./SelectAddress";
import {P} from './StyledComponent';
import W50 from "./W50";

export const Address = ({address, city, postalCode, postalCodeOnChange}) => {


  React.useEffect(() => {
  }, []);

  const [cityValue, setCityValue] = React.useState('');
  const [postalCodeValue, setPostalCodeValue] = React.useState('')
  const loadOptions = async inputValue => {
    const formData = new FormData();
    formData.append('key', 'TR81-PT58-MU14-XW99');
    formData.append('SearchTerm', inputValue);

    let config = {
      method: 'post',
      url: 'https://ws1.postescanada-canadapost.ca/AddressComplete/Interactive/AutoComplete/v1.00/json3.ws',
      data: formData
    };
    const {data:{Items}} = await axios(config);
    return Items.filter(item=>item.IsRetrievable).map(item => ({...item, label: item.Text, value: item.Text}))
  }
  const selectOption = async (option, state) => {
    if (state.action !== 'select-option')return
    const formData = new FormData();
    formData.append('key', 'TR81-PT58-MU14-XW99');
    formData.append('Id', option.Id);

    let config = {
      method: 'post',
      url: 'https://ws1.postescanada-canadapost.ca/AddressComplete/Interactive/RetrieveById/v1.00/json3.ws',
      data: formData
    };
    const {data:{Items}} = await axios(config);
    setCityValue(Items[7].FormattedValue);
    setPostalCodeValue(Items[12].FormattedValue);
    postalCodeOnChange({target:{value:Items[12].FormattedValue}});
  }
  return <>
    <SelectAddress {...address} cacheOptions loadOptions={loadOptions} onChange={selectOption}/>
    <W50>
      <Input value={cityValue} readOnly type={'text'}{...city}/>
      <Input value={postalCodeValue} readOnly type={'text'} {...postalCode}/>
    </W50>

  </>;
};
