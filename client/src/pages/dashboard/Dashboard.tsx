import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, BookMarked, TrendingUp, Star, Clock } from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardBody, CardHeader } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { useAuth } from '@/hooks/useAuth';
import { BookCoverPlaceholder } from '@/components/features/BookCoverPlaceholder';
import { getActiveBorrows, getDaysLeft, type BorrowedBook } from '@/services/borrowStore';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Dashboard() {
  const { user } = useAuth();
  const [borrows, setBorrows] = useState<BorrowedBook[]>(getActiveBorrows());

  useEffect(() => {
    const update = () => setBorrows(getActiveBorrows());
    window.addEventListener('borrowsUpdated', update);
    return () => window.removeEventListener('borrowsUpdated', update);
  }, []);

  const soonDue = borrows.filter(b => getDaysLeft(b.dueDate) <= 7).length;

  const stats = [
    { icon: BookMarked, label: 'Livres empruntés', value: String(borrows.length), color: 'text-blue-600 dark:text-blue-400', bgColor: 'bg-blue-100 dark:bg-blue-900/20' },
    { icon: Clock, label: 'À rendre bientôt', value: String(soonDue), color: 'text-amber-600 dark:text-amber-400', bgColor: 'bg-amber-100 dark:bg-amber-900/20' },
    { icon: BookOpen, label: 'Livres disponibles', value: '100+', color: 'text-green-600 dark:text-green-400', bgColor: 'bg-green-100 dark:bg-green-900/20' },
    { icon: Star, label: 'Livres favoris', value: '12', color: 'text-purple-600 dark:text-purple-400', bgColor: 'bg-purple-100 dark:bg-purple-900/20' },
  ];

  return (
    <DashboardLayout>
      <motion.div className="space-y-8" variants={containerVariants} initial="hidden" animate="visible">
        <motion.div variants={itemVariants}>
          <h1 className="text-4xl font-bold text-foreground mb-2">Bienvenue{user?.firstName ? `, ${user.firstName}` : ''} sur BiblioTech</h1>
          <p className="text-lg text-muted-foreground">Gérez vos emprunts et découvrez de nouvelles lectures</p>
        </motion.div>

        <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" variants={containerVariants}>
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div key={index} variants={itemVariants}>
                <Card>
                  <CardBody className="space-y-4">
                    <div className={`w-12 h-12 rounded-lg ${stat.bgColor} flex items-center justify-center`}><Icon className={`w-6 h-6 ${stat.color}`} /></div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                      <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                    </div>
                  </CardBody>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader className="border-b"><h2 className="text-2xl font-bold text-foreground">Mes emprunts récents</h2></CardHeader>
            <CardBody>
              {borrows.length > 0 ? (
                <div className="space-y-4">
                  {borrows.slice(0, 5).map((borrow) => {
                    const daysLeft = getDaysLeft(borrow.dueDate);
                    return (
                      <div key={borrow.id} className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted transition-colors">
                        <div className="flex items-center gap-4 flex-1">
                          <div className="w-12 h-16 rounded-md overflow-hidden flex-shrink-0 bg-muted">
                            <BookCoverPlaceholder title={borrow.title} author={borrow.author} id={borrow.id} variant="sm" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-foreground truncate">{borrow.title}</h3>
                            <p className="text-sm text-muted-foreground truncate">{borrow.author}</p>
                          </div>
                        </div>
                        <Badge variant={daysLeft <= 5 ? 'warning' : 'success'} size="sm">
                          {daysLeft > 0 ? `${daysLeft} jours restants` : 'Dépassé'}
                        </Badge>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>Aucun emprunt actif. Visitez le catalogue pour emprunter des livres !</p>
                </div>
              )}
            </CardBody>
          </Card>
        </motion.div>

        <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-6" variants={containerVariants}>
          <motion.div variants={itemVariants}>
            <Card hoverable>
              <CardBody className="text-center py-8">
                <BookOpen className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-bold text-foreground mb-2">Parcourir le catalogue</h3>
                <p className="text-muted-foreground mb-4">Découvrez nos 100+ livres disponibles</p>
                <a href="/catalogue" className="inline-flex items-center justify-center px-6 py-2 bg-primary text-primary-foreground font-semibold rounded-lg hover:shadow-lg transition-all duration-200">Voir le catalogue</a>
              </CardBody>
            </Card>
          </motion.div>
          <motion.div variants={itemVariants}>
            <Card hoverable>
              <CardBody className="text-center py-8">
                <TrendingUp className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-bold text-foreground mb-2">Recommandations</h3>
                <p className="text-muted-foreground mb-4">Livres recommandés basés sur vos préférences</p>
                <a href="/recommandations" className="inline-flex items-center justify-center px-6 py-2 bg-primary text-primary-foreground font-semibold rounded-lg hover:shadow-lg transition-all duration-200">Voir les recommandations</a>
              </CardBody>
            </Card>
          </motion.div>
        </motion.div>
      </motion.div>
    </DashboardLayout>
  );
}
