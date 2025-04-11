
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Facebook, Instagram, Twitter, ArrowRight } from 'lucide-react';

const Landing = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-faroe-dark text-white flex flex-col relative">
      {/* Floating Navigation */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'py-3 px-8 md:px-8 bg-faroe-dark/95 backdrop-blur-md' : 'py-6 px-8 md:px-16'}`}>
        <div className={`max-w-7xl mx-auto rounded-full px-6 transition-all duration-300 ${isScrolled ? 'bg-faroe-gray-dark/80 backdrop-blur-md shadow-lg border border-faroe-gold/10' : ''} flex justify-between items-center`}>
          <div className="flex items-center">
            <h1 className="text-xl md:text-2xl font-serif tracking-wider text-faroe-gold">KERALA TRIPS</h1>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="hover:text-faroe-gold transition-colors relative group py-2">
              Tours
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-faroe-gold transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="#" className="hover:text-faroe-gold transition-colors relative group py-2">
              Experiences
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-faroe-gold transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="#" className="hover:text-faroe-gold transition-colors relative group py-2">
              About
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-faroe-gold transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="#" className="hover:text-faroe-gold transition-colors relative group py-2">
              Contact
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-faroe-gold transition-all duration-300 group-hover:w-full"></span>
            </a>
          </nav>
          
          <div className="flex items-center space-x-4">
            <Facebook className="w-5 h-5 text-white/80 hover:text-faroe-gold cursor-pointer transition-colors duration-300" />
            <Instagram className="w-5 h-5 text-white/80 hover:text-faroe-gold cursor-pointer transition-colors duration-300" />
            <Twitter className="w-5 h-5 text-white/80 hover:text-faroe-gold cursor-pointer transition-colors duration-300" />
          </div>
        </div>
      </header>

      {/* Spacer for fixed header */}
      <div className="h-24"></div>

      {/* Hero Section */}
      <section className="relative h-[75vh] overflow-hidden">
        <img 
          src="/lovable-uploads/9ca82c70-05e7-4c0c-a6c1-82e49b94029e.png" 
          alt="Kerala Landscape" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-faroe-dark/50 to-faroe-dark/80 flex flex-col justify-center px-8 md:px-16">
          <div className="max-w-7xl mx-auto w-full">
            <h1 className={`text-5xl md:text-7xl font-serif mb-6 tracking-wide transform transition-all duration-700 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <span className="text-faroe-gold">KERALA</span>
            </h1>
            <p className={`text-lg md:text-xl max-w-xl mb-8 transform transition-all delay-200 duration-700 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              Experience the alluring backwaters and lush mountains of God's Own Country with tours from 55,000 rupees for 5 days
            </p>
            <Link 
              to="/planner" 
              className={`gold-button inline-flex items-center transform transition-all delay-400 duration-700 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
            >
              EXPLORE TOURS <ArrowRight className="ml-2 w-4 h-4 animate-pulse" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 px-8 md:px-16 bg-faroe-gray-dark/50 backdrop-blur-sm relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1580293958132-fc0b14c663ca')] opacity-5 bg-cover bg-center"></div>
        <svg className="absolute left-0 top-0 h-full" width="80">
          <path
            d="M40,0 Q60,150 40,300 Q20,450 40,600 Q60,750 40,900"
            fill="none"
            className="dotted-path animate-path-draw"
          />
        </svg>
        
        <div className="relative z-10">
          <h2 className="text-3xl md:text-4xl font-serif mb-12 text-center">
            <span className="inline-block border-b-2 border-faroe-gold pb-2">Why Choose Us?</span>
          </h2>
          
          <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div className="p-6 glass-card hover:transform hover:scale-105 transition-all duration-300">
              <h3 className="text-xl font-serif mb-3 text-faroe-gold">Photography</h3>
              <p className="text-white/80">We capture your journey through Kerala's breathtaking landscapes, providing you with professional quality memories.</p>
            </div>
            
            <div className="p-6 glass-card hover:transform hover:scale-105 transition-all duration-300">
              <h3 className="text-xl font-serif mb-3 text-faroe-gold">Authenticity</h3>
              <p className="text-white/80">Experience true Kerala culture with our locally-guided tours, away from typical tourist traps.</p>
            </div>
            
            <div className="p-6 glass-card hover:transform hover:scale-105 transition-all duration-300">
              <h3 className="text-xl font-serif mb-3 text-faroe-gold">Comfort</h3>
              <p className="text-white/80">We select only the finest accommodations with premium amenities, ensuring a comfortable and relaxing stay.</p>
            </div>
            
            <div className="p-6 glass-card hover:transform hover:scale-105 transition-all duration-300">
              <h3 className="text-xl font-serif mb-3 text-faroe-gold">Safety</h3>
              <p className="text-white/80">Our expert guides and comprehensive emergency protocols ensure your journey remains safe and worry-free.</p>
            </div>
          </div>
          
          <div className="flex justify-center mt-12">
            <Link to="/planner" className="gold-button hover:transform hover:scale-105 transition-all duration-300 inline-flex items-center rounded-full shadow-lg">
              EXPLORE TOURS <ChevronRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* What You Can See Section */}
      <section className="py-20 px-8 md:px-16 bg-faroe-dark relative">
        <svg className="absolute left-0 top-0 h-full" width="80">
          <path
            d="M40,0 Q20,150 40,300 Q60,450 40,600"
            fill="none"
            className="dotted-path animate-path-draw"
          />
        </svg>
        
        <div className="relative z-10">
          <h2 className="text-3xl md:text-4xl font-serif mb-12 text-center">
            <span className="inline-block border-b-2 border-faroe-gold pb-2">What You Can See</span>
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <div className="aspect-square overflow-hidden rounded-2xl group glass-card p-2">
              <img 
                src="https://images.unsplash.com/photo-1602211844066-d3bb556e983b" 
                alt="Kerala Backwaters" 
                className="w-full h-full object-cover rounded-xl hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-faroe-dark/70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-xl">
                <p className="text-center text-white font-serif px-6 transform translate-y-4 group-hover:translate-y-0 transition-transform">
                  Explore serene backwaters on traditional houseboats
                </p>
              </div>
            </div>
            <div className="aspect-square overflow-hidden rounded-2xl group glass-card p-2">
              <img 
                src="https://images.unsplash.com/photo-1593693411515-c20261bcad6e" 
                alt="Kerala Tea Plantations" 
                className="w-full h-full object-cover rounded-xl hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-faroe-dark/70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-xl">
                <p className="text-center text-white font-serif px-6 transform translate-y-4 group-hover:translate-y-0 transition-transform">
                  Wander through misty tea plantations in the highlands
                </p>
              </div>
            </div>
            <div className="aspect-square overflow-hidden md:col-span-1 col-span-2 rounded-2xl group glass-card p-2">
              <img 
                src="https://images.unsplash.com/photo-1580293958132-fc0b14c663ca" 
                alt="Kerala Beaches" 
                className="w-full h-full object-cover rounded-xl hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-faroe-dark/70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-xl">
                <p className="text-center text-white font-serif px-6 transform translate-y-4 group-hover:translate-y-0 transition-transform">
                  Relax on pristine beaches with golden sunsets
                </p>
              </div>
            </div>
            <div className="aspect-square overflow-hidden rounded-2xl group glass-card p-2">
              <img 
                src="https://images.unsplash.com/photo-1582510003544-4d00b7f74220" 
                alt="Kerala Wildlife" 
                className="w-full h-full object-cover rounded-xl hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-faroe-dark/70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-xl">
                <p className="text-center text-white font-serif px-6 transform translate-y-4 group-hover:translate-y-0 transition-transform">
                  Encounter exotic wildlife in pristine sanctuaries
                </p>
              </div>
            </div>
            <div className="aspect-square overflow-hidden md:col-span-2 col-span-1 relative group rounded-2xl glass-card p-2">
              <img 
                src="https://images.unsplash.com/photo-1605649461784-ebc90250cb4e" 
                alt="Kerala Culture" 
                className="w-full h-full object-cover rounded-xl hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-faroe-dark/70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-xl">
                <p className="text-center text-white font-serif px-6 transform translate-y-4 group-hover:translate-y-0 transition-transform">
                  Discover the breathtaking diversity of Kerala's landscapes, from serene backwaters to lush mountains
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Tours Section */}
      <section className="py-20 px-8 md:px-16 bg-faroe-gray-dark/50 backdrop-blur-sm relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1593693397690-362cb9666fc2')] opacity-5 bg-cover bg-center"></div>
        
        <h2 className="text-3xl md:text-4xl font-serif mb-12 text-center relative z-10">
          <span className="inline-block border-b-2 border-faroe-gold pb-2">Our Tours</span>
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto relative z-10">
          <div className="glass-card rounded-2xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300 group">
            <div className="h-60 overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1623691478622-8f8b0e3839ac" 
                alt="Kerala North Tour" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-6">
              <div className="flex justify-between items-center mb-3">
                <span className="text-faroe-gold">5 days</span>
                <span className="bg-faroe-gold text-faroe-dark px-3 py-1 text-sm font-medium rounded-full">Kerala North</span>
              </div>
              <h3 className="text-xl font-serif mb-2">Kerala Highlands Adventure</h3>
              <p className="text-white/80 mb-4 text-sm">Explore the breathtaking tea plantations and wildlife sanctuaries of northern Kerala.</p>
              <Link to="/planner" className="text-faroe-gold hover:underline inline-flex items-center text-sm group">
                View details <ChevronRight className="ml-1 w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
          
          <div className="glass-card rounded-2xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300 group">
            <div className="h-60 overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1524492514790-8310bf594ea8" 
                alt="Kerala Backwaters Tour" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-6">
              <div className="flex justify-between items-center mb-3">
                <span className="text-faroe-gold">7 days</span>
                <span className="bg-faroe-gold text-faroe-dark px-3 py-1 text-sm font-medium rounded-full">Kerala Central</span>
              </div>
              <h3 className="text-xl font-serif mb-2">Kerala Inner Beauty</h3>
              <p className="text-white/80 mb-4 text-sm">Immerse yourself in Kerala's rich cultural heritage through traditional villages and ancient temples.</p>
              <Link to="/planner" className="text-faroe-gold hover:underline inline-flex items-center text-sm group">
                View details <ChevronRight className="ml-1 w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
          
          <div className="glass-card rounded-2xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300 group">
            <div className="h-60 overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1593693397690-362cb9666fc2" 
                alt="Complete Kerala Tour" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-6">
              <div className="flex justify-between items-center mb-3">
                <span className="text-faroe-gold">9 days</span>
                <span className="bg-faroe-gold text-faroe-dark px-3 py-1 text-sm font-medium rounded-full">Complete Tour</span>
              </div>
              <h3 className="text-xl font-serif mb-2">Grand Kerala Expedition</h3>
              <p className="text-white/80 mb-4 text-sm">Experience the complete beauty of Kerala from mountains to backwaters in our comprehensive tour.</p>
              <Link to="/planner" className="text-faroe-gold hover:underline inline-flex items-center text-sm group">
                View details <ChevronRight className="ml-1 w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
        
        <div className="flex justify-center mt-12 relative z-10">
          <Link to="/planner" className="gold-button hover:transform hover:scale-105 transition-all duration-300 rounded-full shadow-lg flex items-center">
            START PLANNING YOUR TRIP <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-8 md:px-16 bg-faroe-dark backdrop-blur-md border-t border-faroe-gold/20">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-serif mb-4 text-faroe-gold">KERALA TRIPS</h3>
            <p className="text-white/80">Discover the beauty of God's Own Country with our expertly guided tours and personalized experiences.</p>
          </div>
          
          <div>
            <h3 className="text-xl font-serif mb-4 text-faroe-gold">Contact</h3>
            <p className="text-white/80">Email: info@keralatrips.com</p>
            <p className="text-white/80">Phone: +91 9876543210</p>
            <p className="text-white/80">Address: Kochi, Kerala, India</p>
          </div>
          
          <div>
            <h3 className="text-xl font-serif mb-4 text-faroe-gold">Follow Us</h3>
            <div className="flex space-x-4">
              <Facebook className="w-6 h-6 text-white/80 hover:text-faroe-gold cursor-pointer transition-colors duration-300" />
              <Instagram className="w-6 h-6 text-white/80 hover:text-faroe-gold cursor-pointer transition-colors duration-300" />
              <Twitter className="w-6 h-6 text-white/80 hover:text-faroe-gold cursor-pointer transition-colors duration-300" />
            </div>
          </div>
        </div>
        
        <div className="max-w-6xl mx-auto mt-8 pt-8 border-t border-faroe-gold/20 text-center text-white/60">
          <p>© 2025 Kerala Trips. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
