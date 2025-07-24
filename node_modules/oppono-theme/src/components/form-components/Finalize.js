import React from "react";
import { styled } from "frontity";
import Container from "../reusable/Container";
import Button from "./Button";
import { size } from "../../functions/size";
import { P } from "./StyledComponent";

export const FinalizeTable = styled.table`
  ${P.White} {
    padding-right: ${size(28)};
  }

	td {
		padding-bottomn: ${size(6)};
	}
`;

export const FinalizeHeading = styled.div`
	margin-bottom: 55px;
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
		margin-bottom: 1rem;
    color: #BFB6B480;
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

export const FinalizeRows = styled.div`
	overflow: hidden;

	&:not(:last-child) {
		padding-bottom: 21px;
		margin-bottom: 22px;
		border-bottom: 1px solid #BFB6B4;
	}

	&.larger  {
		font-size: ${size(16)};
		border-bottom-color: rgba(191,182,180, 0.5);
	}
`;

export const FinalizeRow = styled.div`
	display: flex;
	align-items: center;
	margin: 0 -10px 6px;
	justify-content: space-between;

	&:last-child {
		margin-bottom: 0;
	}
`;

export const FinalizeCol = styled.div`
	padding: 0 10px;

	&.full {
		width: 100%;
	}

	&.half {
		width: 50%;
	}
`;

export const FinalizePercentage = styled.div`
	margin: 40px 0 60px;
	text-align: center;

	h2 {
		margin-bottom: 1rem;
    color: #BFB6B480;
	}

	.meta {
		font-size: ${size(12)} !important;
		line-height: initial !important;
		color: #BFB6B480 !important;
	}
`;

export const FinalizeChild = styled.div`
  flex: 0 1 28%;
  width: 28%;
  padding: ${size(18)} ${size(10)} 0;

	&.size-sm {
		width: 12.5%;
		flex: 0 0 12.5%;

    @media (max-width: 575.98px) {
      width: 100%;
    }
	}

	&.size-md {
		width: 37.5%;
		flex: 0 0 37.5%;

    @media (max-width: 575.98px) {
      width: 100%;
    }
	}

	&.size-lg {
		width: 50%;
		flex: 0 0 50%;

    @media (max-width: 575.98px) {
      width: 100%;
    }
	}

  &.wide {
    flex-basis: 44%;
    width: 44%;
    @media (max-width: 575.98px) {
      flex-basis: 100% !important;
      width: 100% !important;
      &.full {
        width: 100%;
        flex-basis: 100%;
      }
    }
  }

  @media (max-width: 575.98px) {
    order: ${({ order }) => order};
    flex-basis: auto;
    width: auto;
    margin-bottom: 1rem;
    padding: 0 ${size(10)} 0 !important;
    &.full {
      width: 100%;
      flex-basis: 100%;

      table {
        width: 100%;

        td:first-of-type {
          text-align: left;
        }

        td:last-of-type {
          text-align: right;
        }
      }
    }
  }
`;

export const Top = styled.div`
  display: flex;
  align-items: flex-end;
  padding-bottom: ${size(23)};
  margin: ${size(30)} ${size(-10)} 0;
  position: relative;

	@media (max-width: 575.98px) {
    padding-bottom: 0;
  }

  &:after {
    content: "";
    height: ${size(1)};
    background: #bfb6b4;
    width: calc(100% - ${size(20)});
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    @media (max-width: 575.98px) {
      display: none;
    }
  }

  ${Button} {
    margin: ${size(15)} 0 0;
    padding: ${size(9)} ${size(36)};
    width: fit-content;
    @media (max-width: 575.98px) {
      margin-left: auto;
      margin-right: auto;
      width: ${size(184)};
    }
  }

  @media (max-width: 575.98px) {
    ${P.Num} {
      margin-top: 6px;
      margin-bottom: 14px;
    }
  }

  @media (max-width: 575.98px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
`;
export const Bottom = styled.div`
  display: flex;
  margin: 0 ${size(-10)};
  padding-top: 23px;
  flex-wrap: wrap;

  .form-wide-container {
    @media (min-width: 575.98px) {
      max-width: 85rem;
      margin: auto;
    }
  }

  @media (max-width: 575.98px) {
    flex-direction: column;
    padding-top: 0;
    flex-wrap: nowrap;
    align-items: center;
  }

  ${FinalizeChild} {
    @media (max-width: 991.98px) {
      &.wide {
        flex-basis: ${44 + 28}%;
        width: ${44 + 28}%;
        margin-left: auto;
      }
    }
    @media (max-width: 575.98px) {
      &.m-pr-40 {
        padding-right: 40px;
      }

      margin: auto;
      &.m-border {
        position: relative;
        margin-top: 22px;
        padding-top: 15px;

        &:after {
          content: "";
          height: ${size(1)};
          background: #bfb6b4;
          width: calc(100% - ${size(20)});
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
        }
      }
    }
  }
`;
const Finalize = ({ className, children }) => {
  return <div className={[className + " form-wide-container"]}>{children}</div>;
};

export default styled(Finalize)`

`;
