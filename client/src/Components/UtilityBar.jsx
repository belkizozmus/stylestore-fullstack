import { FiRotateCcw, FiHelpCircle, FiTruck } from 'react-icons/fi';
import { Link } from 'react-router-dom';

export default function UtilityBar() {
  const utilities = [
    { icon: <FiRotateCcw />, label: 'Returns', path: '/returns' },
    { icon: <FiHelpCircle />, label: 'Help', path: '/help' },
    { icon: <FiTruck />, label: 'Track', path: '/track' },
  ];

  return (
    <section className="border-t border-gray-100 bg-white py-12 relative z-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-3 gap-4">
          {utilities.map((item, index) => (
            <Link 
              key={index} 
              to={item.path} 
              className="flex flex-col items-center justify-center gap-4 group cursor-pointer outline-none"
            >
              <div className="text-2xl text-gray-800 transition-transform duration-300 group-hover:-translate-y-1">
                {item.icon}
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-800 border-b border-transparent group-hover:border-gray-800 transition-all">
                {item.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}