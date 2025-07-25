import React from 'react';
import debounce from '../functions/debounce';
import opponoApi from '../opponoApi';

export default function useFlowAppraisers() {
  const [appraiser, setAppraiser] = React.useState([{}]);
  
  const onChange = debounce((event) => {
    const postalCode = event?.target?.value;
    if (!postalCode || postalCode.length < 3) {
      setAppraiser([{}]);
      return;
    }
    const data = new FormData();
    data.append('postal_code', postalCode.trim().slice(0, 3));
    opponoApi.post('/appraiser-lookup', data)
      .then(response => {
        response.data.length > 2
                ? setAppraiser([{}])
                : setAppraiser(response.data);
          },
      );
  }, 1000);
  return [appraiser, onChange];
}