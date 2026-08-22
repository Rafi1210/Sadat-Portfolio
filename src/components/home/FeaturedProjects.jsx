import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import SectionHeading from '@/components/common/SectionHeading';
import ProjectCard from '@/components/common/ProjectCard';
import Reveal from '@/components/common/Reveal';
import { staggerContainer } from '@/lib/motion';
import { featuredProjects } from '@/data/projects';

export default function FeaturedProjects() {
  return (
    <section className="py-20 sm:py-28">
      <div className="container-page">
        <div className="flex items-end justify-between gap-6">
          <SectionHeading
            label="selected work"
            title="Projects that taught me something."
            description="A curated set of systems I've designed and built end-to-end."
          />
          <motion.div
            whileHover={{ x: 3 }}
            transition={{ type: 'spring', stiffness: 320, damping: 22 }}
            className="hidden md:block"
          >
            <Link
              to="/projects"
              className="link-underline inline-flex shrink-0 items-center gap-1 text-[0.86rem] text-ink transition-colors hover:text-accent"
            >
              All projects <ArrowUpRight size={14} strokeWidth={1.8} />
            </Link>
          </motion.div>
        </div>

        <motion.div
          variants={staggerContainer(0.12, 0.05)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="mt-12 grid gap-5 sm:gap-6 md:grid-cols-2"
        >
          {featuredProjects.map((p, i) => (
            <ProjectCard key={p.slug} project={p} index={i} variant="featured" />
          ))}
        </motion.div>

        <Reveal className="mt-8 md:hidden">
          <Link
            to="/projects"
            className="link-underline inline-flex items-center gap-1 text-[0.86rem] text-ink"
          >
            All projects <ArrowUpRight size={14} strokeWidth={1.8} />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}