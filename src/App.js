import './App.css';
import { useState, useEffect } from 'react';
var eventMethod = window.addEventListener ? 'addEventListener' : 'attachEvent';
var eventer = window[eventMethod];
var messageEvent = eventMethod === 'attachEvent' ? 'onmessage' : 'message';

function App() {
  const [scrollSize, setScrollSize] = useState();
  const [iframeObject, setIframeObject] = useState([
    {
      id: 1,
      URL: 'https://roi-calculator-header.vercel.app/',
      fixedHeightWeb: '410px',
      uniqueName: 'header',
    },
    {
      id: 2,
      URL: 'http://localhost:3001/',
      fixedHeightWeb: '490px',
      uniqueName: 'calculator',
    },
    {
      id: 3,
      URL: 'https://roi-calculator-footer.vercel.app/',
      fixedHeightWeb: '400px',
      uniqueName: 'footer',
    },
  ]);

  useEffect(() => {
    eventer(messageEvent, function (e) {
      const iframeOrigin = 'http://localhost:3001';
      if (e.origin === iframeOrigin) {
        setScrollSize(e.data);
      }
    });
  }, []);

  useEffect(() => {
    iframeObject[1].fixedHeightWeb = scrollSize + 'px';
    setIframeObject([...iframeObject]);
  }, [scrollSize]);

  return (
    <div className='App'>
      {iframeObject.map((iframe) => (
        <iframe
          src={iframe.URL}
          title={iframe.uniqueName}
          scrolling='no'
          id={iframe.uniqueName}
          width='100%'
          height={iframe.fixedHeightWeb}
        ></iframe>
      ))}
    </div>
  );
}

export default App;
