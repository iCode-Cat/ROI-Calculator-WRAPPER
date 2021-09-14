import './App.css';
import { useState, useEffect } from 'react';
var eventMethod = window.addEventListener ? 'addEventListener' : 'attachEvent';
var eventer = window[eventMethod];
var messageEvent = eventMethod === 'attachEvent' ? 'onmessage' : 'message';

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
      URL: 'http://localhost:3001',
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

  useEffect(() => {
    const iframeOriginHeader = iframeObject[0].URL;
    const iframeOriginApp = iframeObject[1].URL;
    const iframeOriginFooter = iframeObject[2].URL;
    eventer(messageEvent, function (e) {
      if (e.origin === iframeOriginApp) {
        setScrollApp(e.data);
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
    document.addEventListener(
      'wheel',
      function (e) {
        e.preventDefault(); // Prevent user scroll during page jump
      },
      {
        passive: false,
      }
    );
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
      {iframeObject.map((iframe) => (
        <iframe
          src={iframe.URL}
          title={iframe.uniqueName}
          id={iframe.uniqueName}
          width='100%'
          height={iframe.fixedHeightWeb}
        ></iframe>
      ))}
    </div>
  );
}

export default App;
