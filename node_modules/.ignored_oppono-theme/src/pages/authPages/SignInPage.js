import React from "react";
import Form from "../../components/form-components/Form";
import Input from "../../components/form-components/Input";
import { connect, styled } from "frontity";
import Container from "../../components/reusable/Container";
import { size } from "../../functions/size";
import Button from "../../components/form-components/Button";
import intro_ball_1 from "../../assets/images/intro_ball_1.png";
import intro_ball_2 from "../../assets/images/intro_ball_2.png";
import FormStep from "../../components/form-components/FormStep";
import FlyingObjsContainer from "../../components/reusable/FlyingObjsContainer";
import Link from "../../components/reusable/Link";

const SignInPage = ({
  className,
  setCurrentTheme,
  state,
  actions,
  formData,
  libraries,
}) => {
  const pageName = "sign-in";
  const Html2React = libraries.html2react.Component;

  React.useEffect(() => {
    actions.theme.setSubHeader(formData.sub_header);
  }, [formData]);

  return (
    <div className={className}>
      <Form setCurrentTheme={setCurrentTheme} className="login">
        <FormStep
          endPoint={"/signin"}
          pageName={pageName}
          isSignIn
          activeTheme={formData.section_1?.section_theme}
          stepName={formData.section_1?.section_name}
        >
          <div className="form-text-wrapper">
            <h1 className={"form-headline-1 text-center"}>
              {formData.section_1?.title}
            </h1>
            <h2 className={"form-sub-text"}>
              Not a member yet?{" "}
              <Link href={"/create-account/"}>Sign up now!</Link>
            </h2>
          </div>
          <FlyingObjsContainer
            childrenList={[
              {
                imageUrl: intro_ball_1,
                left: "1%",
                level: 1,
                top: "55%",
                type: "image",
                width: 10,
                alt: "alt",
              },
              {
                imageUrl: intro_ball_2,
                left: "70%",
                level: 1,
                top: "5%",
                type: "image",
                width: 5,
                alt: "alt",
              },
            ]}
          />
          <Input
            noScroll
            type={"text"}
            pattern={
              "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$"
            }
            name={"username"}
            {...formData.section_1?.user_name_input}
          />

          <Input
            type={"password"}
            className={"password-field"}
            name={"password"}
            {...formData.section_1?.password_input}
          />
          <a
            href="https://oppono-app.com/wp-login.php?action=lostpassword"
            className="forgot-password"
          >
            I forgot my password
          </a>
          {state.theme.errors?.general_error ? (
            <p className={"error-message"}>
              <Html2React html={state.theme.errors?.general_error.code} />
            </p>
          ) : null}
          <Button className={"next-step"} label={"Enter"} />
        </FormStep>
      </Form>
    </div>
  );
};

export default styled(connect(SignInPage))`
  width: 100%;
  position: relative;

  @media (max-width: 575.98px) {
    margin-top: 25px;
    overflow: hidden;
    display: flex;
    justify-content: center;
    padding-bottom: 0 !important;

    .login {
      padding-top: ${size(130)};
    
      button {
        margin-top: ${size(30)};
      }
    }
  }

  .form-text-wrapper {
    @media (max-width: 991.98px) {
      margin-left: auto;
    }
  }

  .password-field.invalid + .forgot-password {
    margin-top: ${size(35)};
  }
  .forgot-password {
    color: rgba(191, 182, 180, 0.5);
    font-size: ${size(18)};
    font-weight: 400;
    line-height: ${size(25)};
    margin-top: ${size(17)};
    display: block;
    transition: margin 0.3s;

    @media (max-width: 575.98px) {
      font-size: ${size(14)};
    }
  }
`;
