import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, BookMarked, Star, ExternalLink, BookOpen, Globe, Loader2 } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { BookCoverPlaceholder } from './BookCoverPlaceholder';
import type { GoogleBook } from '@/services/googleBooksService';

interface BookViewerProps {
  book: GoogleBook | null;
  onClose: () => void;
  onBorrow: (book: GoogleBook) => void;
}

/**
 * Génère l'URL Wikipedia pour un livre donné
 */
function getWikipediaUrl(title: string, author: string): string {
  const searchTerm = encodeURIComponent(`${title} ${author} livre`.replace(/\s+/g, ' '));
  return `https://fr.wikipedia.org/wiki/Special:Search?search=${searchTerm}&fulltext=1`;
}

/**
 * Nettoie le synopsis Google Books des balises HTML dangereuses
 */
function cleanDescription(html: string): string {
  // Limiter la longueur et nettoyer les balisesrisquées
  const div = document.createElement('div');
  div.innerHTML = html;
  const text = div.textContent || div.innerText || '';
  return text.length > 500 ? text.substring(0, 500) + '...' : text;
}

export const BookViewer: React.FC<BookViewerProps> = ({ book, onClose, onBorrow }) => {
  const viewerRef = useRef<HTMLDivElement>(null);
  const [iframeLoading, setIframeLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'synopsis' | 'preview' | 'wikipedia'>('synopsis');

  useEffect(() => {
    if (book) {
      setIframeLoading(false);
      setActiveTab('synopsis');
      viewerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [book]);

  const wikipediaUrl = book ? getWikipediaUrl(book.title, book.authors[0]) : '';

  return (
    <AnimatePresence>
      {book && (
        <motion.div
          ref={viewerRef}
          initial={{ opacity: 0, y: 30, height: 0 }}
          animate={{ opacity: 1, y: 0, height: 'auto' }}
          exit={{ opacity: 0, y: -20, height: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="overflow-hidden"
        >
          <div className="rounded-2xl border border-primary/20 bg-card shadow-2xl shadow-primary/5 overflow-hidden">
            {/* Header Bar */}
            <div className="flex items-center justify-between px-6 py-4 bg-primary/5 border-b border-border">
              <div className="flex items-center gap-3">
                <BookOpen className="w-5 h-5 text-primary" />
                <h3 className="font-bold text-foreground">Détails du livre</h3>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-muted transition-colors"
              >
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>

            <div className="flex flex-col lg:flex-row gap-6 p-6">
              {/* Cover + Actions */}
              <div className="flex-shrink-0 flex flex-col items-center gap-4">
                <div className="w-[180px] h-[270px] rounded-xl overflow-hidden shadow-2xl bg-muted border border-primary/10">
                  <BookCoverPlaceholder title={book.title} author={book.authors.join(', ')} id={book.id} />
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-2 w-full max-w-[180px]">
                  {book.available ? (
                    <button
                      onClick={() => onBorrow(book)}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground font-semibold rounded-lg hover:shadow-lg transition-all duration-200"
                    >
                      <BookMarked className="w-4 h-4" />
                      Emprunter
                    </button>
                  ) : (
                    <button
                      disabled
                      className="w-full px-4 py-2.5 bg-muted text-muted-foreground font-semibold rounded-lg cursor-not-allowed opacity-60"
                    >
                      Indisponible
                    </button>
                  )}

                  {book.previewLink && (
                    <a
                      href={book.previewLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-border text-foreground font-medium rounded-lg hover:bg-muted transition-colors text-sm"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Aperçu Google
                    </a>
                  )}
                </div>
              </div>

              {/* Details */}
              <div className="flex-1 space-y-4 min-w-0">
                {/* Title */}
                <div>
                  <h2 className="text-2xl font-bold text-foreground leading-tight mb-1">
                    {book.title}
                  </h2>
                  <p className="text-base text-muted-foreground">
                    par <span className="font-medium text-foreground">{book.authors.join(', ')}</span>
                  </p>
                </div>

                {/* Meta Info */}
                <div className="flex flex-wrap items-center gap-3">
                  <Badge variant={book.available ? 'success' : 'warning'} size="sm">
                    {book.available ? 'Disponible' : 'Indisponible'}
                  </Badge>
                  <Badge variant="secondary" size="sm">
                    {book.category}
                  </Badge>
                  {book.publishedYear > 0 && (
                    <span className="text-sm text-muted-foreground">
                      {book.publishedYear}
                    </span>
                  )}
                  {book.pageCount > 0 && (
                    <span className="text-sm text-muted-foreground">
                      {book.pageCount} pages
                    </span>
                  )}
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(book.rating)
                            ? 'text-amber-500 fill-amber-500'
                            : 'text-muted-foreground/30'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="font-semibold text-foreground">
                    {(Math.round(book.rating * 10) / 10).toFixed(1)}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    ({book.ratingsCount} avis)
                  </span>
                </div>

                {/* Tabs for Synopsis and Wikipedia */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <button
                      onClick={() => setActiveTab('synopsis')}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-lg font-medium text-sm transition-all duration-200 ${
                        activeTab === 'synopsis'
                          ? 'bg-primary text-primary-foreground shadow-md shadow-primary/20'
                          : 'bg-muted text-muted-foreground hover:bg-muted/80'
                      }`}
                    >
                      <BookOpen className="w-4 h-4" />
                      Synopsis
                    </button>
                    {book.previewLink && (
                      <button
                        onClick={() => {
                          setActiveTab('preview');
                        }}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg font-medium text-sm transition-all duration-200 ${
                          activeTab === 'preview'
                            ? 'bg-primary text-primary-foreground shadow-md shadow-primary/20'
                            : 'bg-muted text-muted-foreground hover:bg-muted/80'
                        }`}
                      >
                        <ExternalLink className="w-4 h-4" />
                        Aperçu
                      </button>
                    )}
                    <button
                      onClick={() => {
                        setActiveTab('wikipedia');
                        setIframeLoading(true);
                      }}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-lg font-medium text-sm transition-all duration-200 ${
                        activeTab === 'wikipedia'
                          ? 'bg-primary text-primary-foreground shadow-md shadow-primary/20'
                          : 'bg-muted text-muted-foreground hover:bg-muted/80'
                      }`}
                    >
                      <Globe className="w-4 h-4" />
                      Wikipedia
                    </button>
                  </div>

                  {/* Content based on active tab */}
                  <div className="relative min-h-[150px]">
                    {activeTab === 'synopsis' && (
                      <div className="text-sm text-muted-foreground leading-relaxed max-h-[250px] overflow-y-auto pr-2 animate-in fade-in slide-in-from-bottom-2 duration-300">
                        {book.description ? cleanDescription(book.description) : 'Aucune description disponible pour ce livre.'}
                      </div>
                    )}

                    {activeTab === 'preview' && book.previewLink && (
                      <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                        <div className="p-6 rounded-xl border-2 border-dashed border-primary/20 bg-primary/5 text-center space-y-4">
                          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                            <BookOpen className="w-8 h-8 text-primary" />
                          </div>
                          <div className="space-y-2">
                            <h4 className="font-bold text-foreground text-lg">Aperçu interactif disponible</h4>
                            <p className="text-sm text-muted-foreground max-w-md mx-auto">
                              Pour des raisons de sécurité, Google Books ne permet pas l'affichage direct de l'aperçu à l'intérieur de l'application.
                            </p>
                          </div>
                          <a
                            href={book.previewLink.replace('http://', 'https://')}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-bold rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-200"
                          >
                            <ExternalLink className="w-5 h-5" />
                            Ouvrir l'aperçu Google Books
                          </a>
                          <p className="text-[10px] text-muted-foreground italic">
                            S'ouvrira dans un nouvel onglet sécurisé
                          </p>
                        </div>
                      </div>
                    )}

                    {activeTab === 'wikipedia' && (
                      <div className="rounded-xl overflow-hidden border border-border bg-muted/30 animate-in fade-in slide-in-from-bottom-2 duration-300">
                        {iframeLoading && (
                          <div className="absolute inset-0 flex items-center justify-center bg-background/80 z-10">
                            <Loader2 className="w-8 h-8 text-primary animate-spin" />
                          </div>
                        )}
                        <iframe
                          src={wikipediaUrl}
                          title={`Wikipedia - ${book.title}`}
                          className="w-full h-[350px] lg:h-[400px]"
                          sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                          onLoad={() => setIframeLoading(false)}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
