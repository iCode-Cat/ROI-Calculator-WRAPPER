import './App.css';

function App() {
  const iframeObject = {
    header: {
      URL: 'https://roi-calculator-header.vercel.app/',
      fixedHeight: '410px',
    },
    footer: {
      URL: '',
      fixedHeight: '70px',
    },
  };

  const { header, footer } = iframeObject;

  return (
    <div className='App'>
      <iframe
        src={header.URL}
        title='header'
        scrolling='no'
        id='header'
        width='100%'
        height={header.fixedHeight}
      ></iframe>
      <iframe
        title='calculator'
        id='calculator'
        src='https://kind-shockley-bb822e.netlify.app/'
        width='100%'
        height='100%'
      ></iframe>
      <iframe
        src={footer.URL}
        title='footer'
        scrolling='no'
        id='footer'
        width='100%'
        height={footer.fixedHeight}
      ></iframe>
    </div>
  );
}

export default App;
