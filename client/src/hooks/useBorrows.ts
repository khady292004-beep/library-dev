import { useState, useCallback } from 'react';
import { Borrow, BorrowHistory } from '@/types';

export const useBorrows = () => {
  const [borrows, setBorrows] = useState<Borrow[]>([]);
  const [history, setHistory] = useState<BorrowHistory[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchBorrows = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Simulation API call
      await new Promise(resolve => setTimeout(resolve, 500));
      setBorrows([]);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erreur lors du chargement';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchHistory = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      setHistory([]);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erreur lors du chargement';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const borrowBook = useCallback(async (bookId: string) => {
    setIsLoading(true);
    setError(null);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      // À remplacer par appel API réel
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erreur lors de l\'emprunt';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const returnBook = useCallback(async (borrowId: string) => {
    setIsLoading(true);
    setError(null);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      // À remplacer par appel API réel
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erreur lors du retour';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    borrows,
    history,
    isLoading,
    error,
    fetchBorrows,
    fetchHistory,
    borrowBook,
    returnBook,
  };
};
