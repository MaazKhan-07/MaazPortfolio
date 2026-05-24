import VideoIntro from '@/components/VideoIntro/VideoIntro';
import Navbar from '@/components/Navbar/Navbar';
import About from '@/components/About/About';
import Services from '@/components/Services/Services';
import TechStack from '@/components/TechStack/TechStack';
import Projects from '@/components/Projects/Projects';
import Certificates from '@/components/Certificates/Certificates';
import Contact from '@/components/Contact/Contact';
import Footer from '@/components/Footer/Footer';

export default function Home() {
  return (
    <main style={{ backgroundColor: '#030303', minHeight: '100vh' }}>
      <div id="home">
        <VideoIntro />
      </div>
      <Navbar />
      <About />
      <Services />
      <TechStack />
      <Projects />
      <Certificates />
      <Contact />
      <Footer />
    </main>
  );
}
