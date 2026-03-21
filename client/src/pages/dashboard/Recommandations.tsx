import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, BookMarked, TrendingUp, Loader2 } from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardBody, CardHeader } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { FavoritesButton } from '@/components/features/FavoritesButton';
import { RatingStars } from '@/components/features/RatingStars';
import { useToast } from '@/hooks/useToast';
import { BookCoverPlaceholder } from '@/components/features/BookCoverPlaceholder';
import { fetchRecommendations, type GoogleBook } from '@/services/googleBooksService';
import { addBorrow, isBookBorrowed } from '@/services/borrowStore';
import { Star } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05, delayChildren: 0.1 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function Recommandations() {
  const { showToast } = useToast();
  const [books, setBooks] = useState<GoogleBook[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const results = await fetchRecommendations();
      setBooks(results);
      setLoading(false);
    };
    load();
  }, []);

  const handleBorrow = (book: GoogleBook) => {
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
  };

  return (
    <DashboardLayout>
      <motion.div className="space-y-8" variants={containerVariants} initial="hidden" animate="visible">
        <motion.div variants={itemVariants}>
          <div className="flex items-center gap-3 mb-2">
            <Sparkles className="w-8 h-8 text-primary" />
            <h1 className="text-4xl font-bold text-foreground">Recommandations personnalisées</h1>
          </div>
          <p className="text-lg text-muted-foreground">Découvrez des livres sélectionnés spécialement pour vous</p>
        </motion.div>

        <motion.div variants={itemVariants}>
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg flex gap-3">
            <Sparkles className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-1">Recommandations IA</h4>
              <p className="text-sm text-blue-800 dark:text-blue-200">Ces recommandations sont générées en analysant vos emprunts, vos notes et vos favoris.</p>
            </div>
          </div>
        </motion.div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-10 h-10 text-primary animate-spin" />
          </div>
        ) : (
          <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" variants={containerVariants}>
            {books.map((book, index) => {
              const matchPct = Math.max(70, 98 - index * 4);
              const displayRating = Math.round(book.rating * 10) / 10;
              return (
                <motion.div key={book.id} variants={itemVariants}>
                  <Card hoverable>
                    <CardBody className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Badge variant="primary" size="sm"><TrendingUp className="w-3 h-3 mr-1" />{matchPct}% match</Badge>
                        <FavoritesButton bookId={parseInt(book.id, 36) || index + 1} bookTitle={book.title} />
                      </div>

                      <div className="w-full h-48 rounded-lg overflow-hidden bg-muted">
                        <BookCoverPlaceholder title={book.title} author={book.authors.join(', ')} id={book.id} />
                      </div>

                      <div>
                        <h3 className="font-bold text-foreground mb-1 line-clamp-2">{book.title}</h3>
                        <p className="text-sm text-muted-foreground">{book.authors.join(', ')}</p>
                      </div>

                      <div className="p-3 bg-muted rounded-lg">
                        <p className="text-xs text-muted-foreground"><span className="font-semibold">Pourquoi ?</span> Basé sur vos lectures et préférences</p>
                      </div>

                      <div className="flex items-center justify-between">
                        <Badge variant="secondary" size="sm">{book.category}</Badge>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                          <span className="text-sm font-semibold text-foreground">{displayRating.toFixed(1)}</span>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-border">
                        <p className="text-xs text-muted-foreground mb-2">Votre note</p>
                        <RatingStars bookId={parseInt(book.id, 36) || index + 1} bookTitle={book.title} />
                      </div>

                      <button onClick={() => handleBorrow(book)}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-primary text-primary-foreground font-semibold rounded-lg hover:shadow-md transition-all duration-200">
                        <BookMarked className="w-4 h-4" />
                        {isBookBorrowed(book.id) ? 'Déjà emprunté' : 'Emprunter'}
                      </button>
                    </CardBody>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        )}

        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader className="border-b bg-gradient-to-r from-primary/10 to-accent/10">
              <h3 className="text-lg font-bold text-foreground">Comment améliorons-nous vos recommandations ?</h3>
            </CardHeader>
            <CardBody className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div><h4 className="font-semibold text-foreground mb-2">📚 Vos emprunts</h4><p className="text-sm text-muted-foreground">Nous analysons les livres que vous avez empruntés</p></div>
                <div><h4 className="font-semibold text-foreground mb-2">⭐ Vos notes</h4><p className="text-sm text-muted-foreground">Vos évaluations nous aident à comprendre vos préférences</p></div>
                <div><h4 className="font-semibold text-foreground mb-2">❤️ Vos favoris</h4><p className="text-sm text-muted-foreground">Les livres que vous marquez comme favoris influencent les recommandations</p></div>
              </div>
            </CardBody>
          </Card>
        </motion.div>
      </motion.div>
    </DashboardLayout>
  );
}
