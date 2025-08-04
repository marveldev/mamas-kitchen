import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, Utensils } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { nigerianRecipes } from '../data/recipes';

const AIChat = () => {
  const { chatHistory, addChatMessage } = useApp();
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const generateAIResponse = (userMessage) => {
    const ingredients = userMessage.toLowerCase();
    
    // Simple AI logic to recommend recipes based on ingredients
    const recommendations = nigerianRecipes.filter(recipe => {
      const recipeIngredients = recipe.ingredients.join(' ').toLowerCase();
      const userWords = ingredients.split(' ').filter(word => word.length > 2);
      return userWords.some(word => recipeIngredients.includes(word));
    });

    if (recommendations.length > 0) {
      const recipe = recommendations[0];
      return `Based on your ingredients, I recommend making **${recipe.name}**! 🍲

${recipe.description}

**Cook time:** ${recipe.cookTime}
**Serves:** ${recipe.servings} people
**Difficulty:** ${recipe.difficulty}

This recipe would be perfect with what you have. Would you like me to suggest any alternatives or help you with something else?`;
    } else {
      return `I couldn't find a perfect match for your ingredients, but here are some popular Nigerian recipes you might enjoy:

🍲 **Jollof Rice** - A classic one-pot dish
🥣 **Egusi Soup** - Rich melon seed soup
🍖 **Suya** - Spicy grilled meat skewers

Tell me more about what you have available, and I'll give you a better recommendation!`;
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    addChatMessage(userMessage);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse = {
        type: 'ai',
        content: generateAIResponse(inputMessage),
        timestamp: new Date()
      };
      addChatMessage(aiResponse);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const suggestedQuestions = [
    "I have rice, tomatoes, and chicken",
    "What can I make with beans?",
    "I want something spicy",
    "Quick 30-minute meal ideas"
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20 flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 px-4 pt-12 pb-6">
        <div className="max-w-md mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="bg-white/20 backdrop-blur-sm rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
              <Bot className="text-white" size={32} />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">AI Recipe Assistant</h1>
            <p className="text-purple-100 text-sm">
              Tell me what's in your fridge and I'll suggest recipes!
            </p>
          </motion.div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 px-4 py-6 overflow-y-auto">
        <div className="max-w-md mx-auto space-y-4">
          {chatHistory.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-8"
            >
              <div className="text-6xl mb-4">🤖</div>
              <p className="text-gray-600 mb-4">
                Hi! I'm your Nigerian recipe assistant
              </p>
              <p className="text-sm text-gray-500 mb-6">
                Tell me what ingredients you have, and I'll recommend the perfect Nigerian dish for you!
              </p>
              
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-700 mb-3">Try asking:</p>
                {suggestedQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => setInputMessage(question)}
                    className="block w-full text-left p-3 bg-white rounded-lg border border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-colors text-sm"
                  >
                    "{question}"
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          <AnimatePresence>
            {chatHistory.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`flex gap-3 ${message.type === 'user' ? 'flex-row-reverse' : ''}`}
              >
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                  message.type === 'user' 
                    ? 'bg-orange-600 text-white' 
                    : 'bg-purple-600 text-white'
                }`}>
                  {message.type === 'user' ? <User size={16} /> : <Bot size={16} />}
                </div>
                
                <div className={`flex-1 max-w-xs ${message.type === 'user' ? 'text-right' : ''}`}>
                  <div className={`inline-block p-3 rounded-lg ${
                    message.type === 'user'
                      ? 'bg-orange-600 text-white'
                      : 'bg-white border border-gray-200'
                  }`}>
                    <div className={`text-sm ${message.type === 'user' ? 'text-white' : 'text-gray-900'}`}>
                      {message.content.split('\n').map((line, index) => {
                        if (line.startsWith('**') && line.endsWith('**')) {
                          return <div key={index} className="font-bold">{line.slice(2, -2)}</div>;
                        }
                        return <div key={index}>{line}</div>;
                      })}
                    </div>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Typing Indicator */}
          <AnimatePresence>
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex gap-3"
              >
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center">
                  <Bot size={16} />
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-3">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Input Area */}
      <div className="bg-white border-t border-gray-200 px-4 py-4">
        <div className="max-w-md mx-auto">
          <div className="flex gap-3">
            <textarea
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="What ingredients do you have?"
              className="flex-1 p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
              rows="1"
              style={{ minHeight: '44px', maxHeight: '100px' }}
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isTyping}
              className="p-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIChat;
