import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <span className="font-bold text-xl text-gray-50 font-Boldonse">AceRich</span>
            <p className="text-sm pt-4 text-gray-400 leading-relaxed">
              Empowering Skills For A Brighter Future.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              {[
                { label: 'Home', to: '/' },
                { label: 'About', to: '/about' },
                { label: 'Programs', to: '/programs' },
                { label: 'Contact', to: '/contact' },
              ].map(({ label, to }) => (
                <li key={label}>
                  <Link to={to} className="hover:text-white transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm">Resources</h4>
            <ul className="space-y-2 text-sm">
              {['Blog', 'Events', 'Gallery', 'Support'].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-white transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-2 md:col-span-1">
            <h4 className="text-white font-semibold mb-4 text-sm">Contact</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a href="mailto:acerichcollege@gmail.com" className="hover:text-white transition-colors break-all">
                  acerichcollege@gmail.com
                </a>
              </li>
              <li>
                <a href="tel:+254725021368" className="hover:text-white transition-colors">
                  +254 725 021 368
                </a>
              </li>
              <li className="leading-relaxed">Rivarori Near Smarthome Supermarket (Opp. MeatyMeat Hotel)</li>
              <li className="leading-relaxed">Branch: A.C.K St. Stephen Church, Gathiga</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>&copy; 2026 AceRich. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
 
