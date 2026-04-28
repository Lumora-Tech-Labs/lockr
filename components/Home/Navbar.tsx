import Link from 'next/link';
import { SignInButton, SignUpButton } from '@clerk/nextjs';

export default function Navbar() {
  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Features', href: '#features' },
    { name: 'How It Works', href: '#howitworks' },
    { name: 'Pricing', href: '#pricing' },
  ];

  return (
    <header className="bg-white px-6 py-4 border-b">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Name */}
        <Link
          href="/"
          className="flex items-center gap-2 text-2xl font-bold text-gray-900"
        >
          <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
            <div className="w-5 h-5 rounded bg-pink-500 rotate-45"></div>
          </div>
          Lockr
        </Link>

        {/* Navigation Links */}
        <nav className="flex items-center gap-8">
          {navLinks.map((link, index) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-base font-medium ${
                index === 0 ? 'text-pink-500' : 'text-gray-900'
              } hover:text-pink-500 transition-colors`}
            >
              {link.name}
            </Link>
          ))}
          <Link
            href="/blog"
            className="text-base font-medium text-gray-900 hover:text-pink-500 transition-colors"
          >
            Blog
          </Link>
        </nav>

        {/* Auth Buttons */}
        <div className="flex items-center gap-4">
          <SignUpButton mode="modal">
            {/* By putting the classes on a span, Clerk sees only ONE child (the span) */}
            <span className="cursor-pointer px-5 py-2.5 rounded-xl border border-gray-300 text-base font-medium text-gray-900 hover:bg-gray-50 transition-colors">
              Sign up
            </span>
          </SignUpButton>

          <SignInButton mode="modal">
            <span className="cursor-pointer px-5 py-2.5 rounded-xl bg-black text-base font-medium text-white hover:bg-gray-800 transition-colors">
              Log in
            </span>
          </SignInButton>
        </div>
      </div>
    </header>
  );
}
