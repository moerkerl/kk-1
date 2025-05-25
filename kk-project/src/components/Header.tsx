import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../utils/cn';
import { Menu, X, Shield } from 'lucide-react';
import Button from './Button';

interface NavLink {
  label: string;
  href: string;
}

const navLinks: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'Chat', href: '/chat' },
  { label: 'Angebote', href: '/offers' },
];

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActiveLink = (href: string) => {
    return location.pathname === href;
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-md border-b border-gray-200">
      <nav className="container-padding">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-2 text-xl font-bold text-gray-900 hover:text-primary-600 transition-colors"
          >
            <Shield className="h-8 w-8 text-primary-600" />
            <span>KrankenkassenAssistent</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  'text-sm font-medium transition-colors hover:text-primary-600',
                  isActiveLink(link.href)
                    ? 'text-primary-600'
                    : 'text-gray-700'
                )}
              >
                {link.label}
              </Link>
            ))}
            <Button
              variant="primary"
              size="sm"
              onClick={() => window.location.href = '/chat'}
            >
              Beratung starten
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden rounded-lg p-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white animate-slide-up">
          <div className="container-padding py-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setIsMenuOpen(false)}
                className={cn(
                  'block px-4 py-2 text-base font-medium rounded-lg transition-colors',
                  isActiveLink(link.href)
                    ? 'bg-primary-50 text-primary-600'
                    : 'text-gray-700 hover:bg-gray-100'
                )}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2">
              <Button
                variant="primary"
                fullWidth
                onClick={() => {
                  setIsMenuOpen(false);
                  window.location.href = '/chat';
                }}
              >
                Beratung starten
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;