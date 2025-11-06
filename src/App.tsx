// --- FIX: Use relative paths for all imports ---
import { AppProvider } from './components/AppContext';
import Navigation from './components/Navigation';
import BottomNavigation from './components/BottomNavigation';
import PageProgress from './components/PageProgress';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import Certificates from './components/Certificates';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    // 1. Wrap your entire application in the AppProvider
    <AppProvider>
      {/* 2. Your navigation components now read from the provider */}
      <Navigation />
      <BottomNavigation />
      <PageProgress />

      {/* 3. Your page sections */}
      {/* These components MUST have the correct top-level IDs */}
      <main>
        <Hero />       {/* Has id="home" */}
        <About />      {/* Has id="about" */}
        <Services />   {/* Has id="services" */}
        <Portfolio />  {/* Has id="projects" */}
        <Certificates /> {/* Has id="certificates" */}
        <Contact />    {/* Has id="contact" */}
      </main>
      
      <Footer />
    </AppProvider>
  );
}

export default App;

