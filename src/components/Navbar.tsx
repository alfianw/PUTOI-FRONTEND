import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Menu, X, Search, User, BookOpen, LogOut, LayoutDashboard } from "lucide-react";
import { Input } from "./ui/input";
import { useAuth } from "../utils/auth-context";
import { AuthModal } from "./AuthModal";
import { ProfileModal } from "./ProfileModal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import "../styles/globals.css";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [profileUserEmail, setProfileUserEmail] = useState<string | null>(null);
  const [mobileSearch, setMobileSearch] = useState("");
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const openAuthModal = (mode: 'signin' | 'signup') => {
    setAuthMode(mode);
    setAuthModalOpen(true);
  };

  const openProfileModal = () => {
    setProfileUserEmail(user?.email || null); // simpan email saat modal dibuka
    setProfileModalOpen(true);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/"); // SPA-friendly
  };

  const getDashboardLink = () => user?.role === 'superadmin' ? '/superadmin' : '/';

  const canAccessProfile = user?.role === 'superadmin' || user?.role === 'student';

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-r from-blue-900 to-blue-600 p-2 rounded-lg">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl bg-gradient-to-r from-blue-900 to-blue-600 bg-clip-text text-transparent">
              EduLearn
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#/" className="text-gray-700 hover:text-blue-900 transition-colors">Beranda</a>
            <a href="#/putoi" className="text-gray-700 hover:text-blue-900 transition-colors">PUTOI</a>
            <a href="#courses" className="text-gray-700 hover:text-blue-900 transition-colors">Kursus</a>
            <a href="#categories" className="text-gray-700 hover:text-blue-900 transition-colors">Kategori</a>
            <a href="#contact" className="text-gray-700 hover:text-blue-900 transition-colors">Kontak</a>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <Search className="w-5 h-5" />
            </Button>

            {user ? (
              canAccessProfile ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="gap-2">
                      <User className="w-4 h-4" />
                      {user.name || user.email}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>
                      <div>
                        <div>{user.name || user.email}</div>
                        <div className="text-xs text-gray-500">{user.email}</div>
                        <div className="text-xs text-blue-900 capitalize mt-1">Role: {user.role}</div>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />

                    {/* Profile */}
                    <DropdownMenuItem onClick={openProfileModal} className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </DropdownMenuItem>

                    {user.role === 'superadmin' && (
                      <>
                        <DropdownMenuItem onClick={() => navigate(getDashboardLink())} className="cursor-pointer">
                          <LayoutDashboard className="mr-2 h-4 w-4" />
                          Dashboard
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                      </>
                    )}

                    {/* Logout */}
                    <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer">
                      <LogOut className="mr-2 h-4 w-4" />
                      Keluar
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : null
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
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Cari kursus..."
                className="pl-10"
                value={mobileSearch}
                onChange={(e) => setMobileSearch(e.target.value)}
              />
            </div>
            <a onClick={() => setIsMenuOpen(false)} href="#/" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">Beranda</a>
            <a onClick={() => setIsMenuOpen(false)} href="#/putoi" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">PUTOI</a>
            <a onClick={() => setIsMenuOpen(false)} href="#courses" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">Kursus</a>
            <a onClick={() => setIsMenuOpen(false)} href="#categories" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">Kategori</a>
            <a onClick={() => setIsMenuOpen(false)} href="#contact" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">Kontak</a>

            <div className="flex flex-col gap-2 pt-4 border-t">
              {user && canAccessProfile && (
                <>
                  <Button variant="outline" className="w-full gap-2" onClick={openProfileModal}>
                    <User className="w-4 h-4" />
                    Profile
                  </Button>

                  {user.role === 'superadmin' && (
                    <Button variant="outline" className="w-full gap-2" onClick={() => navigate(getDashboardLink())}>
                      <LayoutDashboard className="w-4 h-4" />
                      Dashboard
                    </Button>
                  )}

                  <Button variant="outline" className="w-full gap-2" onClick={handleSignOut}>
                    <LogOut className="w-4 h-4" />
                    Keluar
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} mode={authMode} />
      {canAccessProfile && profileUserEmail && (
        <ProfileModal
          isOpen={profileModalOpen}
          onClose={() => setProfileModalOpen(false)}
          user={{ email: profileUserEmail }}
        />
      )}
    </nav>
  );
}
