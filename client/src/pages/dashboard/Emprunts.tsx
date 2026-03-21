import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, AlertCircle, RotateCw, X } from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardBody, CardHeader } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { useToast } from '@/hooks/useToast';
import { BookCoverPlaceholder } from '@/components/features/BookCoverPlaceholder';
import { getActiveBorrows, renewBorrow, returnBorrow, getDaysLeft, type BorrowedBook } from '@/services/borrowStore';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Emprunts() {
  const [borrows, setBorrows] = useState<BorrowedBook[]>(getActiveBorrows());
  const { showToast } = useToast();

  useEffect(() => {
    const update = () => setBorrows(getActiveBorrows());
    window.addEventListener('borrowsUpdated', update);
    return () => window.removeEventListener('borrowsUpdated', update);
  }, []);

  const handleRenew = (id: string) => {
    const result = renewBorrow(id);
    if (result) {
      setBorrows(getActiveBorrows());
      showToast('Livre renouvelé avec succès', 'success');
    } else {
      showToast('Nombre maximum de renouvellements atteint', 'error');
    }
  };

  const handleReturn = (id: string) => {
    const borrow = borrows.find(b => b.id === id);
    if (!borrow) return;
    returnBorrow(id);
    setBorrows(getActiveBorrows());
    showToast(`"${borrow.title}" a été retourné`, 'success');
  };

  const getStatusVariant = (daysLeft: number) => {
    if (daysLeft <= 3) return 'danger';
    if (daysLeft <= 7) return 'warning';
    return 'success';
  };

  const getStatusLabel = (daysLeft: number) => {
    if (daysLeft <= 0) return 'Dépassé';
    if (daysLeft <= 3) return 'Urgent';
    if (daysLeft <= 7) return 'Bientôt';
    return 'Normal';
  };

  return (
    <DashboardLayout>
      <motion.div className="space-y-8" variants={containerVariants} initial="hidden" animate="visible">
        <motion.div variants={itemVariants}>
          <h1 className="text-4xl font-bold text-foreground mb-2">Mes emprunts</h1>
          <p className="text-lg text-muted-foreground">Vous avez actuellement {borrows.length} livre{borrows.length !== 1 ? 's' : ''} emprunté{borrows.length !== 1 ? 's' : ''}</p>
        </motion.div>

        <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-6" variants={containerVariants}>
          <motion.div variants={itemVariants}>
            <Card><CardBody className="text-center"><p className="text-sm text-muted-foreground mb-2">Livres empruntés</p><p className="text-4xl font-bold text-primary">{borrows.length}</p></CardBody></Card>
          </motion.div>
          <motion.div variants={itemVariants}>
            <Card><CardBody className="text-center"><p className="text-sm text-muted-foreground mb-2">À rendre bientôt</p><p className="text-4xl font-bold text-amber-600">{borrows.filter(b => getDaysLeft(b.dueDate) <= 7).length}</p></CardBody></Card>
          </motion.div>
          <motion.div variants={itemVariants}>
            <Card><CardBody className="text-center"><p className="text-sm text-muted-foreground mb-2">Renouvellements restants</p><p className="text-4xl font-bold text-green-600">{borrows.reduce((s, b) => s + (b.maxRenews - b.renewCount), 0)}</p></CardBody></Card>
          </motion.div>
        </motion.div>

        {borrows.length > 0 ? (
          <motion.div className="space-y-4" variants={containerVariants}>
            {borrows.map((borrow) => {
              const daysLeft = getDaysLeft(borrow.dueDate);
              const elapsed = Math.max(0, 30 - daysLeft);
              const pct = Math.min(100, Math.round((elapsed / 30) * 100));
              return (
                <motion.div key={borrow.id} variants={itemVariants}>
                  <Card>
                    <CardBody className="space-y-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-4 flex-1">
                          <div className="w-16 h-24 rounded-lg overflow-hidden flex-shrink-0 bg-muted">
                            <BookCoverPlaceholder title={borrow.title} author={borrow.author} id={borrow.id} variant="sm" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-bold text-lg text-foreground mb-1 truncate">{borrow.title}</h3>
                            <p className="text-sm text-muted-foreground mb-3">{borrow.author}</p>
                            <div className="grid grid-cols-2 gap-4 mb-3">
                              <div><p className="text-xs text-muted-foreground">Emprunté le</p><p className="text-sm font-semibold text-foreground">{new Date(borrow.borrowDate).toLocaleDateString('fr-FR')}</p></div>
                              <div><p className="text-xs text-muted-foreground">À rendre le</p><p className="text-sm font-semibold text-foreground">{new Date(borrow.dueDate).toLocaleDateString('fr-FR')}</p></div>
                            </div>
                            <div className="flex items-center gap-3">
                              <Badge variant={getStatusVariant(daysLeft) as any} size="sm">{getStatusLabel(daysLeft)} - {daysLeft > 0 ? `${daysLeft} jours` : 'Dépassé'}</Badge>
                              <span className="text-xs text-muted-foreground">Renouvellements : {borrow.renewCount}/{borrow.maxRenews}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col gap-2">
                          <button onClick={() => handleRenew(borrow.id)} disabled={borrow.renewCount >= borrow.maxRenews}
                            className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-semibold rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/30 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed">
                            <RotateCw className="w-4 h-4" /> Renouveler
                          </button>
                          <button onClick={() => handleReturn(borrow.id)}
                            className="flex items-center justify-center gap-2 px-4 py-2 bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 font-semibold rounded-lg hover:bg-red-200 dark:hover:bg-red-900/30 transition-all duration-200">
                            <X className="w-4 h-4" /> Retourner
                          </button>
                        </div>
                      </div>
                      <div className="pt-4 border-t border-border">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs text-muted-foreground">Durée de l'emprunt</span>
                          <span className="text-xs text-muted-foreground">{pct}%</span>
                        </div>
                        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                          <div className={`h-full transition-all duration-300 ${daysLeft <= 3 ? 'bg-red-500' : daysLeft <= 7 ? 'bg-amber-500' : 'bg-green-500'}`} style={{ width: `${pct}%` }} />
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        ) : (
          <motion.div variants={itemVariants}>
            <Card><CardBody className="text-center py-12">
              <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-semibold text-foreground mb-2">Aucun emprunt actif</h3>
              <p className="text-muted-foreground mb-6">Vous n'avez actuellement aucun livre emprunté</p>
              <a href="/catalogue" className="inline-flex items-center justify-center px-6 py-2 bg-primary text-primary-foreground font-semibold rounded-lg hover:shadow-lg transition-all duration-200">Parcourir le catalogue</a>
            </CardBody></Card>
          </motion.div>
        )}

        {borrows.some(b => getDaysLeft(b.dueDate) <= 3) && (
          <motion.div variants={itemVariants}>
            <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-red-900 dark:text-red-100 mb-1">Livres à rendre bientôt</h4>
                <p className="text-sm text-red-800 dark:text-red-200">Vous avez {borrows.filter(b => getDaysLeft(b.dueDate) <= 3).length} livre(s) à retourner dans les 3 prochains jours.</p>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </DashboardLayout>
  );
}
