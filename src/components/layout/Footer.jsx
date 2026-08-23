import { motion } from 'framer-motion';
import { Mail, ArrowUpRight } from 'lucide-react';
import SocialLinks from '@/components/common/SocialLinks';
import { siteConfig } from '@/data/siteConfig';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-line bg-bg">
      <div className="container-page py-14">
        <div className="flex flex-col items-start gap-10 md:flex-row md:items-end md:justify-between">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
              Let&apos;s build something thoughtful.
            </p>
            <a
              href={`mailto:${siteConfig.email}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-4 inline-flex items-center gap-2.5 rounded-full bg-ink px-4 py-2 text-[0.82rem] font-semibold text-bg transition-all hover:-translate-y-0.5 hover:shadow-soft"
            >
              <Mail size={14} strokeWidth={2} />
              <span>{siteConfig.email}</span>
              <ArrowUpRight
                size={13}
                strokeWidth={2}
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </a>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <SocialLinks variant="inline" />
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-line pt-6 text-[0.78rem] text-ink-muted sm:flex-row sm:items-center"
        >
          <p className="font-mono">
            © {year} {siteConfig.name} <span className="opacity-50">/</span> {siteConfig.location}
          </p>
          <p className="font-mono">Designed &amp; built from scratch</p>
        </motion.div>
      </div>
    </footer>
  );
}