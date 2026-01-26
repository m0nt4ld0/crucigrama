import React from 'react';

const Footer = () => {
  return (
    <footer className="mt-auto bg-gradient-to-r from-black via-gray-900 to-black border-t border-gray-700/40 text-center py-8 text-gray-400 text-sm">
      <div className="container mx-auto px-4">
        <p className="mb-3 text-gray-300 hover:text-white transition-colors">
          &copy; {new Date().getFullYear()} - <span className="font-semibold text-gray-100">Mariela Montaldo</span>. All Rights Reserved.
        </p>
        <div className="flex items-center justify-center gap-2 flex-wrap">
          <span className="text-gray-200">|</span>
          <a 
            target="_blank" 
            rel="noopener noreferrer" 
            href="https://icons8.com/icon/rue7kq0Pgo0B/crossword" 
            className="text-gray-100 hover:text-gray-200 transition-all duration-300 font-semibold hover:underline"
          >
            🎨 Crossword Icon
          </a>
          <span className="text-gray-200">by</span>
          <a 
            target="_blank" 
            rel="noopener noreferrer" 
            href="https://icons8.com" 
            className="text-gray-100 hover:text-gray-200 transition-all duration-300 font-semibold hover:underline"
          >
            Icons8
          </a>
        </div>
        <p className="mt-4 text-xs text-gray-500">
          Built with ❤️ using React + Tailwind CSS
        </p>
      </div>
    </footer>
  );
};

export default Footer;