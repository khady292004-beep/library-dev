export interface BookCategory {
  id: string;
  label: string;
  emoji: string;
  query: string;
}

export const bookCategories: BookCategory[] = [
  { id: 'fantasy', label: 'Fantasy', emoji: '🧙', query: 'fantasy roman français bestseller' },
  { id: 'dystopie', label: 'Dystopie', emoji: '🌆', query: 'dystopie roman fiction français' },
  { id: 'romance', label: 'Romance', emoji: '💕', query: 'romance roman français bestseller' },
  { id: 'science-fiction', label: 'Science-Fiction', emoji: '🚀', query: 'science fiction roman classique français' },
  { id: 'classiques', label: 'Classiques', emoji: '📜', query: 'classique littérature française roman' },
  { id: 'policier', label: 'Policier', emoji: '🔍', query: 'polar thriller policier roman français' },
  { id: 'aventure', label: 'Aventure', emoji: '🗺️', query: 'aventure roman français bestseller' },
  { id: 'philosophie', label: 'Philosophie', emoji: '🤔', query: 'philosophie livre français essai' },
];
