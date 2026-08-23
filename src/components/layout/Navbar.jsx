import { useEffect, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { siteConfig } from '@/data/siteConfig';
import { cn } from '@/lib/utils';

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/projects', label: 'Projects' },
  { to: '/about', label: 'About' },
  { to: '/experience', label: 'Experience' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          'fixed inset-x-0 top-0 z-50 px-5 transition-all duration-500 ease-soft-out sm:px-8',
          scrolled
            ? 'py-3'
            : 'py-5'
        )}
      >
        <div
          className={cn(
            'mx-auto flex h-[60px] w-full max-w-[1240px] items-center justify-between rounded-full border px-4 transition-all duration-500 ease-soft-out sm:px-6',
            scrolled
              ? 'border-white/70 bg-white/70 shadow-glass backdrop-blur-xl'
              : 'border-transparent bg-transparent'
          )}
        >
          <Link
            to="/"
            className="group flex items-center gap-2.5 font-display text-[1rem] font-bold tracking-[0.12em] text-ink"
            aria-label={`${siteConfig.name} - Home`}
          >
            <span className="transition-colors group-hover:text-accent">
              {siteConfig.shortName.toUpperCase()}.
            </span>
          </Link>

          <nav className="hidden md:block">
            <ul className="flex items-center gap-1">
              {navItems.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    end={item.to === '/'}
                    className={({ isActive }) =>
                      cn(
                        'relative inline-block rounded-full px-3.5 py-1.5 text-[0.83rem] font-medium transition-colors duration-200',
                        isActive
                          ? 'text-ink'
                          : 'text-ink-secondary hover:text-ink'
                      )
                    }
                  >
                    <span>{item.label}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <motion.a
              href={siteConfig.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="hidden items-center gap-1.5 rounded-full bg-ink px-4 py-2 text-[0.78rem] font-semibold text-bg sm:inline-flex"
            >
              Resume
              <motion.span
                whileHover={{ x: 2, y: -2 }}
                transition={{ type: 'spring', stiffness: 360, damping: 22 }}
              >
                <ArrowUpRight size={12} strokeWidth={2.2} />
              </motion.span>
            </motion.a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="grid h-9 w-9 place-items-center rounded-full border border-line bg-surface text-ink transition-colors hover:bg-surface-soft md:hidden"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
            >
              <span className="sr-only">Toggle menu</span>
              <div className="relative h-3 w-4">
                <span
                  className={cn(
                    'absolute left-0 top-0 h-[1.5px] w-full origin-center bg-ink transition-transform duration-300',
                    open && 'translate-y-[6px] rotate-45'
                  )}
                />
                <span
                  className={cn(
                    'absolute left-0 bottom-0 h-[1.5px] w-full origin-center bg-ink transition-transform duration-300',
                    open && '-translate-y-[6px] -rotate-45'
                  )}
                />
              </div>
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-nav"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-0 top-[88px] z-40 mx-5 overflow-hidden rounded-3xl border border-white/70 bg-white/80 shadow-glass-lift backdrop-blur-xl sm:mx-8"
          >
            <nav className="flex flex-col p-6">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.to}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * i, duration: 0.35 }}
                >
                  <NavLink
                    to={item.to}
                    end={item.to === '/'}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      cn(
                        'flex items-center justify-between border-b border-line py-4 text-[1rem] transition-colors',
                        isActive
                          ? 'text-ink'
                          : 'text-ink-secondary hover:text-ink'
                      )
                    }
                  >
                    <span className="flex items-center gap-3">
                      <span className="font-mono text-[0.7rem] text-ink-muted">
                        0{i + 1}
                      </span>
                      <span className="font-medium">{item.label}</span>
                    </span>
                    <ArrowUpRight size={16} strokeWidth={1.6} />
                  </NavLink>
                </motion.div>
              ))}
              <motion.a
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                href={siteConfig.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-ink px-5 py-3 text-[0.86rem] font-semibold text-bg"
              >
                Resume
                <ArrowUpRight size={13} strokeWidth={2.2} />
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
