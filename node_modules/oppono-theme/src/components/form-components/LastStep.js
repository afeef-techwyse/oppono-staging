import React from 'react';
import {size} from '../../functions/size';
import {styled} from 'frontity';
import Link from '../reusable/Link';

const LastStep = ({ className, children }) => {
  return (
    <div className={className + ' last-step form-wide-container'}>
        {children}
    </div>
  );
};

export default styled(LastStep)`
	display: flex;
	align-items: center;
	max-width: ${size(895)};

	@media (max-width: 991.98px) {
		flex-direction: column;
	}

  img {
    width: 30%;
    height: auto;
    
    @media (max-width: 991.98px) {
			width: 100%;
			max-width: ${size(260)};
      margin-bottom: ${size(60)};
      margin-left: ${size(-32)};
    }
    
		@media (max-width: 991.98px) {
      margin-left: 0;
    }
  }

  > .text {
    text-align: left;
		width: 70%;		
		padding-left: ${size(75)};

		@media (max-width: 991.98px) {
			width: 100%;		
			padding-left: 0;
		}

    ol {
      padding-left: ${size(10)};
      
			@media (max-width: 991.98px) {
        padding-left: 0;
      }
    }

    &.tablet-center {
      .form-headline-3,
      .form-headline-1 {
        text-align: left;
        @media (max-width: 991.98px) {
          text-align: center;
          max-width: 85rem;
          margin-right: auto;
          margin-left: auto;
        }
      }
    }
  }

	.form-headline-1 {
		margin-bottom: ${size(12)};
	}

  .form-headline-3 {
    font-weight: 500;
		font-size: ${size(18)};
  }

  .btn-group {
    justify-content: space-bettween;

		@media (max-width: 991.98px) {
      justify-content: center;
    }
    @media (max-width: 575.98px) {
      flex-direction: column;
      align-items: center;
    }

    button {
			margin-right: ${size(50)}
			margin-left: ${size(50)}
			margin: ${size(33)} ${size(15)} 0 0;
    }
  }
`;
