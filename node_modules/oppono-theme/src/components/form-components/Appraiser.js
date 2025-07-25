import React from 'react';
import {size} from '../../functions/size';
import {styled} from 'frontity';
import Container from '../reusable/Container';
import classnames from 'classnames';

const Appraiser = ({className, children, wide}) => {
  return (
    <div className={classnames('radio-input', className, {'appraiser-wide': wide})}>
      {wide ? <Container>
        {children}
      </Container> : <>{children}</>}
    </div>
  );
};

export default styled(Appraiser)`
	padding-top: ${size(55)};
	margin-top: ${size(55)};
	border-top: 1px solid #BFB6B4;

	.appraiser {
		margin-top: 28px;
		padding: 17px 18px;
		background-color: #112D2B;
		border: 1px solid #BFB6B4;
		border-radius: 23px;
		box-shadow: 0 3px 20px rgba(0, 0, 0, 0.16);
	}

	.appraiser-heading {
		h2 {
			color: #BFB6B480 !important;
		}
	}

	.appraiser p + p,
	.appraiser__name {
		margin-bottom: ${size(12)};

		&:last-child {
			margin-bottom: 0;
		}
	}


	.appraiser a {
		color: #fff;
	}

	.row{
		display: flex;
		@media(max-width: 991.98px){
			flex-direction: column;
			align-items: center;
		}
	}
	.form-headline-1{
		@media(max-width: 991.98px){
			br{
				display: none;
			}
			text-align: center!important;
			margin-bottom: ${size(50)};
		}
		@media(max-width: 575.98px){
			text-align: left!important;
			margin-bottom: ${size(10)};
		}
	}

	.col-left{
		width: 30%;

		@media(max-width: 575.98px){
			width: 100%;
		}
	}

	.col-right{
		flex: 1;
		padding-top: ${size(17)};
		padding-left: 3rem;
		position: relative;

		&:before {
			content: "";
			border-left: 1px solid #BFB6B4;
			position: absolute;
			width: 100%;
			height: 77%;
			bottom: 0;
			left: 0;
		}

		.greyedText {
			color: #bfb6bf !important;
		}


		@media(max-width: 991.98px){
			width: 100%;
			padding-left: 0;

			&:before {
				display: none;
			}

			.radio-input a span {
				display: none;
			}
		}

		> P {
			margin-bottom: ${size(25)};
		}

		button{
			margin: ${size(30)} 0 0;
			border-radius: 0;
			background: transparent;
			border: ${size(1)} solid rgba(191, 182, 180, 0.1);
			padding: ${size(12)} ${size(36)};
		}
	}

	.vertical-radio{
		margin-bottom: ${size(37)};

		.radio-group{
			display: flex;
			flex-direction: column;
		}
	}

	.form-group{
		margin-top: 0;

		label{
			@media(max-width: 991.98px){
				max-width: 100%;
			}

			@media(max-width: 575.98px){
				flex-direction: column;
				align-items: flex-start;
			}
		}
		.label-text{
			display: none;
		}
	}
	&.appraiser-wide{
	max-width: 86rem;
	margin-right: auto;
	margin-left: auto;
	padding-top: 0;
	margin-top: 0;
	border-top:none;
	.col-left{
		width: 30%;
		margin-top: ${size(15)};
		@media(max-width: 575.98px){
			width: 100%;
		}
	}
	.form-group{
	.label-text{
			text-align: right;
			display: block;
			margin-right: ${size(10)};
			@media(max-width: 991.98px){
				margin-bottom: 0;
			}
			@media(max-width: 575.98px){
				display: none;
			}
		}
  }
}
`;

