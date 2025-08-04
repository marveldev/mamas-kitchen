import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [shoppingList, setShoppingList] = useState([]);
  const [chatHistory, setChatHistory] = useState([]);

  const addToShoppingList = (item) => {
    setShoppingList(prev => {
      const exists = prev.find(i => i.name.toLowerCase() === item.name.toLowerCase());
      if (exists) {
        return prev.map(i => 
          i.name.toLowerCase() === item.name.toLowerCase() 
            ? { ...i, quantity: i.quantity + (item.quantity || 1) }
            : i
        );
      }
      return [...prev, { ...item, id: Date.now() }];
    });
  };

  const removeFromShoppingList = (id) => {
    setShoppingList(prev => prev.filter(item => item.id !== id));
  };

  const updateShoppingListItem = (id, updates) => {
    setShoppingList(prev => 
      prev.map(item => item.id === id ? { ...item, ...updates } : item)
    );
  };

  const addChatMessage = (message) => {
    setChatHistory(prev => [...prev, { ...message, id: Date.now() }]);
  };

  return (
    <AppContext.Provider value={{
      shoppingList,
      addToShoppingList,
      removeFromShoppingList,
      updateShoppingListItem,
      chatHistory,
      addChatMessage
    }}>
      {children}
    </AppContext.Provider>
  );
};
