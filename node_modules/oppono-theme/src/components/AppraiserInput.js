import React from 'react';
import {connect} from 'frontity';
import RadioInputVertical from './form-components/RadioInputVertical';

export default connect(({appraiserName, className, state, actions, ...props}) => {
  const endpoint = `/appraiser/${appraiserName}`;
  const appraiser = state.source.get(endpoint);
  const appraiserData = state.source[appraiser.type]?.[appraiser.id];
  
  React.useEffect(() => {
    !appraiser.isReady && !appraiser.isFetching && actions.source.fetch(endpoint);
  }, []);
  
  return <RadioInputVertical
      value={appraiserData?.acf.phone}
      name={'call'}
      label={appraiserData?.acf.company || 'Getting Info...'}
      number={appraiserData?.acf.phone}
      website={appraiserData?.acf.phone}
      email={appraiserData?.acf.email}
      className={className}
      {...props}/>;
});
