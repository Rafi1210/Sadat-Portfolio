import { motion } from 'framer-motion';
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
              className="link-underline mt-3 inline-block text-ink-secondary transition-colors hover:text-ink"
            >
              {siteConfig.email}
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