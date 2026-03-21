import { useState, useCallback } from 'react';
import { Book, BookFilter } from '@/types';

export const useBooks = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchBooks = useCallback(async (filter?: BookFilter) => {
    setIsLoading(true);
    setError(null);
    try {
      // Simulation API call
      await new Promise(resolve => setTimeout(resolve, 500));
      // À remplacer par appel API réel
      setBooks([]);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erreur lors du chargement';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const searchBooks = useCallback(async (query: string) => {
    setIsLoading(true);
    setError(null);
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      // À remplacer par appel API réel
      setBooks([]);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erreur de recherche';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    books,
    isLoading,
    error,
    fetchBooks,
    searchBooks,
  };
};
