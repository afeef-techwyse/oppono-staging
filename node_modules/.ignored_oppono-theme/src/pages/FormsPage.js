import React from "react";
import { connect, styled } from "frontity";
import { size } from "../functions/size";
import Switch from "@frontity/components/switch";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SignInPage from "./authPages/SignInPage";
import SignUpPage from "./authPages/SignUpPage";
import EPage from "./E/EPage";
import A1Page from "./A/A1Page";
import A2Page from "./A/A2Page";
import A3Page from "./A/A3Page";
import C1Page from "./C/C1Page";
import BPage from "./B/BPage";
import C2Page from "./C/C2Page";
import C3Page from "./C/C3Page";
import DPage from "./D/DPage";
import classnames from "classnames";

const FormsPage = ({ className, state, actions, link }) => {
    const data = state.source.get(link);
    const [currentTheme, setCurrentTheme] = React.useState("gray-theme");
    const page =
        data.isReady && !data.isError ? state.source[data.type][data.id] : {};
    React.useEffect(() => {
        actions.theme.setActiveTheme(currentTheme);
    }, [currentTheme]);
    React.useEffect(() => {
        actions.theme.setErrors({});
        actions.theme.checkUser();
        if (
            !state.theme.user.logged &&
            !(
                /sign-in|create-account|b|qualifyfor|c-ii/.test(page.slug) ||
                state.router.link.startsWith("/d/")
            )
        ) {
            actions.theme.setRedirectTo(state.router.link);
            actions.router.set("/sign-in/", { method: "replace" });
        }
    }, [state.theme.user.logged, link]);
    return (
        <div className={classnames(className)}>
            <Header state={state} hasProgress={state.theme.activeStep.total > 1} />
            <Switch>
                <SignInPage
                    setCurrentTheme={setCurrentTheme}
                    when={page.slug === "sign-in"}
                    formData={page.acf}
                />
                <SignUpPage
                    setCurrentTheme={setCurrentTheme}
                    when={page.slug === "create-account"}
                    formData={page.acf}
                />
                <A1Page
                    setCurrentTheme={setCurrentTheme}
                    when={page.slug === "a-i"}
                    formData={page.acf}
                />
                <A2Page
                    setCurrentTheme={setCurrentTheme}
                    when={page.slug === "a-ii"}
                    formData={page.acf}
                />
                <A3Page
                    setCurrentTheme={setCurrentTheme}
                    when={page.slug === "a-iii"}
                    formData={page.acf}
                />
                <BPage
                    setCurrentTheme={setCurrentTheme}
                    when={page.slug === "b"}
                    formData={page.acf}
                />
                <C1Page
                    setCurrentTheme={setCurrentTheme}
                    when={page.slug === "c-i"}
                    formData={page.acf}
                />
                <C2Page
                    setCurrentTheme={setCurrentTheme}
                    when={page.slug === "c-ii"}
                    formData={page.acf}
                />
                <C3Page
                    setCurrentTheme={setCurrentTheme}
                    when={page.slug === "c-iii"}
                    formData={page.acf}
                />
                <EPage
                    setCurrentTheme={setCurrentTheme}
                    when={page.slug === "e"}
                    formData={page.acf}
                />
            </Switch>
            <Footer actions={actions} state={state} />
        </div>
    );
};
export default styled(connect(FormsPage))`
  > div {
    min-height: calc(var(--vh, 1vh) * 100);
    height: 100%;
    padding-bottom: ${size(150)};
    overflow: hidden;

    @media (max-width: 575.98px) {
      padding-bottom: ${size(100)};
			display: block;
    }
  }
`;
