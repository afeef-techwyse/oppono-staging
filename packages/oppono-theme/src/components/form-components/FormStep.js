import React from "react";
import { connect, styled, useConnect } from "frontity";
import PropTypes from "prop-types";
import classnames from "classnames";
import gsap from "gsap";
import { size } from "../../functions/size";
import useMedia from "../../hooks/useMedia";
import opponoApi from "../../opponoApi";
import { P } from "../../components/form-components/StyledComponent";

const FormStep = ({
    activeTheme,
    setCurrentTheme,
    pageName,
    stepName,
    className,
    children,
    active = false,
    initial = false,
    nextCallback,
    prevCallback,
    resetCallback,
    stepIndex,
    endPoint,
    sendSteps = [],
    sendAllSteps = false,
    allStepsNames,
    isSignUp,
    isSignIn,
    setLoading,
    apiStepNumber,
    onNext,
}) => {
    const stepRef = React.useRef(null);
    const stepLoading = React.useRef(false);
    const media = useMedia();
    const { actions, state } = useConnect();

    const combineFormData = (stepsNames) =>
        stepsNames
            .map((stepName) => state.theme.selectedValues[`${pageName}-${stepName}`])
            .reduce((combinedFormData, formData) => {
                return formData
                    ? [...formData.entries()].reduce((formData, entry) => {
                        formData.append(...entry);
                        return formData;
                    }, combinedFormData)
                    : combinedFormData;
            }, new FormData());

    const validateAndNextCallback = () => {
        if (stepLoading.current) return;
        stepLoading.current = true;
        setLoading(true);
        let isValid = true;
        for (let input of stepRef.current.querySelectorAll(
            "input,select,textarea"
        )) {
            input.checkValidity() || (isValid = false);
        }
        if (isValid) {
            const formData = new FormData(stepRef.current);
            actions.theme.setSelectedValues({
                [`${pageName}-${stepName}`]: formData,
            });
            if (window.location.pathname == "/signup/") {
                setTimeout(function () {
                    window.location.href = '/signup/';
                }, 7000);
            }
            if (endPoint) {
                if (sendAllSteps) {
                    //fixme remove this
                    const combinedFormData = combineFormData(allStepsNames);
                    opponoApi
                        .post(endPoint, combinedFormData)
                        .then((response) => {
                            if (+response.data?.status >= 300) {
                                actions.theme.setErrors(response.data?.errors);
                                const firstInvalidInput = stepRef.current.querySelector(
                                    `[name="${Object.keys(response.data?.errors)[0]}"]`
                                );
                                gsap.to(window, {
                                    duration: 0.5,
                                    scrollTo: {
                                        y: firstInvalidInput,
                                        offsetY:
                                            window.innerWidth < 768
                                                ? 100
                                                : (window.innerHeight -
                                                    firstInvalidInput.getBoundingClientRect().height) /
                                                2,
                                    },
                                });
                                stepLoading.current = false;
                                setLoading(false);
                                return;
                            }
                            onNext?.();
                            nextCallback();
                            if (isSignUp) {
                                const {
                                    user_email,
                                    user_nicename: user_name,
                                    user_sf_contact,
                                    user_sf_account,
                                    user_fname,
                                } = response.data.user;
                                actions.theme.setUser({
                                    logged: true,
                                    user_email,
                                    user_password: formData.get("password"),
                                    user_name,
                                    user_sf_contact,
                                    user_sf_account,
                                    user_fname,
                                });
                            }

                            stepLoading.current = false;
                            setLoading(false);
                        })
                        .catch((error) => {
                            if (+error.response?.status === 403) {
                                actions.theme.removeUser();
                                actions.theme.setRedirectTo(state.router.link);
                                actions.router.set("/sign-in/", { method: "replace" });
                            }

                        });
                } else {
                    if (isSignIn) {
                        opponoApi
                            .post(endPoint, formData)
                            .then((response) => {
                                stepLoading.current = false;
                                setLoading(false);
                                if (+response.data?.status >= 300) {
                                    actions.theme.setErrors(response.data?.errors);
                                    const firstInvalidInput = stepRef.current.querySelector(
                                        `[name="${Object.keys(response.data?.errors)[0]}"]`
                                    );
                                    gsap.to(window, {
                                        duration: 0.5,
                                        scrollTo: {
                                            y: firstInvalidInput,
                                            offsetY:
                                                window.innerWidth < 768
                                                    ? 100
                                                    : (window.innerHeight -
                                                        firstInvalidInput.getBoundingClientRect()
                                                            .height) /
                                                    2,
                                        },
                                    });
                                    stepLoading.current = false;
                                    setLoading(false);
                                    return;
                                }
                                if (+response.data?.data?.status >= 300) {
                                    actions.theme.setErrors({
                                        general_error: { code: response.data?.message },
                                    });
                                    stepLoading.current = false;
                                    setLoading(false);
                                    return;
                                }

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
                                    user_password: formData.get("password"),
                                    user_name,
                                    user_sf_contact,
                                    user_sf_account,
                                    user_fname,
                                });
                                if (state.theme.redirectTo) {
                                    actions.router.set(state.theme.redirectTo, {
                                        method: "replace",
                                    });
                                    actions.theme.setRedirectTo();
                                } else {
                                    actions.router.set("/dashboard/");
                                }
                            })
                            .catch((error) => {
                                if (+error.response?.status === 403) {
                                    actions.theme.removeUser();
                                    actions.theme.setRedirectTo(state.router.link);
                                    actions.router.set("/sign-in/", { method: "replace" });
                                }

                            });
                    } else {
                        const config = {};
                        sendSteps.push(stepName);
                        const combinedFormData = combineFormData(sendSteps);

                        if (state.theme.user.logged) {
                            combinedFormData.append("token", `${state.theme.user.token}`);
                            combinedFormData.append("user_id", state.theme.user.user_id);
                            combinedFormData.append(
                                "user_sf_contact",
                                state.theme.user.user_sf_contact
                            );
                            combinedFormData.append(
                                "user_sf_account",
                                state.theme.user.user_sf_account
                            );
                            config.headers = {
                                Authorization: `Bearer ${state.theme.user.token}`,
                            };
                        }

                        combinedFormData.append("step", apiStepNumber);
                        // combinedFormData.append('step', 4);
                        state.theme.leadId &&
                            combinedFormData.append("sf-lead-id", state.theme.leadId);
                        opponoApi
                            .post(endPoint, combinedFormData, config)
                            .then((response) => {
                                actions.theme.setLeadId(response.data["sf-lead-id"]);
                                stepLoading.current = false;
                                setLoading(false);
                                actions.theme.setErrors({});
                                actions.theme.setStepResponse(response);
                                onNext?.();
                                nextCallback();
                            })
                            .catch((error) => {
                                if (+error.response?.status === 403) {
                                    actions.theme.removeUser();
                                    actions.theme.setRedirectTo(state.router.link);
                                    actions.router.set("/sign-in/", { method: "replace" });
                                }


                                actions.theme.setErrors(error.data?.errors);
                            });
                    }
                }
            } else {
                onNext?.();
                nextCallback();
                stepLoading.current = false;
                setLoading(false);
            }
        } else {
            const firstInvalidInput = stepRef.current.querySelector(":invalid");
            gsap.to(window, {
                duration: 0.5,
                scrollTo: {
                    y: firstInvalidInput,
                    offsetY:
                        window.innerWidth < 768
                            ? 100
                            : (window.innerHeight -
                                firstInvalidInput.getBoundingClientRect().height) /
                            2,
                },
            });
            stepLoading.current = false;
            setLoading(false);
        }
    };
    React.useEffect(() => {
        const prevBtns = stepRef.current.querySelectorAll(".prev-step");
        const nextBtns = stepRef.current.querySelectorAll(".next-step");
        const resetBtns = stepRef.current.querySelectorAll(".reset-form");
        for (let prevBtn of prevBtns) {
            prevBtn?.addEventListener("click", prevCallback);
        }
        for (let nextBtn of nextBtns) {
            nextBtn?.addEventListener("click", validateAndNextCallback);
        }
        for (let resetBtn of resetBtns) {
            resetBtn?.addEventListener("click", resetCallback);
        }
        return () => {
            for (let prevBtn of prevBtns) {
                prevBtn?.removeEventListener("click", prevCallback);
            }
            for (let nextBtn of nextBtns) {
                nextBtn?.removeEventListener("click", validateAndNextCallback);
            }
            for (let resetBtn of resetBtns) {
                resetBtn?.removeEventListener("click", resetCallback);
            }
        };
    });
    React.useEffect(() => {
        state.theme.validateAndNextCallback && active && validateAndNextCallback();
    }, [state.theme.validateAndNextCallback]);
    React.useEffect(() => {
        if (initial) {
            if (active) {
                gsap
                    .timeline()
                    .set(stepRef.current, {
                        autoAlpha: 1,
                        height: "auto",
                        duration: 0.5,
                        y: 0,
                    })
                    .from(stepRef.current.children, {
                        autoAlpha: 0,
                        y: 30,
                        stagger: 0.1,
                        clearProps: "all",
                    });
            } else {
                gsap
                    .timeline()
                    .set(stepRef.current, {
                        autoAlpha: 0,
                        height: 0,
                        duration: 0.5,
                        y: 300,
                    })
                    .from(stepRef.current.children, {
                        autoAlpha: 0,
                        y: 30,
                        stagger: 0.1,
                    });
            }
        } else {
            if (active) {
                setTimeout(
                    () =>
                        gsap
                            .timeline()
                            .fromTo(
                                stepRef.current,
                                { autoAlpha: 0, display: "none" },
                                { autoAlpha: 1, display: "block", duration: 0.001 }
                            )
                            .fromTo(
                                stepRef.current,
                                { height: 0, y: 300 },
                                { height: "auto", duration: 0.5, y: 0 }
                            )
                            .fromTo(
                                stepRef.current.children,
                                { autoAlpha: 0, y: 30 },
                                { autoAlpha: 1, y: 0, stagger: 0.1 }
                            ),
                    1000
                );
            } else {
                let tl = gsap
                    .timeline({ paused: true })

                    .fromTo(
                        stepRef.current,
                        { autoAlpha: 0, display: "none" },
                        { autoAlpha: 1, display: "block", duration: 0.001 }
                    )
                    .fromTo(
                        stepRef.current,
                        { height: 0, y: 300 },
                        { height: "auto", duration: 0.5, y: 0 }
                    )
                    .fromTo(
                        stepRef.current.children,
                        { autoAlpha: 0, y: 30 },
                        { autoAlpha: 1, y: 0, stagger: 0.1 }
                    )
                    .progress(1);
                tl.timeScale(tl.duration()).reverse();
            }
        }
        active && actions.theme.setActiveStep({ stepName, current: stepIndex });
        active && setCurrentTheme(activeTheme);
    }, [active]);

    return (
        <form
            ref={stepRef}
            onSubmit={(e) => e.preventDefault()}
            className={classnames(className, { active })}
            style={{ visibility: active ? "visible" : "hidden" }}
        >
            {children}
        </form>
    );
};

FormStep.propTypes = {
    className: PropTypes.string,
    stepIndex: PropTypes.number.isRequired,
    children: PropTypes.node.isRequired,
    active: PropTypes.bool,
    initial: PropTypes.bool,
    reversed: PropTypes.bool,
    formTl: PropTypes.any,
    nextCallback: PropTypes.func.isRequired,
    prevCallback: PropTypes.func.isRequired,
    resetCallback: PropTypes.func.isRequired,
    allStepsNames: PropTypes.arrayOf(PropTypes.string).isRequired,
    activeTheme: PropTypes.string,
    endPoint: PropTypes.string,
    sendAllSteps: PropTypes.bool,
    isSignUp: PropTypes.bool,
    isSignIn: PropTypes.bool,
    onNext: PropTypes.func,
};

export default styled(connect(FormStep))`
  opacity: 0;
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  margin: 0 auto;
  z-index: 0;
  height: 0;

  > *:not(.form-text-wrapper):not(.form-wide-container):not(.appraiser-wide) {
    max-width: ${size(860)};
    margin-right: auto;
    margin-left: auto;
  }

  .form-text-wrapper {
    max-width: ${size(860)};
    margin-right: auto;
    margin-left: auto;
    margin-bottom: ${size(55)};

    &.is-smaller {
      max-width: ${size(645)};
    }

    ${P.D} {
      margin-bottom: ${size(8)};
    }
  }

  div.upload-step-wrapper {
    max-width: ${size(860)}!important;
    margin-right: auto !important;
    margin-left: auto !important;
    position: relative;
    @media (max-width: 991.98px) {
      max-width: ${size(860)}!important;
      margin-left: ${size(32)}!important;
      margin-right: ${size(32)}!important;
    }
    img {
      position: absolute;
      right: -1rem;
      top: 4rem;
      width: 12rem;

      @media (max-width: 575.98px) {
        display: none;
      }
    }
  }
  &.active {
    z-index: 5;
  }
  button {
    margin-top: ${size(80)};

    @media (max-width: 575.98px) {
      width: 100%;
    }
  }
`;
