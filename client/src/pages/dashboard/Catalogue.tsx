import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Search, SlidersHorizontal, Loader2, BookOpen } from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { BookCard } from '@/components/features/BookCard';
import { BookViewer } from '@/components/features/BookViewer';
import { CategoryRow } from '@/components/features/CategoryRow';
import { useDebounce } from '@/hooks/useDebounce';
import { useToast } from '@/hooks/useToast';
import { bookCategories } from '@/data/booksData';
import { fetchBooksByQuery, searchGoogleBooks, type GoogleBook } from '@/services/googleBooksService';
import { addBorrow, isBookBorrowed } from '@/services/borrowStore';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function Catalogue() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedBook, setSelectedBook] = useState<GoogleBook | null>(null);
  const [booksByCategory, setBooksByCategory] = useState<Record<string, GoogleBook[]>>({});
  const [searchResults, setSearchResults] = useState<GoogleBook[]>([]);
  const [loadingCategories, setLoadingCategories] = useState<Record<string, boolean>>({});
  const [isSearching, setIsSearching] = useState(false);
  const { showToast } = useToast();
  const debouncedSearch = useDebounce(searchQuery, 400);

  useEffect(() => {
    let cancelled = false;
    const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
    
    async function loadCategories() {
      // Charger les catégories séquentiellement avec délai pour éviter le rate-limiting Google Books API (429)
      for (const cat of bookCategories) {
        if (cancelled) break;
        setLoadingCategories(prev => ({ ...prev, [cat.id]: true }));
        try {
          const books = await fetchBooksByQuery(cat.query, cat.label, 8);
          if (!cancelled) {
            setBooksByCategory(prev => ({ ...prev, [cat.id]: books }));
          }
        } catch { /* ignore */ }
        finally {
          if (!cancelled) {
            setLoadingCategories(prev => ({ ...prev, [cat.id]: false }));
          }
        }
        // Délai entre chaque requête pour éviter le 429
        await delay(350);
      }
    }
    
    loadCategories();
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    if (!debouncedSearch.trim()) { setSearchResults([]); setIsSearching(false); return; }
    const doSearch = async () => {
      setIsSearching(true);
      try { setSearchResults(await searchGoogleBooks(debouncedSearch, 18)); }
      catch { showToast('Erreur lors de la recherche', 'error'); }
      finally { setIsSearching(false); }
    };
    doSearch();
  }, [debouncedSearch, showToast]);

  const handleSelectBook = useCallback((book: GoogleBook) => {
    setSelectedBook(prev => prev?.id === book.id ? null : book);
  }, []);

  const handleBorrow = useCallback((book: GoogleBook) => {
    if (isBookBorrowed(book.id)) {
      showToast(`"${book.title}" est déjà emprunté`, 'warning');
      return;
    }
    try {
      addBorrow({ id: book.id, title: book.title, author: book.authors.join(', '), cover: book.cover, category: book.category });
      showToast(`Vous avez emprunté "${book.title}" avec succès ! 📚`, 'success');
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Erreur', 'error');
    }
  }, [showToast]);

  const isSearchActive = debouncedSearch.trim().length > 0;
  const filteredCategories = selectedCategory ? bookCategories.filter(c => c.id === selectedCategory) : bookCategories;
  const totalBooks = Object.values(booksByCategory).reduce((s, b) => s + b.length, 0);

  return (
    <DashboardLayout>
      <motion.div className="space-y-8" variants={containerVariants} initial="hidden" animate="visible">
        <motion.div variants={itemVariants}>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-primary/10 rounded-lg"><BookOpen className="w-6 h-6 text-primary" /></div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-foreground">Catalogue</h1>
              <p className="text-sm text-muted-foreground mt-1">{totalBooks > 0 ? `${totalBooks} livres disponibles` : 'Chargement du catalogue...'}</p>
            </div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input type="text" placeholder="Rechercher un livre par titre, auteur..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-12 py-3.5 rounded-xl border border-border bg-card hover:border-primary/30 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200 text-foreground placeholder:text-muted-foreground" />
            {isSearching && <Loader2 className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-primary animate-spin" />}
          </div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <div className="flex items-center gap-2 mb-3">
            <SlidersHorizontal className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-semibold text-muted-foreground">Catégories</span>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hidden">
            <button onClick={() => setSelectedCategory(null)} className={`flex-shrink-0 px-4 py-2 rounded-full font-medium transition-all duration-200 text-sm ${selectedCategory === null ? 'bg-primary text-primary-foreground shadow-md shadow-primary/20' : 'bg-muted text-foreground hover:bg-muted/80'}`}>🌐 Toutes</button>
            {bookCategories.map((cat) => (
              <button key={cat.id} onClick={() => setSelectedCategory(selectedCategory === cat.id ? null : cat.id)}
                className={`flex-shrink-0 px-4 py-2 rounded-full font-medium transition-all duration-200 text-sm whitespace-nowrap ${selectedCategory === cat.id ? 'bg-primary text-primary-foreground shadow-md shadow-primary/20' : 'bg-muted text-foreground hover:bg-muted/80'}`}>
                {cat.emoji} {cat.label}
              </button>
            ))}
          </div>
        </motion.div>

        <BookViewer book={selectedBook} onClose={() => setSelectedBook(null)} onBorrow={handleBorrow} />

        {isSearchActive && (
          <motion.div variants={itemVariants} className="space-y-4">
            <h2 className="text-lg font-bold text-foreground">Résultats pour "{debouncedSearch}" ({searchResults.length})</h2>
            {isSearching ? (
              <div className="flex items-center justify-center py-12"><Loader2 className="w-8 h-8 text-primary animate-spin" /></div>
            ) : searchResults.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {searchResults.map((book) => <BookCard key={book.id} book={book} isSelected={selectedBook?.id === book.id} onSelect={handleSelectBook} onBorrow={handleBorrow} />)}
              </div>
            ) : <p className="text-center py-12 text-muted-foreground">Aucun résultat trouvé</p>}
          </motion.div>
        )}

        {!isSearchActive && (
          <motion.div variants={containerVariants} className="space-y-10">
            {filteredCategories.map((cat) => (
              <CategoryRow key={cat.id} title={cat.label} emoji={cat.emoji} books={booksByCategory[cat.id] || []}
                selectedBook={selectedBook} onSelectBook={handleSelectBook} onBorrowBook={handleBorrow} isLoading={loadingCategories[cat.id]} />
            ))}
          </motion.div>
        )}
      </motion.div>
    </DashboardLayout>
  );
}
