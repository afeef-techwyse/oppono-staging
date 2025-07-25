import React from "react";
import { styled } from "frontity";
import { size } from "../../functions/size";

export const P = {};
P.D = styled.p`
  color: #bfb6b4 !important;
  font-size: ${size(14)} !important;
  font-weight: 400 !important;
  line-height: ${size(24)} !important;

	strong {
		font-weight: 500;
	}

	@media (max-width: 575.98px) {
    font-size: ${size(16)};
  }
`;
P.Num = styled.p`
  color: #bfb6b4;
  font-size: ${size(56)};
  font-weight: 300;
  line-height: ${size(64)};
	margin-bottom: ${size(10)};

	&.smaller {
		font-size: ${size(30)};
		margin-top: 2.5rem;
		margin-bottom: 0;
	}
`;
P.Cost = styled.p`
  color: #bfb6b4;
  font-size: ${size(40)};
  font-weight: 200;
  line-height: 1.275;
`;
P.F29 = styled(P.D)`
  font-size: ${size(29)};
  line-height: ${size(40)};
  font-weight: 300;
  @media (max-width: 991.98px) {
    font-size: ${size(24)};
    line-height: normal;
  }
`;
P.Small = styled(P.D)`
	font-size: ${size(12)};
`;
P.Large = styled(P.D)`
	font-size: ${size(16)};
`;
P.Dark = styled(P.D)`
  opacity: 0.5;
`;
P.White = styled(P.D)`
	color: #fff !important;
`;
P.Border = styled(P.D)`
  padding-bottom: ${size(20)};
	margin-bottom: ${size(20)};
  border-bottom: ${size(1)} solid rgba(191, 182, 180, 0.5);
`;
P.Circle = styled(P.D)`
	display: flex;
	align-items: center;
	justify-content: center;
	width: ${size(33)};
	height: ${size(33)};
	border: ${size(1)} solid rgba(191, 182, 180, 0.5);
	border-radius: 50%;
	font-size: ${size(20)};
	font-weight: 500;
`;
export const Span = {};
Span.D = styled.span`
  font-size: ${size(16)};
  line-height: ${size(21)};
  font-weight: 600;
  font-style: normal;
  letter-spacing: normal;
  opacity: 1;
`;
Span.isGreen = styled.span`
	color: #239f9f;
`;
Span.isLightgreen = styled.span`
	color: #0E9564;
`;
Span.isWhite = styled.span`
	color: #ffffff;
`;
Span.Green = styled(Span.D)`
  color: #239f9f;
`;
Span.White = styled(Span.D)`
  color: #ffffff;
`;
export const Ul = styled.ul`
  margin-left: ${size(46)};
`;
export const Ol = styled.ol`
	margin-left: ${size(28)};
	margin-top: ${size(25)};
`;
export const Li = styled.li`
  font-size: ${size(16)};
  line-height: ${size(21)};
  margin-bottom: ${size(21)};
`;

export const Wysiwyg = styled.div`
	color: #bfb6b4;
	font-size: ${size(18)};
	line-height: ${size(24)};
	font-weight: 500;

	@media (max-width: 575.98px) {
		font-size: ${size(16)};
	}

	ul {
    margin-left: ${size(46)};
  }

  ol {
    margin-left: ${size(28)};
    margin-top: ${size(25)};
  }

  Li {
    color: rgba(192, 182, 180, 0.7);
    font-size: ${size(16)};
    line-height: ${size(21)};
    margin-bottom: ${size(21)};
  }
`;
