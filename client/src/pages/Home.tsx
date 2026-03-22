import React, { useState } from 'react';
import bannerImage from '@/image.png';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { BookOpen, Users, BookMarked, TrendingUp, ArrowRight, Star, Sparkles } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Card, CardBody } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { BookCoverPlaceholder } from '@/components/features/BookCoverPlaceholder';
import { useDarkMode } from '@/hooks/useDarkMode';
import { MOCK_BOOKS } from '@/data/mockBooks';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

export default function Home() {
  const { isDark, toggleDarkMode } = useDarkMode();
  const [isAuthenticated] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Navbar isDark={isDark} onThemeToggle={toggleDarkMode} isAuthenticated={isAuthenticated} />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-32 sm:pt-32 sm:pb-48 bg-black">
        {/* Background Image */}
        <motion.div 
          className="absolute inset-0 scale-110"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1.05 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${bannerImage})`,
            }}
          />
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/80" />
        </motion.div>
        
        {/* Background gradient accents */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        </div>

        <div className="container">
          <motion.div
            className="max-w-3xl mx-auto text-center relative z-10"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Badge */}
            <motion.div variants={itemVariants} className="mb-6 flex justify-center">
              <Badge variant="secondary" size="md">
                <Star className="w-4 h-4 mr-2" />
                Nouvelle génération de gestion de bibliothèque
              </Badge>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              variants={itemVariants}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
            >
              Découvrez votre prochaine{' '}
              <span className="text-primary">lecture préférée</span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              variants={itemVariants}
              className="text-lg sm:text-xl text-gray-300 mb-8 leading-relaxed"
            >
              BiblioTech est la plateforme moderne pour gérer votre bibliothèque,
              emprunter des livres et découvrir de nouvelles lectures.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link href="/register">
                <a className="px-8 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:shadow-lg transition-all duration-200 hover:scale-105 inline-flex items-center justify-center gap-2">
                  Explorer la bibliothèque
                  <ArrowRight className="w-5 h-5" />
                </a>
              </Link>
              <Link href="/login">
                <a className="px-8 py-3 border border-white/30 text-white font-semibold rounded-lg hover:bg-white/10 transition-all duration-200 inline-flex items-center justify-center">
                  Se connecter
                </a>
              </Link>
            </motion.div>

            {/* Stats*/}
            <motion.div
              variants={itemVariants}
              className="mt-16 grid grid-cols-3 gap-4 sm:gap-8"
            >
              <div className="text-center">
                <p className="text-2xl sm:text-3xl font-bold text-primary uppercase tracking-widest">Vaste</p>
                <p className="text-xs sm:text-sm text-gray-400 mt-2">Catalogue</p>
              </div>
              <div className="text-center">
                <p className="text-2xl sm:text-3xl font-bold text-primary uppercase tracking-widest">Active</p>
                <p className="text-xs sm:text-sm text-gray-400 mt-2">Communauté</p>
              </div>
              <div className="text-center">
                <p className="text-2xl sm:text-3xl font-bold text-primary uppercase tracking-widest">Fluide</p>
                <p className="text-xs sm:text-sm text-gray-400 mt-2">Expérience</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Featured Catalogue Preview Section */}
      <section className="py-24 sm:py-32 relative overflow-hidden bg-background">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -mr-64 -mt-64" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] -ml-64 -mb-64" />

        <div className="container relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="text-center mb-16"
          >
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-4 border border-primary/20">
              <Sparkles className="w-3 h-3" />
              Aperçu du catalogue
            </motion.div>
            <motion.h2 variants={itemVariants} className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
              Explorez une collection <span className="text-primary">d'exception</span>
            </motion.h2>
            <motion.p variants={itemVariants} className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Accédez à des milliers d'ouvrages soigneusement sélectionnés pour vous. Inscrivez-vous pour débloquer l'accès complet.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {MOCK_BOOKS.slice(0, 4).map((book, index) => (
              <motion.div
                key={book.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link href="/register">
                  <a className="group block relative">
                    <div className="aspect-[2/3] rounded-2xl overflow-hidden shadow-xl border border-border group-hover:border-primary/50 group-hover:shadow-2xl group-hover:shadow-primary/10 transition-all duration-500 relative bg-muted">
                      {/* Placeholder that fades on hover */}
                      <div className="w-full h-full transition-opacity duration-500 group-hover:opacity-0">
                        <BookCoverPlaceholder title={book.title} author={book.authors[0]} id={book.id} />
                      </div>
                      
                      {/* Overlay on hover */}
                      <div className="absolute inset-0 bg-primary/90 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-center p-6 text-center backdrop-blur-md z-10">
                        <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mb-4 scale-75 group-hover:scale-100 transition-transform duration-500">
                          <BookOpen className="w-6 h-6 text-white" />
                        </div>
                        <h4 className="text-white font-bold mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                          {book.title}
                        </h4>
                        <p className="text-white/80 text-sm mb-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                          Par {book.authors[0]}
                        </p>
                        <span className="px-4 py-2 bg-white text-primary rounded-full text-xs font-bold translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-150">
                          Débloquer l'accès
                        </span>
                      </div>
                    </div>
                    
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                        <span className="text-sm font-bold text-foreground">{book.rating}</span>
                      </div>
                      <Badge variant="secondary" size="sm" className="bg-muted/50 text-muted-foreground border-none">
                        {book.category}
                      </Badge>
                    </div>
                  </a>
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-16 text-center"
          >
            <Link href="/register">
              <a className="inline-flex items-center gap-2 px-10 py-4 bg-primary text-primary-foreground font-bold rounded-2xl hover:shadow-2xl hover:shadow-primary/20 hover:scale-105 transition-all duration-300">
                Rejoindre la communauté BiblioTech
                <ArrowRight className="w-5 h-5" />
              </a>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 sm:py-32 bg-muted/30">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={containerVariants}
            className="mb-16"
          >
            <motion.h2
              variants={itemVariants}
              className="text-4xl sm:text-5xl font-bold text-foreground mb-4 text-center"
            >
              Fonctionnalités principales
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-lg text-muted-foreground text-center max-w-2xl mx-auto"
            >
              Tout ce dont vous avez besoin pour une gestion de bibliothèque moderne et efficace
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {[
              {
                icon: BookOpen,
                title: 'Catalogue complet',
                description: 'Accédez à plus de 5000 livres avec descriptions détaillées',
              },
              {
                icon: BookMarked,
                title: 'Emprunts faciles',
                description: 'Empruntez des livres en un clic avec gestion simplifiée',
              },
              {
                icon: Users,
                title: 'Communauté active',
                description: 'Connectez-vous avec d\'autres lecteurs et partagez vos avis',
              },
              {
                icon: TrendingUp,
                title: 'Recommandations',
                description: 'Découvrez des livres basés sur vos préférences de lecture',
              },
            ].map((feature, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card hoverable className="h-full">
                  <CardBody className="text-center">
                    <div className="flex justify-center mb-4">
                      <div className="p-3 bg-primary/10 rounded-lg">
                        <feature.icon className="w-6 h-6 text-primary" />
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </CardBody>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 sm:py-32">
        <div className="container">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-4xl sm:text-5xl font-bold text-foreground mb-16 text-center"
          >
            Comment ça marche
          </motion.h2>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              {
                step: '01',
                title: 'Créer un compte',
                description: 'Inscrivez-vous gratuitement en quelques secondes',
              },
              {
                step: '02',
                title: 'Parcourir le catalogue',
                description: 'Explorez nos milliers de livres disponibles',
              },
              {
                step: '03',
                title: 'Emprunter et lire',
                description: 'Empruntez vos livres préférés et commencez à lire',
              },
            ].map((item, index) => (
              <motion.div key={index} variants={itemVariants}>
                <div className="text-center">
                  <div className="text-5xl font-bold text-primary/20 mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-3">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 sm:py-32 bg-primary text-primary-foreground">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="max-w-2xl mx-auto text-center"
          >
            <motion.h2
              variants={itemVariants}
              className="text-4xl sm:text-5xl font-bold mb-6"
            >
              Prêt à commencer ?
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-lg opacity-90 mb-8"
            >
              Rejoignez des milliers de lecteurs qui utilisent BiblioTech
            </motion.p>
            <motion.div variants={itemVariants}>
              <Link href="/register">
                <a className="inline-flex items-center gap-2 px-8 py-3 bg-white text-primary font-semibold rounded-lg hover:shadow-lg transition-all duration-200 hover:scale-105">
                  S'inscrire maintenant
                  <ArrowRight className="w-5 h-5" />
                </a>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/30 py-12">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 font-bold text-lg mb-4">
                <BookOpen className="w-5 h-5" />
                BiblioTech
              </div>
              <p className="text-sm text-muted-foreground">
                La plateforme moderne pour la gestion de bibliothèque
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Produit</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/features"><a className="hover:text-foreground transition-colors">Fonctionnalités</a></Link></li>
                <li><Link href="/pricing"><a className="hover:text-foreground transition-colors">Tarifs</a></Link></li>
                <li><Link href="/security"><a className="hover:text-foreground transition-colors">Sécurité</a></Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Entreprise</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/about"><a className="hover:text-foreground transition-colors">À propos</a></Link></li>
                <li><Link href="/blog"><a className="hover:text-foreground transition-colors">Blog</a></Link></li>
                <li><Link href="/contact"><a className="hover:text-foreground transition-colors">Contact</a></Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Légal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/privacy"><a className="hover:text-foreground transition-colors">Confidentialité</a></Link></li>
                <li><Link href="/terms"><a className="hover:text-foreground transition-colors">Conditions</a></Link></li>
                <li><Link href="/cookies"><a className="hover:text-foreground transition-colors">Cookies</a></Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2026 BiblioTech. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
