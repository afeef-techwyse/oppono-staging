import React from "react";
import { connect, styled } from "frontity";
import Footer from "../components/Footer";
import Header from "../components/Header";
import mapInfo from "../assets/images/map-info-bg.png";
import Input from "../components/form-components/Input";
import Button from "../components/form-components/Button";
import Container from "../components/reusable/Container";
import { size } from "../functions/size";
import Select from "../components/form-components/Select";

import cities from "../assets/cities assets/cities.json";
import opponoApi from "../opponoApi";
import debounce from "../functions/debounce";
import classnames from "classnames";

const TermsPage = ({ className, link, libraries, actions, state }) => {
    const data = state.source.get(link);
    const post = state.source[data.type][data.id];

    const Html2React = libraries.html2react.Component;
    React.useEffect(() => {
        actions.theme.setActiveTheme("gray-theme");
    }, []);
    return (
        <div className={classnames(className)}>
            <Header state={state} hasSubMenu={false} />
            <Container className={"terms-page-wrapper"}>
                {/*<h1 className={'primary'}>Terms And Conditions</h1>*/}
                <Html2React html={post.content.rendered} />
            </Container>
            <Footer />
        </div>
    );
};

export default styled(connect(TermsPage))`
  padding-top: ${size(120)};
  padding-bottom: ${size(120)};
  flex-wrap: wrap;
  min-height: calc(var(--vh, 1vh) * 100);
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  .container {
    max-width: 85%;
    margin: 0 auto;
    color: rgb(191, 182, 180) !important;
    @media (max-width: 1200px) {
        max-width: 100%;
      }

    @media (max-width: 575px) {
      max-width: 97%;
    }
  }

  .terms-page-wrapper {
    word-break: break-word;
    h1 {
      font-size: ${size(50)};
      text-align: center;

      @media (max-width: 575.98px) {
        font-size: ${size(34)};
      }
    }

    h2 {
      font-size: ${size(42)};
    }

    h3 {
      font-size: ${size(35)};
    }

    h4 {
      font-size: ${size(30)};
    }

    h5 {
      font-size: ${size(25)};
    }

    h6 {
      font-size: ${size(18)};
    }

    b {
      font-weight: 500;
    }

    p,
    li {
      font-size: 14px;
			line-height: 1.5;
      font-weight: 200;
      font-style: normal;
      color: rgb(191, 182, 180) !important;
      margin-top: 2rem;

      @media (max-width: 575.98px) {
        font-size: 1.5rem;
      }
    }

    a {
      color: #0e9564;
      text-decoration: underline;
    }
  }
`;
