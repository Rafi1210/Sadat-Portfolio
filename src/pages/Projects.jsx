import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import SectionHeading from '@/components/common/SectionHeading';
import ProjectCard from '@/components/common/ProjectCard';
import { projects } from '@/data/projects';
import { siteConfig } from '@/data/siteConfig';
import { staggerContainer } from '@/lib/motion';

export default function Projects() {
  return (
    <>
      <Helmet>
        <title>Projects / {siteConfig.name}</title>
        <meta
          name="description"
          content="Every project I've built end-to-end: case studies, architecture, and what I learned."
        />
      </Helmet>
      <section className="pt-32 pb-16 sm:pt-40 sm:pb-20">
        <div className="container-page">
          <SectionHeading
            label="all projects"
            title="Every system I've built end-to-end."
            description="Each project links to a case study with architecture, decisions, and lessons."
          />
        </div>
      </section>

      <section className="pb-32">
        <div className="container-page">
          <motion.div
            variants={staggerContainer(0.06)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.05 }}
            className="grid gap-5 md:grid-cols-2"
          >
            {projects.map((p, i) => (
              <ProjectCard key={p.slug} project={p} index={i} variant="featured" />
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}