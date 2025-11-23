import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Menu, X, Search, User, Droplet, LogOut, LayoutDashboard } from "lucide-react";
import { useAuth } from "../../utils/auth-context";
import { AuthModal } from "../AuthModal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export function NavbarPUTOI() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [activeSection, setActiveSection] = useState('');
  const { user, signOut } = useAuth();

  const openAuthModal = (mode: 'signin' | 'signup') => {
    setAuthMode(mode);
    setAuthModalOpen(true);
  };

  const handleSignOut = async () => {
    await signOut();
    window.location.href = '#/';
  };

  const getDashboardLink = () => {
    if (user?.role === 'superadmin') return '#/superadmin';
    if (user?.role === 'admin') return '#/admin';
    return '#/';
  };

  const navLinks = [
    { id: 'about', label: 'Tentang' },
    { id: 'why-choose-us', label: 'Keunggulan' },
    { id: 'services', label: 'Layanan' },
    { id: 'products', label: 'Produk' },
    { id: 'contact', label: 'Kontak' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = navLinks.map(link => document.getElementById(link.id));
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navLinks[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#/putoi" className="flex items-center gap-2">
            <div className="bg-gradient-to-r from-blue-900 to-blue-600 p-2 rounded-lg">
              <Droplet className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-xl bg-gradient-to-r from-blue-900 to-blue-600 bg-clip-text text-transparent block">
                PUTOI
              </span>
              <span className="text-xs text-gray-500">PNJ Water Treatment</span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#/" className="text-gray-700 hover:text-blue-900 transition-colors">
              Home
            </a>
            {navLinks.map(link => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`text-gray-700 hover:text-blue-900 transition-colors ${
                  activeSection === link.id ? 'text-blue-900 font-medium' : ''
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <User className="w-4 h-4" />
                    {user.name}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div>
                      <div>{user.name}</div>
                      <div className="text-xs text-gray-500">{user.email}</div>
                      <div className="text-xs text-blue-900 capitalize mt-1">
                        Role: {user.role}
                      </div>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {(user.role === 'admin' || user.role === 'superadmin') && (
                    <>
                      <DropdownMenuItem onClick={() => window.location.href = getDashboardLink()} className="cursor-pointer">
                        <LayoutDashboard className="mr-2 h-4 w-4" />
                        Dashboard
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                    </>
                  )}
                  <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    Keluar
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button variant="outline" className="gap-2" onClick={() => openAuthModal('signin')}>
                  <User className="w-4 h-4" />
                  Masuk
                </Button>
                <Button 
                  className="bg-gradient-to-r from-blue-900 to-blue-600 hover:from-blue-800 hover:to-blue-500"
                  onClick={() => openAuthModal('signup')}
                >
                  Daftar
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-4">
            <a
              href="#/"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              Home
            </a>
            {navLinks.map(link => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg ${
                  activeSection === link.id ? 'bg-blue-50 text-blue-900' : ''
                }`}
              >
                {link.label}
              </button>
            ))}
            <div className="flex flex-col gap-2 pt-4 border-t">
              {user ? (
                <>
                  <div className="px-4 py-2 bg-gray-50 rounded-lg">
                    <div className="text-sm">{user.name}</div>
                    <div className="text-xs text-gray-500">{user.email}</div>
                    <div className="text-xs text-blue-900 capitalize mt-1">
                      Role: {user.role}
                    </div>
                  </div>
                  {(user.role === 'admin' || user.role === 'superadmin') && (
                    <Button 
                      variant="outline" 
                      className="w-full gap-2" 
                      onClick={() => window.location.href = getDashboardLink()}
                    >
                      <LayoutDashboard className="w-4 h-4" />
                      Dashboard
                    </Button>
                  )}
                  <Button variant="outline" className="w-full gap-2" onClick={handleSignOut}>
                    <LogOut className="w-4 h-4" />
                    Keluar
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="outline" className="w-full gap-2" onClick={() => openAuthModal('signin')}>
                    <User className="w-4 h-4" />
                    Masuk
                  </Button>
                  <Button 
                    className="w-full bg-gradient-to-r from-blue-900 to-blue-600"
                    onClick={() => openAuthModal('signup')}
                  >
                    Daftar
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
      
      <AuthModal 
        isOpen={authModalOpen} 
        onClose={() => setAuthModalOpen(false)} 
        defaultMode={authMode}
      />
    </nav>
  );
}
