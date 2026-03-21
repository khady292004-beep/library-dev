export interface CatalogueBook {
  id: number;
  title: string;
  author: string;
  category: string;
  rating: number;
  reviews: number;
  available: boolean;
  cover: string;
  description?: string;
}

export interface AIMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  books?: CatalogueBook[];
  timestamp: Date;
}

// Catalogue complet de la bibliothèque
const catalogue: CatalogueBook[] = [
  {
    id: 1,
    title: 'Le Seigneur des Anneaux',
    author: 'J.R.R. Tolkien',
    category: 'Fiction',
    rating: 4.8,
    reviews: 2543,
    available: true,
    cover: '📚',
    description: 'Une épopée fantastique légendaire dans un monde imaginaire.',
  },
  {
    id: 2,
    title: 'Dune',
    author: 'Frank Herbert',
    category: 'Science',
    rating: 4.7,
    reviews: 1876,
    available: true,
    cover: '📖',
    description: 'Un chef-d\'œuvre de science-fiction sur une planète désertique.',
  },
  {
    id: 3,
    title: '1984',
    author: 'George Orwell',
    category: 'Fiction',
    rating: 4.6,
    reviews: 3421,
    available: false,
    cover: '📕',
    description: 'Un roman dystopique sur la surveillance et le totalitarisme.',
  },
  {
    id: 4,
    title: 'Sapiens',
    author: 'Yuval Noah Harari',
    category: 'Non-fiction',
    rating: 4.5,
    reviews: 2198,
    available: true,
    cover: '📗',
    description: 'Une brève histoire de l\'humanité, de la préhistoire à nos jours.',
  },
  {
    id: 5,
    title: 'Le Hobbit',
    author: 'J.R.R. Tolkien',
    category: 'Fiction',
    rating: 4.7,
    reviews: 1654,
    available: true,
    cover: '📘',
    description: 'L\'aventure de Bilbon Sacquet dans un monde fantastique.',
  },
  {
    id: 6,
    title: 'Fondation',
    author: 'Isaac Asimov',
    category: 'Science',
    rating: 4.6,
    reviews: 1432,
    available: true,
    cover: '📙',
    description: 'Un cycle de science-fiction sur la chute et la renaissance d\'un empire galactique.',
  },
  {
    id: 7,
    title: 'Clean Code',
    author: 'Robert C. Martin',
    category: 'Technologie',
    rating: 4.7,
    reviews: 1890,
    available: true,
    cover: '💻',
    description: 'Guide pratique pour écrire du code propre et maintenable.',
  },
  {
    id: 8,
    title: 'JavaScript: The Good Parts',
    author: 'Douglas Crockford',
    category: 'Technologie',
    rating: 4.3,
    reviews: 1245,
    available: true,
    cover: '💻',
    description: 'Les meilleures pratiques du langage JavaScript.',
  },
  {
    id: 9,
    title: 'Learning React',
    author: 'Alex Banks & Eve Porcello',
    category: 'Technologie',
    rating: 4.5,
    reviews: 987,
    available: true,
    cover: '💻',
    description: 'Guide complet pour apprendre React et le développement moderne.',
  },
  {
    id: 10,
    title: 'Le Petit Prince',
    author: 'Antoine de Saint-Exupéry',
    category: 'Fiction',
    rating: 4.9,
    reviews: 5432,
    available: true,
    cover: '📖',
    description: 'Un conte poétique et philosophique, court et intemporel.',
  },
  {
    id: 11,
    title: 'L\'Étranger',
    author: 'Albert Camus',
    category: 'Fiction',
    rating: 4.4,
    reviews: 2876,
    available: true,
    cover: '📕',
    description: 'Un roman court et existentialiste sur l\'absurdité de la vie.',
  },
  {
    id: 12,
    title: 'Cybersécurité : Le guide essentiel',
    author: 'Charles Brooks',
    category: 'Technologie',
    rating: 4.2,
    reviews: 654,
    available: true,
    cover: '🔒',
    description: 'Introduction complète à la cybersécurité et la protection des systèmes.',
  },
  {
    id: 13,
    title: 'Hacking : The Art of Exploitation',
    author: 'Jon Erickson',
    category: 'Technologie',
    rating: 4.6,
    reviews: 1123,
    available: true,
    cover: '🔒',
    description: 'Comprendre les techniques de hacking et la sécurité informatique.',
  },
  {
    id: 14,
    title: 'Une brève histoire du temps',
    author: 'Stephen Hawking',
    category: 'Science',
    rating: 4.5,
    reviews: 3210,
    available: true,
    cover: '🔬',
    description: 'Exploration accessible de l\'univers, du Big Bang aux trous noirs.',
  },
  {
    id: 15,
    title: 'Les Misérables',
    author: 'Victor Hugo',
    category: 'Fiction',
    rating: 4.7,
    reviews: 4567,
    available: false,
    cover: '📚',
    description: 'Un roman fleuve sur la justice sociale dans la France du XIXe siècle.',
  },
  {
    id: 16,
    title: 'Design Patterns',
    author: 'Gang of Four',
    category: 'Technologie',
    rating: 4.4,
    reviews: 1567,
    available: true,
    cover: '💻',
    description: 'Les patrons de conception fondamentaux en programmation orientée objet.',
  },
  {
    id: 17,
    title: 'Fahrenheit 451',
    author: 'Ray Bradbury',
    category: 'Fiction',
    rating: 4.5,
    reviews: 2345,
    available: true,
    cover: '📕',
    description: 'Un roman dystopique court sur la censure et la destruction des livres.',
  },
  {
    id: 18,
    title: 'Steve Jobs',
    author: 'Walter Isaacson',
    category: 'Biographie',
    rating: 4.6,
    reviews: 1987,
    available: true,
    cover: '👤',
    description: 'La biographie autorisée du cofondateur visionnaire d\'Apple.',
  },
  {
    id: 19,
    title: 'Python Crash Course',
    author: 'Eric Matthes',
    category: 'Technologie',
    rating: 4.5,
    reviews: 1456,
    available: true,
    cover: '💻',
    description: 'Introduction pratique à la programmation Python pour débutants.',
  },
  {
    id: 20,
    title: 'Homo Deus',
    author: 'Yuval Noah Harari',
    category: 'Non-fiction',
    rating: 4.4,
    reviews: 1876,
    available: true,
    cover: '📗',
    description: 'Une réflexion sur le futur de l\'humanité et les technologies émergentes.',
  },
];

// Mots-clés associés aux sujets pour la recherche intelligente
const topicKeywords: Record<string, string[]> = {
  react: ['react', 'javascript', 'frontend', 'web', 'développement web', 'composant'],
  javascript: ['javascript', 'js', 'web', 'frontend', 'programmation web'],
  python: ['python', 'programmation', 'script', 'data', 'machine learning'],
  cybersécurité: ['cybersécurité', 'sécurité', 'hacking', 'hack', 'piratage', 'réseau', 'protection', 'cyber'],
  programmation: ['programmation', 'coder', 'développement', 'code', 'dev', 'logiciel', 'software'],
  'science-fiction': ['science-fiction', 'sf', 'futur', 'espace', 'dystopie', 'dystopique'],
  fiction: ['fiction', 'roman', 'histoire', 'récit', 'littérature', 'conte'],
  science: ['science', 'univers', 'physique', 'biologie', 'cosmos', 'scientifique'],
  philosophie: ['philosophie', 'existentialisme', 'pensée', 'réflexion', 'sens de la vie'],
  histoire: ['histoire', 'humanité', 'civilisation', 'passé', 'historique'],
  biographie: ['biographie', 'vie de', 'parcours', 'portrait'],
  court: ['court', 'petit', 'bref', 'rapide', 'vite lire', 'peu de pages'],
  technologie: ['technologie', 'tech', 'informatique', 'numérique', 'digital'],
  design: ['design', 'pattern', 'conception', 'architecture', 'uml'],
};

function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}

function findRelevantBooks(query: string): CatalogueBook[] {
  const q = query.toLowerCase();
  const matchedBooks: { book: CatalogueBook; score: number }[] = [];

  catalogue.forEach(book => {
    let score = 0;

    // Recherche directe dans le titre
    if (book.title.toLowerCase().includes(q)) score += 10;

    // Recherche directe dans l'auteur
    if (book.author.toLowerCase().includes(q)) score += 8;

    // Recherche dans la catégorie
    if (book.category.toLowerCase().includes(q)) score += 6;

    // Recherche dans la description
    if (book.description && book.description.toLowerCase().includes(q)) score += 4;

    // Recherche par mots-clés thématiques
    for (const [topic, keywords] of Object.entries(topicKeywords)) {
      const topicMatch = keywords.some(kw => q.includes(kw));
      if (topicMatch) {
        // Vérifier si le livre correspond au topic
        const bookText = `${book.title} ${book.author} ${book.category} ${book.description || ''}`.toLowerCase();
        if (bookText.includes(topic) || keywords.some(kw => bookText.includes(kw))) {
          score += 5;
        }
      }
    }

    // Gestion spéciale "roman court"
    if ((q.includes('court') || q.includes('petit') || q.includes('bref')) &&
        book.description?.toLowerCase().includes('court')) {
      score += 7;
    }

    // Bonus pour les livres bien notés
    if (score > 0) {
      score += book.rating * 0.5;
    }

    if (score > 0) {
      matchedBooks.push({ book, score });
    }
  });

  // Trier par score et limiter à 5 résultats
  return matchedBooks
    .sort((a, b) => b.score - a.score)
    .slice(0, 5)
    .map(m => m.book);
}

function generateResponse(query: string, books: CatalogueBook[]): string {
  const q = query.toLowerCase();

  if (books.length === 0) {
    // Suggestions génériques si pas de résultat
    if (q.includes('bonjour') || q.includes('salut') || q.includes('hello')) {
      return 'Bonjour ! 👋 Je suis **BibliAI**, votre assistant intelligent de la bibliothèque BiblioTech. Je peux vous aider à :\n\n- 📚 Trouver des livres sur un sujet\n- 💡 Obtenir des recommandations personnalisées\n- 🔍 Chercher par auteur ou catégorie\n\nQue puis-je faire pour vous ?';
    }
    if (q.includes('aide') || q.includes('help') || q.includes('quoi') || q.includes('comment')) {
      return 'Je suis **BibliAI**, votre assistant ! Voici ce que je peux faire :\n\n- **Recommandations** : "Quel livre pour apprendre React ?"\n- **Recherche par sujet** : "Quels livres sur la cybersécurité ?"\n- **Suggestions** : "Je veux un roman court"\n- **Par catégorie** : "Montre-moi des livres de science-fiction"\n\nN\'hésitez pas à me poser une question ! 😊';
    }
    return 'Je n\'ai pas trouvé de livres correspondant à votre recherche dans notre catalogue. Essayez avec d\'autres mots-clés !\n\n💡 **Exemples** :\n- "Quel livre pour apprendre React ?"\n- "Quels livres sur la cybersécurité ?"\n- "Je veux un roman court"';
  }

  // Construire une réponse contextuelle
  let response = '';

  if (q.includes('react')) {
    response = `Voici mes recommandations pour **apprendre React** 🚀 :\n\n`;
  } else if (q.includes('cybersécurité') || q.includes('sécurité') || q.includes('hacking')) {
    response = `Voici les meilleurs livres sur la **cybersécurité** 🔒 :\n\n`;
  } else if (q.includes('court') || q.includes('petit') || q.includes('bref')) {
    response = `Voici des **romans courts** parfaits pour une lecture rapide 📖 :\n\n`;
  } else if (q.includes('science-fiction') || q.includes('sf')) {
    response = `Voici nos meilleurs livres de **science-fiction** 🚀 :\n\n`;
  } else if (q.includes('python')) {
    response = `Voici mes recommandations pour **apprendre Python** 🐍 :\n\n`;
  } else if (q.includes('programmation') || q.includes('code') || q.includes('dev')) {
    response = `Voici les livres pour les **développeurs** 💻 :\n\n`;
  } else {
    response = `J'ai trouvé **${books.length} livre${books.length > 1 ? 's' : ''}** qui pourraient vous intéresser 📚 :\n\n`;
  }

  books.forEach((book, i) => {
    const availability = book.available ? '✅ Disponible' : '❌ Indisponible';
    response += `**${i + 1}. ${book.title}** — *${book.author}*\n`;
    response += `   ⭐ ${book.rating}/5 · ${availability}\n`;
    if (book.description) {
      response += `   ${book.description}\n`;
    }
    response += '\n';
  });

  response += `\nSouhaitez-vous plus de détails sur l'un de ces livres ? 😊`;

  return response;
}

export async function getAIResponse(query: string): Promise<AIMessage> {
  // Simuler un délai réseau (comme un appel API)
  await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 700));

  const books = findRelevantBooks(query);
  const content = generateResponse(query, books);

  return {
    id: generateId(),
    role: 'assistant',
    content,
    books: books.length > 0 ? books : undefined,
    timestamp: new Date(),
  };
}

export function createUserMessage(content: string): AIMessage {
  return {
    id: generateId(),
    role: 'user',
    content,
    timestamp: new Date(),
  };
}

export { catalogue };
