import ProfileHero from '@/components/profile/ProfileHero';
import EducationTimeline from '@/components/profile/EducationTimeline';
import FeaturedWork from '@/components/profile/FeaturedWork';
import CommunityLeadership from '@/components/profile/CommunityLeadership';
import InterestsGrid from '@/components/profile/InterestsGrid';

export default function Home() {
  return (
    <main className="pt-16 min-h-screen">
      <ProfileHero />
      <EducationTimeline />
      <FeaturedWork />
      <CommunityLeadership />
      <InterestsGrid />
    </main>
  );
}
