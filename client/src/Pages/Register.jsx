import { Link } from 'react-router-dom';

export default function Register() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-white px-4 py-12">

      <div className="w-full max-w-md border border-gray-100 p-8 sm:p-12 shadow-sm rounded-sm">
        
        <div className="text-center mb-10">
          <h1 className="text-3xl font-black uppercase tracking-widest text-gray-900 mb-2">Register</h1>
          <p className="text-xs text-gray-500 uppercase tracking-widest">Join Stylestore today.</p>
        </div>

        <form className="flex flex-col space-y-8" onSubmit={(e) => e.preventDefault()}>
          
          <div className="flex flex-col sm:flex-row gap-8">
            <div className="relative flex-1">
              <input 
                type="text" 
                id="firstName"
                placeholder="FIRST NAME" 
                className="w-full bg-transparent border-b border-gray-300 py-3 text-sm text-gray-900 focus:outline-none focus:border-black transition-colors placeholder-gray-400 uppercase tracking-wider"
                required
              />
            </div>
            <div className="relative flex-1">
              <input 
                type="text" 
                id="lastName"
                placeholder="LAST NAME" 
                className="w-full bg-transparent border-b border-gray-300 py-3 text-sm text-gray-900 focus:outline-none focus:border-black transition-colors placeholder-gray-400 uppercase tracking-wider"
                required
              />
            </div>
          </div>

          <div className="relative">
            <input 
              type="email" 
              id="email"
              placeholder="EMAIL ADDRESS" 
              className="w-full bg-transparent border-b border-gray-300 py-3 text-sm text-gray-900 focus:outline-none focus:border-black transition-colors placeholder-gray-400 uppercase tracking-wider"
              required
            />
          </div>

          <div className="relative">
            <input 
              type="password" 
              id="password"
              placeholder="PASSWORD" 
              className="w-full bg-transparent border-b border-gray-300 py-3 text-sm text-gray-900 focus:outline-none focus:border-black transition-colors placeholder-gray-400 uppercase tracking-wider"
              required
            />
          </div>

          <div className="flex flex-col gap-4 pt-2">
            <label className="flex items-start gap-3 cursor-pointer">
              <input type="checkbox" className="w-4 h-4 accent-black mt-0.5" required />
              <span className="text-[10px] text-gray-500 uppercase tracking-widest leading-relaxed">
                I agree to the <a href="#" className="border-b border-gray-400 hover:border-black text-gray-900">Terms & Conditions</a>
              </span>
            </label>
            <label className="flex items-start gap-3 cursor-pointer">
              <input type="checkbox" className="w-4 h-4 accent-black mt-0.5" />
              <span className="text-[10px] text-gray-500 uppercase tracking-widest leading-relaxed">
                Sign me up for the newsletter
              </span>
            </label>
          </div>

          <button 
            type="submit" 
            className="w-full bg-black text-white py-4 text-sm font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors mt-4"
          >
            Create Account
          </button>

        </form>

        <div className="mt-10 text-center border-t border-gray-200 pt-8">
          <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-4">Already have an account?</p>
          <Link to="/login" className="inline-block w-full border border-black text-black py-4 text-sm font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-colors">
            Log In Here
          </Link>
        </div>

      </div>
    </div>
  );
}