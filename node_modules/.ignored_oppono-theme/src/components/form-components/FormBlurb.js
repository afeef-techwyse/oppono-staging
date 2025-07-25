import React from 'react';
import {styled} from 'frontity';

const FormBlurb = ({className, children}) => {
  return (
		<div className="form-group">
			<div className={`form-blurb ${className}`}>
				{children}
			</div>
		</div>
  );
};

export default styled(FormBlurb)`
	text-align: center;
	margin: 80px auto 0;
	font-size: 24px;
	line-height: 1.31;
	color: #BFB6B4;

	strong {
		color: #fff;
		font-size: 28px;
		font-weight: 500;
	}
`;