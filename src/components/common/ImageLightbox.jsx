import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';

export default function ImageLightbox({ src, alt, onClose }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        key="lightbox"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 sm:p-8"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-label={alt || 'Image preview'}
      >
        <motion.div
          initial={{ scale: 0.94, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.94, opacity: 0 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="relative max-h-full max-w-[1400px]"
          onClick={(e) => e.stopPropagation()}
        >
          <img
            src={src}
            alt={alt || ''}
            className="max-h-[88vh] w-auto max-w-full rounded-2xl border border-white/10 bg-surface object-contain shadow-2xl"
          />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close image preview"
            className="absolute -top-3 -right-3 grid h-10 w-10 place-items-center rounded-full border border-white/20 bg-white text-ink shadow-lg transition-transform hover:scale-105"
          >
            <X size={16} strokeWidth={2} />
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}