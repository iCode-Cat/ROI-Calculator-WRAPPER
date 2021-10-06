import './App.css';
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';

const eventMethod = window.addEventListener
  ? 'addEventListener'
  : 'attachEvent';
const eventer = window[eventMethod];
const messageEvent = eventMethod === 'attachEvent' ? 'onmessage' : 'message';

function App() {
  const [scrollSizeApp, setScrollApp] = useState();
  const [scrollSizeHeader, setScrollHeader] = useState();
  const [scrollSizeFooter, setScrollFooter] = useState();
  const [iframeObject, setIframeObject] = useState([
    {
      id: 1,
      URL: 'https://roi-calculator-header.vercel.app',
      fixedHeightWeb: '410px',
      uniqueName: 'header',
    },
    {
      id: 2,
      URL: 'http://localhost:3000',
      fixedHeightWeb: '890px',
      uniqueName: 'calculator',
    },
    {
      id: 3,
      URL: 'https://roi-calculator-footer.vercel.app',
      fixedHeightWeb: '400px',
      uniqueName: 'footer',
    },
  ]);

  const sendMessageChild = (msg, url) => {
    const App = document.querySelector('#calculator');
    if (App === undefined) return;
    App.contentWindow.postMessage(msg, url);
    console.log('posted');
  };

  const metadata = {
    page_title: 'Information Risks Assessment',
    page_favicon: '/cognni_favicon.png',
    title: 'Information Risk Assessment',
    sub_title: 'See how much information risks are costing you',
  };

  useEffect(() => {
    // Update the page metadata
    // document.title = metadata.page_title;
    // favicon.href = '/cognni_favicon.png';
    const iframeOriginHeader = iframeObject[0].URL;
    const iframeOriginApp = iframeObject[1].URL;
    const iframeOriginFooter = iframeObject[2].URL;
    eventer(messageEvent, function (e) {
      // Only when steps changes
      if (e.origin === iframeOriginApp && e.data.step) {
        setTimeout(() => {
          window.scrollTo({ top: e.data.scrollSize, behavior: 'smooth' });
        }, 500);
      }

      if (e.origin === iframeOriginApp) {
        if (!e.data.step) {
          setScrollApp(e.data);
        }
      }
      if (e.origin === iframeOriginHeader) {
        setScrollHeader(e.data);
      }
      if (e.origin === iframeOriginFooter) {
        setScrollFooter(e.data);
      }
    });
  }, []);

  useEffect(() => {
    iframeObject[1].fixedHeightWeb = scrollSizeApp + 'px';
    setIframeObject([...iframeObject]);
  }, [scrollSizeApp]);

  useEffect(() => {
    iframeObject[0].fixedHeightWeb = scrollSizeHeader + 'px';
    setIframeObject([...iframeObject]);
  }, [scrollSizeHeader]);

  useEffect(() => {
    iframeObject[2].fixedHeightWeb = scrollSizeFooter + 'px';
    setIframeObject([...iframeObject]);
  }, [scrollSizeFooter]);

  useEffect(() => {
    sendMessageChild('defaultJson', '*');
  }, [iframeObject]);

  return (
    <div className='App'>
      <Helmet>
        <title>{metadata.page_title}</title>
        <link id='favicon' rel='icon' href={metadata.page_favicon} />
        <meta name='description' content={metadata.sub_title} />
      </Helmet>

      {iframeObject.map((iframe, i) => (
        <iframe
          key={i}
          src={iframe.URL}
          title={iframe.uniqueName}
          id={iframe.uniqueName}
          width='100%'
          height={iframe.fixedHeightWeb}
          scrolling='no'
        ></iframe>
      ))}
    </div>
  );
}

export default App;
