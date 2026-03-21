import React from 'react';
import { motion } from 'framer-motion';
import { Bot, Sparkles, BookOpen, MessageSquare } from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardBody } from '@/components/ui/Card';
import { AIChat } from '@/components/ai/AIChat';

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

export default function AIPage() {
  return (
    <DashboardLayout>
      <motion.div
        className="space-y-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.div variants={itemVariants}>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-foreground">BibliAI</h1>
              <p className="text-lg text-muted-foreground">
                Votre assistant intelligent pour découvrir des livres
              </p>
            </div>
          </div>
        </motion.div>

        {/* Features */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
          variants={containerVariants}
        >
          <motion.div variants={itemVariants}>
            <Card>
              <CardBody className="flex items-center gap-3 py-3">
                <Sparkles className="w-5 h-5 text-purple-500 flex-shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-foreground">Recommandations</p>
                  <p className="text-xs text-muted-foreground">Suggestions personnalisées</p>
                </div>
              </CardBody>
            </Card>
          </motion.div>
          <motion.div variants={itemVariants}>
            <Card>
              <CardBody className="flex items-center gap-3 py-3">
                <BookOpen className="w-5 h-5 text-blue-500 flex-shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-foreground">Recherche par sujet</p>
                  <p className="text-xs text-muted-foreground">Trouvez par thème ou catégorie</p>
                </div>
              </CardBody>
            </Card>
          </motion.div>
          <motion.div variants={itemVariants}>
            <Card>
              <CardBody className="flex items-center gap-3 py-3">
                <MessageSquare className="w-5 h-5 text-green-500 flex-shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-foreground">Chat interactif</p>
                  <p className="text-xs text-muted-foreground">Posez vos questions librement</p>
                </div>
              </CardBody>
            </Card>
          </motion.div>
        </motion.div>

        {/* Chat Interface */}
        <motion.div variants={itemVariants}>
          <Card className="overflow-hidden">
            <AIChat />
          </Card>
        </motion.div>
      </motion.div>
    </DashboardLayout>
  );
}
