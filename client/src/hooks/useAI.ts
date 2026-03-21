import { useState, useCallback } from 'react';
import { AIMessage, getAIResponse, createUserMessage } from '@/services/aiService';

const WELCOME_MESSAGE: AIMessage = {
  id: 'welcome',
  role: 'assistant',
  content:
    'Bonjour ! 👋 Je suis **BibliAI**, votre assistant intelligent de la bibliothèque BiblioTech.\n\nJe peux vous aider à :\n- 📚 Trouver des livres sur un sujet\n- 💡 Obtenir des recommandations personnalisées\n- 🔍 Chercher par auteur ou catégorie\n\n**Exemples de questions :**\n- "Quel livre pour apprendre React ?"\n- "Quels livres sur la cybersécurité ?"\n- "Je veux un roman court"\n\nQue puis-je faire pour vous ? 😊',
  timestamp: new Date(),
};

export function useAI() {
  const [messages, setMessages] = useState<AIMessage[]>([WELCOME_MESSAGE]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim() || isLoading) return;

    const userMessage = createUserMessage(content.trim());
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await getAIResponse(content.trim());
      setMessages(prev => [...prev, response]);
    } catch {
      setMessages(prev => [
        ...prev,
        {
          id: Math.random().toString(36).substr(2, 9),
          role: 'assistant',
          content: 'Désolé, une erreur est survenue. Veuillez réessayer.',
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading]);

  const clearChat = useCallback(() => {
    setMessages([WELCOME_MESSAGE]);
  }, []);

  return { messages, isLoading, sendMessage, clearChat };
}
