import React from "react";
import Form from "../../components/form-components/Form";
import Input from "../../components/form-components/Input";
import { connect, styled } from "frontity";
import { size } from "../../functions/size";
import FormStep from "../../components/form-components/FormStep";
import Button from "../../components/form-components/Button";
import Link from "../../components/reusable/Link";
import useStoredFormValue from "../../hooks/useStoredFormValue";
import FormConditionalInput from "../../components/form-components/FormConditionalInput";
import LastStep from "../../components/form-components/LastStep";
import last_step from "../../assets/images/last-step.png";
import opponoApi from "../../opponoApi";

const SignUpPage = ({
    className,
    setCurrentTheme,
    state,
    actions,
    formData,
}) => {
    const pageName = "sign-up";
    const section1Values = useStoredFormValue(pageName)(
        formData.section_1?.section_name
    );
    const [password, setPassword] = React.useState("");
    React.useEffect(() => {
        actions.theme.setSubHeader(formData.sub_header);
    }, [formData]);

    return (
        <div className={className}>
            <div className="container">
                <Form setCurrentTheme={setCurrentTheme}>
                    <FormStep
                        pageName={pageName}
                        activeTheme={formData.section_1?.section_theme}
                        stepName={formData.section_1?.section_name}
                    >
                        <div className="form-text-wrapper">
                            <h1 className={"form-headline-1 text-center"}>
                                {formData.section_1?.title}
                            </h1>
                            <h2 className={"form-sub-text"}>
                                Already a member? <Link href="/sign-in/"> Sign in</Link>
                            </h2>
                        </div>
                        <Input
                            noScroll
                            type={"text"}
                            name={"first_name"}
                            {...formData.section_1?.first_name_input}
                        />
                        <Input
                            type={"text"}
                            name={"last_name"}
                            {...formData.section_1?.last_name_input}
                        />
                        <Input
                            type={"text"}
                            name={"pref_name"}
                            {...formData.section_1?.preferred_name_input}
                        />
                        <Input
                            pattern={"^[Mm](\\d){8}$"}
                            type={"text"}
                            name={"mortgage_license"}
                            {...formData.section_1?.mortgage_agent_license_input}
                        />
                        <Input
                            type={"text"}
                            name={"brokerage_name"}
                            {...formData.section_1?.brokerage_name_input}
                        />
                        <Input
                            type={"text"}
                            name={"brokerage_license"}
                            pattern={"^(\\d){5}$"}
                            {...formData.section_1?.brokerage_license_input}
                        />
                        <Button
                            className={"bordered a7a-btn mt-80 next-step"}
                            label={"Next: let’s create your account"}
                        />
                    </FormStep>
                    <FormStep
                        endPoint={"/signup"}
                        sendAllSteps
                        isSignUp
                        pageName={pageName}
                        activeTheme={formData.section_2?.section_theme}
                        stepName={formData.section_2?.section_name}
                    >
                        <div className="form-text-wrapper">
                            <h1
                                className={"form-headline-1 text-center"}
                                dangerouslySetInnerHTML={{
                                    __html: formData.section_2?.title.replace(
                                        "{{name}}",
                                        section1Values("first_name")
                                    ),
                                }}
                            />
                        </div>
                        <Input
                            noScroll
                            type={"text"}
                            pattern={
                                "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$"
                            }
                            name={"email"}
                            {...formData.section_2?.email_input}
                        />
                        <Input
                            type={"phone"}
                            isPhoneNumber
                            name={"broker_phone"}
                            {...formData.section_2?.phone_input}
                        />


                        <Input
                            type={"password"}
                            name={"password"}
                            onChange={(e) => setPassword(e.target.value)}
                            {...formData.section_2?.password_input}
                        />
                        <Input
                            type={"password"}
                            pattern={password}
                            {...formData.section_2?.re_enter_password_input}
                        />

                        <FormConditionalInput
                            name={"worked_with_oppono"}
                            showOn={"1"}
                            checked={"0"}
                            {...formData.section_2?.worked_with_oppono_yes_no}
                        >
                            <Input
                                type={"text"}
                                name={"worked_with_oppono_2"}
                                {...formData.section_2?.worked_with_oppono_2_input}
                            />
                        </FormConditionalInput>

                        <div className="agree-checkbox mt-80">
                            <input name={"agree"} type="checkbox" required={"required"} />
                            <span className="checkmark" />
                            <span className={"text"}>I agree the </span>
                            <Link className={"text"} href="/terms" target={"_blank"}>
                                {" "}
                                terms and conditions
                            </Link>
                        </div>
                        {state.theme.errors?.general_error ? (
                            <p className={"error-message"}>
                                {state.theme.errors?.general_error.code}
                            </p>
                        ) : null}
                        <Button className={"mt-70 next-step"} icon={true} label={"Enter"} />
                    </FormStep>
                    <FormStep
                        pageName={pageName}
                        activeTheme={formData.section_3?.section_theme}
                        stepName={formData.section_3?.section_name}
                    >
                        <LastStep>
                            <img src={last_step} alt="flying obj" />
                            <div style={{ flexBasis: "45%" }} className="text tablet-center">
                                <h1 className={"form-headline-1 primary"}>
                                    Thanks for signing up with us.
                                </h1>
                                <p className={"form-headline-3 primary lighter"}>
                                    <Link className={"white-color"} href={"/dashboard"}>
                                        Let's get started
                                    </Link>
                                    .
                                </p>
                                <div className="btn-group">
                                    <Button
                                        className={"wide bordered"}
                                        label={"Back to the dashboard"}
                                        onClick={() => {
                                            let data = new FormData();
                                            data.append("username", state.theme.user.user_email);
                                            data.append("password", state.theme.user.user_password);
                                            opponoApi.post("/signin", data).then((response) => {
                                                const {
                                                    token,
                                                    user_id,
                                                    user_email,
                                                    user_nicename: user_name,
                                                    user_sf_contact,
                                                    user_sf_account,
                                                    user_fname,
                                                } = response.data;
                                                actions.theme.setUser({
                                                    token,
                                                    logged: true,
                                                    user_id,
                                                    user_email,
                                                    user_name,
                                                    user_sf_contact,
                                                    user_sf_account,
                                                    user_fname,
                                                });
                                                actions.router.set("/dashboard/");
                                            });
                                        }}
                                    />
                                </div>
                            </div>
                        </LastStep>
                    </FormStep>
                </Form>
            </div>
        </div>
    );
};

export default styled(connect(SignUpPage))`
  width: 100%;
  height: 100%;

  .mt-80 {
    margin-top: ${size(80)};

    @media (max-width: 575.98px) {
      margin-top: ${size(30)};
    }
  }

  .mt-70 {
    margin-top: ${size(70)};
  }

  .form-text-wrapper {
    max-width: 100%;
    @media (max-width: 575.98px) {
      margin-left: auto !important;
      margin-right: auto !important;
      max-width: 95%;
    }
  }

  ${LastStep} {
    .tablet-center .form-headline-1 {
      @media (max-width: 575.98px) {
        font-size: ${size(22)};
        line-height: 130%;
        max-width: 100%;
      }
    }

    img {
      margin-bottom: ${size(20)};
      width: 35%;
      @media (max-width: 575.98px) {
        width: 20%;
      }
    }
    @media (max-width: 575.98px) {
      .btn-group {
        button {
          margin-top: ${size(15)};
        }
      }
    }
  }



  .white-color {
    color: #fff;
  }

  .agree-checkbox {
    z-index: 100;
    position: relative;

    a {
      z-index: 9;
      color: #0e9564;
      margin-left: ${size(3)};
    }
  }

  .phoneMasker {
    width: 100%;
  }
`;
