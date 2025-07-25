import React, { useEffect } from 'react';
import ReactGA from 'react-ga';
import { connect, styled, Head } from 'frontity';
import LinkedInTag from 'react-linkedin-insight';

//import Switch from '@frontity/components/switch';
import debounce from "./functions/debounce";
import { fixContainer } from './functions/fix-container';
import NotQualifiedPage from "./pages/NotQualifiedPage";
import HomeSlider from './components/HomeSlider';
import FormsPage from './pages/FormsPage';
import ContactPage from './pages/ContactPage';
import TradeshowPage from './pages/TradeshowPage';
import MapPage from './pages/MapPage';
import Missing404 from './pages/Missing404';
import DPage from './pages/D/DPage';
import { Transition, TransitionGroup } from 'react-transition-group';
import { gsap } from 'gsap';
import ScrollToPlugin from 'gsap/ScrollToPlugin';
import ProductsSlider from './components/ProductsSlider';
import AboutUsPage from './pages/AboutUsPage';
import CareersPage from './pages/CareersPage';
import VideosPage from './pages/VideosPage';
import TermsPage from './pages/TermsPage';
import PrivacyPage from './pages/PrivacyPage';
import { AddressProvider } from './contexts/AddressProvider'
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

import ControlledPopup from './components/ControlledPopup';

const Intro = dynamic(import('./components/Intro'), {
    ssr: false
})

const Styles = dynamic(import('./styles'), {
    ssr: false
})

const Switch = dynamic(import('@frontity/components/switch'), {
    ssr: false
})



gsap.registerPlugin(ScrollToPlugin);
ReactGA.initialize("UA-83199720-1");

LinkedInTag.init(1529258)


const isDeveloping = false;

const Root = ({ state, libraries }) => {
    const [initialDone, setInitialDone] = React.useState(false);
    const data = state.source.get(state.router.link);
    const page = data.isReady && !data.isError ? state.source[data.type][data.id] : {};




    React.useEffect(() => {
        fixContainer();

        if (typeof window !== 'undefined') {
            import('../src/assets/google-review/grw.min.js');
        }
        state.router.link !== '/' && setInitialDone(true);
        window.addEventListener('resize', fixContainer);
        function getHeightOfViewPort() {
            // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
            let vh = window.innerHeight * 0.01;
            // Then we set the value in the --vh custom property to the root of the document
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        }
        getHeightOfViewPort()
        const debounced = debounce(function () {
            getHeightOfViewPort()
        }, 500)
        window.addEventListener('resize', debounced);

        const script = document.createElement('script');
        const content = `
      window.onUsersnapCXLoad = function(api) {
        api.init();
      }
      var script = document.createElement('script');
      script.async = 1;
      script.src = 'https://widget.usersnap.com/global/load/4301456a-40b0-4e53-9edd-e491d7d737f8?onload=onUsersnapCXLoad';
      document.getElementsByTagName('head')[0].appendChild(script);     
    `;
        script.appendChild(document.createTextNode(content));

        document.body.appendChild(script);

        const pardotscript = document.createElement('script');
        const pardotcontent = `
      piAId = '699973';
      piCId = '1102';
      piHostname = 'pi.pardot.com';
      (function() {
                      function async_load(){
                                      var s = document.createElement('script'); s.type = 'text/javascript';
                                      s.src = ('https:' == document.location.protocol ? 'https://pi' : 'http://cdn') + '.pardot.com/pd.js';
                                      var c = document.getElementsByTagName('script')[0]; c.parentNode.insertBefore(s, c);
                      }
                      if(window.attachEvent) { window.attachEvent('onload', async_load); }
                      else { window.addEventListener('load', async_load, false); }
      })();`;

        pardotscript.appendChild(document.createTextNode(pardotcontent));
        document.body.appendChild(pardotscript);

        return () => {
            document.body.removeChild(script);
            window.removeEventListener('resize', fixContainer);
            window.removeEventListener('resize', debounced);
        }
    }, []);
    const duration = .75;

    const Html2React = libraries.html2react.Component;

    return (
        <>
            <AddressProvider>
                <Styles />
                <Head>
                    {/* <link rel="stylesheet" href="/static/fonts/google-review/grw-styles.css" /> */}
                    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAffvY0HHSyZqDhKlNf8BtaMYy3OYy0UeA&libraries=places"></script>
                    {/* <script src="/static/fonts/google-review/grw.min.js"></script> */}
                    <script
                        async
                        src="https://www.googletagmanager.com/gtag/js?id=AW-658146634"
                    ></script>

                    <script>{`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-NDZJKJK');`}</script>

                    <script>
                        {`window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'AW-658146634');`}
                    </script>
                    <script
                        async
                        src="https://www.googletagmanager.com/gtag/js?id=G-2PJQZGRWJ8"
                    ></script>
                    <script>{` function gtag_report_conversion(url) { var callback = function () { if (typeof(url) != 'undefined') { window.location = url; } }; gtag('event', 'conversion', { 'send_to': 'AW-658146634/kb3QCNrJysoBEMqK6rkC', 'event_callback': callback }); return false; } `}</script>
                    <script>{`
      window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'G-2PJQZGRWJ8'); 
      `}</script>
                    <script>
                        {`
      !function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', '600138813929975');
      fbq('track', 'PageView');
      `}
                    </script>
                    <noscript>
                        {`<img height="1" width="1" style="display:none"
      src="https://www.facebook.com/tr?id=600138813929975&ev=PageView&noscript=1"
      />`}
                    </noscript>

                    {ReactGA.pageview(data.link)}
                </Head>
                {data.isHome && !(isDeveloping || initialDone) ? (
                    <Intro setInitialDone={setInitialDone} />
                ) : null}
                <TransitionGroup>
                    <Transition
                        key={state.router.link}
                        timeout={duration * 1000}
                        onEnter={(node) => {
                            gsap.killTweensOf(node);
                            gsap.set(node, {
                                position: "fixed",
                                yPercent: 100,
                                top: 0,
                                left: 0,
                                width: "100vw",
                                zIndex: 1,
                                scrollTo: 0,
                            });
                            gsap.to(node, {
                                duration,
                                ease: "power2.in",
                                yPercent: 0,
                                onComplete: () => {
                                    gsap.set(node, { clearProps: "all" });
                                    node.classList.remove("animation");
                                },
                            });
                            requestAnimationFrame(() => node.classList.add("animation"));
                        }}
                        onExit={(node) => {
                            gsap.killTweensOf(node);
                            gsap.set(node, {
                                position: "fixed",
                                yPercent: 0,
                                top: 0,
                                left: 0,
                                zIndex: 10,
                                width: "100vw",
                                height: "calc(var(--vh, 1vh) * 100)",
                                overflow: "hidden",
                            });
                            gsap.to(node, {
                                duration,
                                ease: "power2.in",
                                yPercent: -100,
                            });
                            requestAnimationFrame(() => node.classList.add("animation"));
                        }}
                    >
                        <Switch>
                            <div className={"loading-page"} when={data.isFetching} />

                            <NotQualifiedPage
                                when={state.router.link.startsWith("/not-qualified/")}
                            />
                            <AboutUsPage
                                when={state.router.link.startsWith("/what-we-do/")}
                            />
                            <CareersPage when={state.router.link.startsWith("/careers/")} />
                            <VideosPage when={state.router.link.startsWith("/videos/")} />
                            <TradeshowPage when={state.router.link.startsWith("/signup/")} />
                            <ContactPage when={/get-in-touch/.test(page.slug)} />
                            <HomeSlider
                                link={data.link}
                                active={!data.isHome || isDeveloping || initialDone}
                                when={page.template === "page-templates/slider-template.php"}
                            />
                            <FormsPage
                                link={data.link}
                                when={page.template === "page-templates/form-template.php"}
                            />
                            <ProductsSlider
                                link={data.link}
                                active={true}
                                when={state.router.link.startsWith("/products/")}
                            />
                            <MapPage when={state.router.link.startsWith("/map/")} />
                            <TermsPage
                                link={data.link}
                                when={state.router.link.startsWith("/terms/")}
                            />
                            <PrivacyPage
                                link={data.link}
                                when={state.router.link.startsWith("/privacy-policy/")}
                            />
                        </Switch>
                    </Transition>
                </TransitionGroup>

                <Switch>
                    <DPage link={data.link} when={state.router.link.startsWith("/d/")} />
                    <Missing404 when={data.is404} />
                </Switch>
                <Overlay />
            </AddressProvider>
        </>
    );
};
export default connect(Root);


const Overlay = styled(({ className }) => {
    const ref = React.useRef(null);

    React.useEffect(() => {
        ref.current.style.opacity = 0;
    }, []);

    return <div ref={ref} className={className} />
})`
  z-index: 10000;
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #000;
  pointer-events: none;
  transition: opacity 400ms;
`