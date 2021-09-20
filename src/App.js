import './App.css';
import { useState, useEffect } from 'react';

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
      URL: 'https://kind-shockley-bb822e.netlify.app',
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

  const metadata = {
    page_title: 'Information Risks Assessment',
    page_favicon: '/cognni_favicon.png',
  };

  const getFavIcon = () => {
    return document.querySelector('#favicon');
  };

  useEffect(() => {
    const favicon = getFavIcon();
    // Update the page metadata
    document.title = metadata.page_title;
    favicon.href = '/cognni_favicon.png';
    const iframeOriginHeader = iframeObject[0].URL;
    const iframeOriginApp = iframeObject[1].URL;
    const iframeOriginFooter = iframeObject[2].URL;
    eventer(messageEvent, function (e) {
      // Only when steps changes
      if (e.origin === iframeOriginApp && e.data.step) {
        // console.log(e.data);
        console.log(e.data);
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

  return (
    <div className='App'>
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
