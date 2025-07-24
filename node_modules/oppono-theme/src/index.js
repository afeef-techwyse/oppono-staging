import Root from "./Root";
import ThemeLoading from "./components/ThemeLoading";
import axios from "axios";
import {cookies} from "./functions/cookies";
import {gsap} from "gsap";

axios.defaults.headers.post["Content-Type"] = "multipart/form-data";

const userCookieKey = "104ab42f11";
const refCookieKey = "vsrefdom";
const popupCookieKey = "oppnotice";

const appraisersMapHandler = {
  name: "appraisersMapHandler",
  pattern: "appraisers-map-lookup",
  func: async ({link, state, libraries}) => {
    // 1. Get ACF option page from REST API.
    const response = await axios.post(
        `${state.source.api}/oppono/v1/appraiser-lookup`
    );
    
    const appraisers = {};
    
    for (const appraiser of response.data) {
      appraisers[appraiser.fields.city]
          ? appraisers[appraiser.fields.city].push(appraiser)
          : (appraisers[appraiser.fields.city] = [appraiser])
    }
    
    // 2. Add data to `source`.
    const data = state.source.get(link);
    Object.assign(data, {data: appraisers, isAppraisersMap: true});
  },
};

gsap.config({nullTargetWarn: false});

const acfOptionsHandler = {
  name: "acfOptionsHandler",
  pattern: "acf-options-page",
  func: async ({route, state, libraries}) => {
    // 1. Get ACF option page from REST API.
    const response = await libraries.source.api.get({
      endpoint: `/acf/v3/options/oppono-settings`,
    });
    const option = await response.json();
    
    // 2. Add data to `source`.
    const data = state.source.get(route);
    Object.assign(data, {...option, isAcfOptionsPage: true});
  },
};
export default {
  name: "oppono-theme",
  roots: {
    theme: Root,
    themeLoading: ThemeLoading,
  },
  state: {
    theme: {
      activeTheme: "blue-theme",
      selectedValues: {},
      subHeader: {part_1: "", part_2: ""},
      activeStep: {stepName: "activeStepName", allStepsNames: [], total: 1000, current: 0},
      user: {
        logged: false,
      },
      appraiser: null,
      errors: {},
      leadId: null,
      stepResponse: {},
      validateAndNextCallback: 0,
      redirectTo: "",
      reference: "",
      popup: true
    },
    source: {
      postTypes: [
        {
          type: "appraiser",
          endpoint: "appraiser",
        },
        {
          type: "mortgage-product",
          endpoint: "mortgage-product",
        },
      ],
    },
    themeLoading: {
      loading: false,
    },
  },
  actions: {
    theme: {
      setRedirectTo: ({state}) => (value) =>
          (state.theme.redirectTo = value || ""),
      setActiveTheme: ({state}) => (value) => {
        if (value) {
          state.theme.activeTheme = value;
          document.body.className = value;
        }
      },
      setSelectedValues: ({state}) => (value) =>
          (state.theme.selectedValues = {
            ...state.theme.selectedValues,
            ...value,
          }),
      setSubHeader: ({state}) => (value) =>
          (state.theme.subHeader = {...state.theme.subHeader, ...value}),
      setActiveStep: ({state}) => (value) =>
          (state.theme.activeStep = {...state.theme.activeStep, ...value}),
      init: ({libraries, actions, state}) => {
        libraries.source.handlers.push(acfOptionsHandler, appraisersMapHandler);
        state.frontity.rendering === "csr" && actions.theme.checkUser();
      },
      beforeSSR: async ({actions}) => {
        // This will make Frontity wait until the ACF options
        // page has been fetched and it is available
        // using state.source.get("acf-options-page").
        await actions.source.fetch("acf-options-page");
      },
      afterCSR: ({actions, state}) => {
        state.frontity.rendering === "csr" && actions.theme.checkUser();
      },
      setUser: ({state}) => (user = {}, setCookie = true) => {
        state.theme.user = {...state.theme.user, ...user};
        setCookie &&
        cookies.setItem(
            userCookieKey,
            JSON.stringify(state.theme.user),
            2147483647,
            "/"
        ); //fixme just update the value
      },
      removeUser: ({state}) => {
        cookies.removeItem(userCookieKey, "/");
        state.theme.user = {logged: false};
      },
      checkUser: ({actions}) => {
        const user = cookies.getItem(userCookieKey);
        user
            ? actions.theme.setUser({...JSON.parse(user)}, false)
            : actions.theme.removeUser();
      },
      setAppraiser: ({state}) => (value) => (state.theme.appraiser = value),
      setErrors: ({state}) => (value) => (state.theme.errors = value),
      setLeadId: ({state}) => (value) => (state.theme.leadId = value),
      setStepResponse: ({state}) => (value) => {
        state.theme.stepResponse = {...value};
      },
      setValidateAndNextCallback: ({state}) => (value) =>
          (state.theme.validateAndNextCallback = value),
      setReference: ({state}) => (reference = {}, setCookie = true) => {
        state.theme.reference = {...state.theme.reference, ...reference};
        setCookie &&
        cookies.setItem(
          refCookieKey,
          JSON.stringify(state.theme.reference),
          3600,
          "/"
        )
      },
      checkReference: ({actions}) => {
        const ref = cookies.getItem(refCookieKey);
        actions.theme.setReference({...JSON.parse(ref)}, false);
      },
      setPopup: ({state}) => (popup = {}, setCookie = true) => {
        state.theme.popup = popup;
        setCookie &&
        cookies.setItem(
          popupCookieKey,
          JSON.stringify(state.theme.popup),
          2147483647,
          "/"
        )
      },
      checkPopup: ({actions}) => {
        const ref = cookies.getItem(popupCookieKey);
        actions.theme.setPopup(ref, false);
      }
    },
    themeLoading: {
      animationStart: ({state}) => (state.themeLoading.loading = true),
      animationDone: ({state}) => (state.themeLoading.loading = false),
    },
  },
};
