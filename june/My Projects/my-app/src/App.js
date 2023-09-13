import './App.css';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
// Portfolio Writable
function App() {
  return (
    <div className='root-container' >
        {/* Navbar
              logo 
              home 
              achievements
              heatmap
              graphs from habit app using its content 
              contacts
              social ids
         */}
        <Navbar/>
        <HeroSection/>
        {/* <Achievements/>
        <Heatmap/>
        <Graph/>
        <Contact/> */}
    </div>
  );
}

export default App;
