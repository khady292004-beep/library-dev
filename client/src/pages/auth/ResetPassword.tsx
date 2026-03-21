import React, { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { motion } from 'framer-motion';
import { BookOpen, Mail, ArrowLeft, Check } from 'lucide-react';
import { Card, CardBody, CardHeader } from '@/components/ui/Card';
import { useToast } from '@/hooks/useToast';

type Step = 'email' | 'success';

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export default function ResetPassword() {
  const [step, setStep] = useState<Step>('email');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { showToast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email) {
      setError('L\'email est requis');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Email invalide');
      return;
    }

    setIsLoading(true);
    try {
      // Simulation API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setStep('success');
      showToast('Email de réinitialisation envoyé !', 'success');
    } catch (err) {
      setError('Erreur lors de l\'envoi de l\'email');
      showToast('Erreur lors de l\'envoi', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30 flex items-center justify-center p-4">
      <motion.div
        className="w-full max-w-md"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <Card>
          <CardHeader className="text-center border-b">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <BookOpen className="w-8 h-8 text-primary" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              {step === 'email' ? 'Réinitialiser le mot de passe' : 'Vérifiez votre email'}
            </h1>
            <p className="text-sm text-muted-foreground">
              {step === 'email'
                ? 'Entrez votre email pour recevoir les instructions'
                : 'Un email de réinitialisation a été envoyé'}
            </p>
          </CardHeader>

          <CardBody className="pt-8">
            {step === 'email' ? (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-foreground mb-2">
                    Adresse email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setError('');
                      }}
                      placeholder="vous@exemple.com"
                      className={`w-full pl-10 pr-4 py-2.5 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50 ${
                        error
                          ? 'border-red-500 bg-red-50 dark:bg-red-900/10'
                          : 'border-border bg-card hover:border-primary/30'
                      }`}
                    />
                  </div>
                  {error && (
                    <p className="text-xs text-red-500 mt-1">{error}</p>
                  )}
                </div>

                {/* Info Text */}
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                  <p className="text-sm text-blue-900 dark:text-blue-100">
                    Nous vous enverrons un email avec un lien pour réinitialiser votre mot de passe.
                  </p>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full px-4 py-2.5 bg-primary text-primary-foreground font-semibold rounded-lg hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                      Envoi en cours...
                    </div>
                  ) : (
                    'Envoyer les instructions'
                  )}
                </button>

                {/* Back to Login */}
                <Link href="/login">
                  <a className="flex items-center justify-center gap-2 text-sm text-primary hover:underline transition-colors">
                    <ArrowLeft className="w-4 h-4" />
                    Retour à la connexion
                  </a>
                </Link>
              </form>
            ) : (
              <div className="space-y-6 text-center">
                {/* Success Icon */}
                <div className="flex justify-center">
                  <div className="p-4 bg-green-100 dark:bg-green-900/20 rounded-full">
                    <Check className="w-8 h-8 text-green-600 dark:text-green-400" />
                  </div>
                </div>

                {/* Success Message */}
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-2">
                    Email envoyé avec succès !
                  </h2>
                  <p className="text-muted-foreground">
                    Vérifiez votre email <span className="font-semibold text-foreground">{email}</span> pour les instructions de réinitialisation.
                  </p>
                </div>

                {/* Info Box */}
                <div className="p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg text-left">
                  <p className="text-sm text-amber-900 dark:text-amber-100">
                    <strong>Conseil :</strong> Vérifiez votre dossier spam si vous ne voyez pas l'email dans les prochaines minutes.
                  </p>
                </div>

                {/* Back to Login */}
                <Link href="/login">
                  <a className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-primary text-primary-foreground font-semibold rounded-lg hover:shadow-lg transition-all duration-200 w-full">
                    Retour à la connexion
                  </a>
                </Link>

                {/* Resend Link */}
                <button
                  onClick={() => {
                    setStep('email');
                    setEmail('');
                  }}
                  className="text-sm text-primary hover:underline transition-colors"
                >
                  Utiliser une autre adresse email
                </button>
              </div>
            )}
          </CardBody>
        </Card>

        {/* Footer Text */}
        <p className="text-center text-xs text-muted-foreground mt-6">
          Vous avez besoin d'aide ?{' '}
          <a href="#" className="text-primary hover:underline">
            Contactez le support
          </a>
        </p>
      </motion.div>
    </div>
  );
}
