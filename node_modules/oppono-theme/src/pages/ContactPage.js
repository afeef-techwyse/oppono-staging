import React from "react";
import { connect, styled } from "frontity";
import { size } from "../functions/size";
import Switch from "@frontity/components/switch";
import Header from "../components/Header";
import Footer from "../components/Footer";
// import Chat from './contact/Chat';
import Mail from "./contact/Mail";
import classnames from "classnames";

const ContactPage = ({ className, state, actions }) => {
    // const data = state.source.get(state.router.link);
    // const pageData = data.isReady && !data.isError ? state.source[data.type][data.id].acf : {};
    // React.useEffect(() => {
    //   actions.theme.setActiveTheme(pageData.section_1?.section_theme || "gray-theme"
    // );
    // }, []);
    return (
        <div className={classnames(className)}>
            <Header state={state} />
            <Switch>
                {/*<Chat when={state.router.link.startsWith('/contact/chat/')}/>*/}
                <Mail when={state.router.link.startsWith("/get-in-touch/")} />
            </Switch>
            <Footer />
        </div>
    );
};
export default styled(connect(ContactPage))`
  > div {
    min-height: calc(var(--vh, 1vh) * 100);
    height: 100%;
    overflow: hidden;
    padding-bottom: ${size(150)};
    display: flex;
    align-items: center;
  }

  .contact-title {
    color: #b5d2ff;
    font-weight: 300;
    line-height: ${size(95)};
    font-size: ${size(80)};
    max-width: ${size(800)};
    @media (max-width: 991.98px) {
      font-size: ${size(35)};
      line-height: normal;
    }
    @media (max-width: 575.98px) {
      font-size: ${size(38)};
      line-height: ${size(50)};
    }
  }

  .contact-sub-title {
    color: rgba(181, 210, 255, 0.4);
    font-size: ${size(29)};
    line-height: 1.2;
    margin-top: ${size(10)};
    font-weight: 300;
    @media (max-width: 991.98px) {
      font-size: ${size(24)};
      line-height: normal;
    }
    @media (max-width: 575.98px) {
      font-size: ${size(20)};
      margin: 2rem 0 -3rem;
    }
  }
`;
