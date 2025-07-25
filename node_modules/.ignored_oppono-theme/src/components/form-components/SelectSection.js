import React from "react";
import { styled } from "frontity";
import { size } from "../../functions/size";

export const SelectScreen = styled.div`
	.filters {
		margin-left: 0;
	}
`;

export const SelectHeading = styled.div`
	color: #BFB6B4;
	font-size: ${size(14)};
	line-height: 1.14;

	.bolder {
		font-weight: 500;
	}

	h1 {
		margin-bottom: 20px;
		font-size: ${size(40)};
		line-height: 1;
	}

	h2 {
		font-size: ${size(18)};
		margin-bottom: 1rem;
    color: #BFB6B480 !important;
	}

	h3 {
		font-size: ${size(29)};
		margin-top: 3rem;
	}

	p {
		margin-bottom: 15px;

		&:last-child: {
			margin-bottom: 0;
		}
	}

	span {
		color: #0E9564;
	}
`;

const SelectSection = ({ className, children }) => {
  return <div className={[className + " form-wide-container"]}>{children}</div>;
};

export default styled(SelectSection)`

`;
