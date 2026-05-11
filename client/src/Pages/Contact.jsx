import { Link } from 'react-router-dom';

export default function Contact() {
  return (
    <div className="w-full">

      <div className="container mx-auto px-4 lg:px-8 py-4">
        <p className="text-xs text-gray-500 font-medium uppercase tracking-widest">
          <Link to="/" className="hover:text-black">Home</Link> <span className="mx-2">|</span> 
          <span>Contact</span>
        </p>
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-12 lg:py-20">
        
        {/*Sayfa Başlığı*/}
        <div className="text-center mb-16 md:mb-24">
          <h1 className="text-3xl md:text-5xl font-black uppercase tracking-widest text-gray-900 mb-4">
            Contact Us
          </h1>
          <p className="text-sm text-gray-500 uppercase tracking-widest max-w-2xl mx-auto">
            We are here to help. Reach out to us for any inquiries regarding your order, styling advice, or our collection.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 max-w-6xl mx-auto">
          
          {/*iletişim Bilgileri*/}
          <div className="lg:w-1/3 flex flex-col space-y-10">
            
            <div>
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-3">Customer Service</h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-1">hello@stylestore.com</p>
              <p className="text-sm text-gray-600 leading-relaxed">+1 (555) 123-4567</p>
              <p className="text-xs text-gray-400 mt-2 uppercase tracking-wider">Mon - Fri, 9:00 AM - 6:00 PM</p>
            </div>

            <div>
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-3">Headquarters</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                125 Fashion Avenue<br />
                Suite 400<br />
                New York, NY 10001
              </p>
            </div>

            <div>
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-3">Follow Us</h3>
              <div className="flex gap-4">
                <a href="#" className="text-sm text-gray-500 hover:text-black uppercase tracking-wider transition-colors border-b border-transparent hover:border-black">Instagram</a>
                <a href="#" className="text-sm text-gray-500 hover:text-black uppercase tracking-wider transition-colors border-b border-transparent hover:border-black">Pinterest</a>
              </div>
            </div>

          </div>

          {/*İletişim Formu*/}
          <div className="lg:w-2/3">
            <form className="flex flex-col space-y-8" onSubmit={(e) => e.preventDefault()}>
              
              <div className="flex flex-col md:flex-row gap-8">
                <div className="flex-1 relative">
                  <input 
                    type="text" 
                    id="name"
                    placeholder="FULL NAME" 
                    className="w-full bg-transparent border-b border-gray-300 py-3 text-sm text-gray-900 focus:outline-none focus:border-black transition-colors placeholder-gray-400 uppercase tracking-wider"
                    required
                  />
                </div>
                <div className="flex-1 relative">
                  <input 
                    type="email" 
                    id="email"
                    placeholder="EMAIL ADDRESS" 
                    className="w-full bg-transparent border-b border-gray-300 py-3 text-sm text-gray-900 focus:outline-none focus:border-black transition-colors placeholder-gray-400 uppercase tracking-wider"
                    required
                  />
                </div>
              </div>

              <div className="relative">
                <input 
                  type="text" 
                  id="subject"
                  placeholder="SUBJECT" 
                  className="w-full bg-transparent border-b border-gray-300 py-3 text-sm text-gray-900 focus:outline-none focus:border-black transition-colors placeholder-gray-400 uppercase tracking-wider"
                  required
                />
              </div>

              <div className="relative">
                <textarea 
                  id="message"
                  rows="4"
                  placeholder="YOUR MESSAGE" 
                  className="w-full bg-transparent border-b border-gray-300 py-3 text-sm text-gray-900 focus:outline-none focus:border-black transition-colors placeholder-gray-400 uppercase tracking-wider resize-none"
                  required
                ></textarea>
              </div>

              <button 
                type="submit" 
                className="self-start bg-black text-white px-10 py-4 text-sm font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors"
              >
                Send Message
              </button>

            </form>
          </div>

        </div>
      </div>
    </div>
  );
}