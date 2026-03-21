import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, BookMarked, BookOpen } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { BookCoverPlaceholder } from './BookCoverPlaceholder';
import type { GoogleBook } from '@/services/googleBooksService';

interface BookCardProps {
  book: GoogleBook;
  isSelected?: boolean;
  onSelect: (book: GoogleBook) => void;
  onBorrow: (book: GoogleBook) => void;
}

export const BookCard: React.FC<BookCardProps> = ({ book, isSelected, onSelect, onBorrow }) => {
  const displayRating = Math.round(book.rating * 10) / 10;
  const fullStars = Math.floor(displayRating);
  const hasHalf = displayRating - fullStars >= 0.5;

  return (
    <motion.div
      layout
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      className={`
        group relative flex-shrink-0 w-[200px] sm:w-[220px] cursor-pointer
        rounded-xl overflow-hidden bg-card border transition-all duration-300
        ${isSelected
          ? 'border-primary shadow-lg shadow-primary/20 ring-2 ring-primary/30'
          : 'border-border hover:border-primary/40 hover:shadow-xl'
        }
      `}
      onClick={() => onSelect(book)}
    >
      {/* Cover Image — ratio fixe 2:3 */}
      <div className="relative w-full aspect-[2/3] overflow-hidden rounded-t-xl bg-muted">
        <BookCoverPlaceholder title={book.title} author={book.authors.join(', ')} id={book.id} />

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Badge Disponibilité */}
        <div className="absolute top-2 right-2">
          <Badge variant={book.available ? 'success' : 'warning'} size="sm">
            {book.available ? 'Disponible' : 'Indisponible'}
          </Badge>
        </div>

        {/* Borrow button overlay */}
        {book.available && (
          <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
            <button
              onClick={(e) => { e.stopPropagation(); onBorrow(book); }}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors text-sm shadow-lg"
            >
              <BookMarked className="w-4 h-4" />
              Emprunter
            </button>
          </div>
        )}
      </div>

      {/* Info Section */}
      <div className="p-3 space-y-1.5">
        <h3 className="font-bold text-foreground text-sm leading-tight line-clamp-2 min-h-[2.5rem]">
          {book.title}
        </h3>
        <p className="text-xs text-muted-foreground truncate">
          {book.authors.join(', ')}
        </p>
        <div className="flex items-center justify-between pt-1">
          <span className="text-xs text-muted-foreground">
            {book.publishedYear > 0 ? book.publishedYear : '—'}
          </span>
          <div className="flex items-center gap-1">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3 h-3 ${
                    i < fullStars
                      ? 'text-amber-500 fill-amber-500'
                      : i === fullStars && hasHalf
                        ? 'text-amber-500 fill-amber-500/50'
                        : 'text-muted-foreground/30'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs font-semibold text-foreground ml-0.5">
              {displayRating.toFixed(1)}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
