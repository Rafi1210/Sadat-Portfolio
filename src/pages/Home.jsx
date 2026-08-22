import { Helmet } from 'react-helmet-async';
import Hero from '@/components/home/Hero';
import FeaturedProjects from '@/components/home/FeaturedProjects';
import Intro from '@/components/home/Intro';
import ExperiencePreview from '@/components/home/ExperiencePreview';
import SkillsPreview from '@/components/home/SkillsPreview';
import AchievementsPreview from '@/components/home/AchievementsPreview';
import ResearchPreview from '@/components/home/ResearchPreview';
import ContactCTA from '@/components/home/ContactCTA';
import { siteConfig } from '@/data/siteConfig';

export default function Home() {
  return (
    <>
      <Helmet>
        <title>{siteConfig.metadata.title}</title>
        <meta name="description" content={siteConfig.metadata.description} />
        <meta property="og:title" content={siteConfig.metadata.title} />
        <meta property="og:description" content={siteConfig.metadata.description} />
      </Helmet>
      <Hero />
      <FeaturedProjects />
      <Intro />
      <ExperiencePreview />
      <SkillsPreview />
      <AchievementsPreview />
      <ResearchPreview />
      <ContactCTA />
    </>
  );
}