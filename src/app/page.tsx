import { Metadata } from 'next';
import StatsGenerator from '@/components/StatsGenerator';

export const metadata: Metadata = {
  title: 'GitHub Stats Generator',
  description: 'Generate beautiful GitHub stats for your README',
};

export default function Home() {
  return (
    <main className="min-h-screen py-8 md:py-16 relative">
      {/* Background gradient circles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-blue-500/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-purple-500/20 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
            GitHub Stats Generator
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Create beautiful and customizable stats cards for your GitHub README profile.
            Choose from multiple themes and styles to showcase your GitHub activity.
          </p>
        </div>
        <StatsGenerator />

        <footer className="mt-16 text-center text-gray-400 text-sm">
          <p>Powered by <a href="https://github.com/anuraghazra/github-readme-stats" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">github-readme-stats</a></p>
        </footer>
      </div>
    </main>
  );
}
