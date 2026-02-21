import ProfileHero from '@/components/profile/ProfileHero';
import EducationTimeline from '@/components/profile/EducationTimeline';
import InterestsGrid from '@/components/profile/InterestsGrid';

export default function Home() {
  return (
    <main className="pt-16 min-h-screen">
      <ProfileHero />
      <EducationTimeline />
      <InterestsGrid />
    </main>
  );
}
