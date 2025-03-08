'use client';

import { useState } from 'react';

interface CardError {
  [key: string]: string;
}

export default function StatsGenerator() {
  const [username, setUsername] = useState('');
  const [theme, setTheme] = useState('transparent');
  const [copiedUrl, setCopiedUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [cardErrors, setCardErrors] = useState<CardError>({});
  const [selectedCards, setSelectedCards] = useState<string[]>(['stats', 'languages', 'streak']);
  const baseUrl = 'https://github-readme-stats.vercel.app/api';

  const availableCards = [
    {
      id: 'stats',
      title: 'GitHub Stats',
      url: `${baseUrl}?username=${username}&show_icons=true&theme=${theme}&bg_color=transparent&include_all_commits=true&count_private=true&hide_border=true&show_owner=true&rank_icon=github&include_all_commits=true&show=reviews,discussions_started,discussions_answered,prs_merged,prs_merged_percentage&hide=none`,
    },
    {
      id: 'languages',
      title: 'Top Languages',
      url: `${baseUrl}/top-langs/?username=${username}&layout=compact&theme=${theme}&bg_color=transparent&hide_border=true&langs_count=10&size_weight=0.5&count_weight=0.5`,
    },
    {
      id: 'streak',
      title: 'GitHub Streak',
      url: `https://github-readme-streak-stats.herokuapp.com/?user=${username}&theme=${theme}&background=transparent&hide_border=true`,
    },
    {
      id: 'graph',
      title: 'Contribution Graph',
      url: `${baseUrl}/github-readme-activity-graph?username=${username}&theme=${theme}&bg_color=transparent&hide_border=true&area=true`,
    },
    {
      id: 'trophy',
      title: 'GitHub Trophies',
      url: `https://github-profile-trophy.vercel.app/?username=${username}&theme=${theme}&column=6&margin-w=10&margin-h=10&no-bg=true&no-frame=true&rank=SSS,SS,S,AAA,AA,A,B,C`,
    },
    {
      id: 'stats-detailed',
      title: 'Detailed Stats',
      url: `${baseUrl}?username=${username}&show_icons=true&theme=${theme}&bg_color=transparent&include_all_commits=true&count_private=true&hide_border=true&show=reviews,discussions_started,discussions_answered,prs_merged,prs_merged_percentage&custom_title=Detailed%20GitHub%20Statistics`,
    },
  ];

  const handleCopy = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopiedUrl(url);
      setTimeout(() => setCopiedUrl(''), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const validateUsername = (username: string) => {
    // GitHub username validation rules
    const usernameRegex = /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i;
    return usernameRegex.test(username);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username) return;

    if (!validateUsername(username)) {
      setError('Invalid GitHub username format');
      return;
    }

    setLoading(true);
    setError('');
    setCardErrors({});

    try {
      const response = await fetch(`https://api.github.com/users/${username}`);
      if (!response.ok) {
        throw new Error('GitHub user not found');
      }
      
      // Add a small delay to ensure the stats APIs are ready
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Clear any previous errors if the user exists
      setError('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch user data');
    } finally {
      setLoading(false);
    }
  };

  const handleImageError = (cardId: string) => {
    console.error(`Failed to load ${cardId} stats for user ${username}`);
    setCardErrors(prev => ({
      ...prev,
      [cardId]: `Failed to load ${cardId} stats`
    }));
  };

  const toggleCard = (cardId: string) => {
    setSelectedCards(prev => 
      prev.includes(cardId)
        ? prev.filter(id => id !== cardId)
        : [...prev, cardId]
    );
    // Clear error for this card when toggling
    if (cardErrors[cardId]) {
      setCardErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[cardId];
        return newErrors;
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4">
      <form onSubmit={handleSubmit} className="glass-card p-6 mb-8">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <input
                type="text"
                value={username}
                onChange={(e) => {
                  const newUsername = e.target.value.trim();
                  setUsername(newUsername);
                  setError('');
                  setCardErrors({});
                }}
                placeholder="Enter GitHub username"
                className="input-field"
                required
              />
              {username && (
                <a
                  href={`https://github.com/${username}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-400 hover:text-blue-300"
                >
                  View Profile
                </a>
              )}
            </div>
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className="select-field min-w-[160px]"
            >
              <option value="transparent">Transparent</option>
              <option value="dark">Dark</option>
              <option value="radical">Radical</option>
              <option value="merko">Merko</option>
              <option value="tokyonight">Tokyo Night</option>
              <option value="dracula">Dracula</option>
              <option value="gruvbox">Gruvbox</option>
              <option value="monokai">Monokai</option>
              <option value="nord">Nord</option>
              <option value="solarized-light">Solarized Light</option>
              <option value="solarized-dark">Solarized Dark</option>
            </select>
          </div>
          
          <div className="border-t border-gray-700/50 pt-4">
            <p className="text-sm text-gray-400 mb-3">Select stats to display:</p>
            <div className="flex flex-wrap gap-2">
              {availableCards.map(card => (
                <button
                  key={card.id}
                  type="button"
                  onClick={() => toggleCard(card.id)}
                  className={`toggle-button ${
                    selectedCards.includes(card.id)
                      ? 'toggle-button-active'
                      : 'toggle-button-inactive'
                  }`}
                >
                  {card.title}
                </button>
              ))}
            </div>
          </div>
        </div>
        {error && (
          <div className="mt-4 p-3 rounded-lg border border-red-500/20 bg-red-500/10">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}
      </form>

      {loading ? (
        <div className="text-center py-12">
          <div className="loading-spinner mx-auto mb-4"></div>
          <p className="text-gray-400">Loading stats...</p>
        </div>
      ) : username && !error && (
        <div className="space-y-8">
          {availableCards
            .filter(card => selectedCards.includes(card.id))
            .map((card) => (
              <div key={card.title} className="stat-card">
                <h2 className="text-xl font-semibold mb-4">{card.title}</h2>
                <div className="image-container p-4">
                  {cardErrors[card.id] ? (
                    <div className="text-center py-4">
                      <p className="text-red-400 text-sm">{cardErrors[card.id]}</p>
                      <button
                        onClick={() => {
                          const newErrors = { ...cardErrors };
                          delete newErrors[card.id];
                          setCardErrors(newErrors);
                        }}
                        className="mt-2 text-sm text-blue-400 hover:text-blue-300"
                      >
                        Try Again
                      </button>
                    </div>
                  ) : (
                    <img
                      key={`${card.url}-${theme}`} // Add theme to key to force reload on theme change
                      src={card.url}
                      alt={`${card.title} for ${username}`}
                      className="w-full h-auto max-h-[300px] object-contain mx-auto"
                      loading="lazy"
                      onError={() => handleImageError(card.id)}
                    />
                  )}
                </div>
                <div className="mt-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-400">Copy this URL:</p>
                    <button
                      onClick={() => handleCopy(card.url)}
                      className="copy-button"
                    >
                      {copiedUrl === card.url ? 'Copied!' : 'Copy URL'}
                    </button>
                  </div>
                  <code className="code-block">
                    {card.url}
                  </code>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
} 