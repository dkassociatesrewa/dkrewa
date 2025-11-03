
import React, { createContext, useContext, useState, useEffect } from 'react';
import { servicesData as initialServicesData } from '@/data/servicesData';

const DataContext = createContext();

export const useData = () => useContext(DataContext);

const getFromStorage = (key, defaultValue) => {
  try {
    const storedValue = localStorage.getItem(key);
    if (storedValue) {
      return JSON.parse(storedValue);
    }
  } catch (e) {
    console.error(`Error parsing ${key} from localStorage`, e);
  }
  // If default is a function, call it to get the initial value
  return typeof defaultValue === 'function' ? defaultValue() : defaultValue;
};

const saveToStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error(`Error saving ${key} to localStorage`, e);
  }
};

const generateUniqueId = (prefix, existingIds) => {
  let newId;
  do {
    const randomNum = Math.floor(1000000 + Math.random() * 9000000);
    newId = `${prefix}${randomNum}`;
  } while (existingIds.includes(newId));
  return newId;
};

export const DataProvider = ({ children }) => {
  const [servicesData, setServicesData] = useState(() => getFromStorage('dkServices', initialServicesData));
  const [cases, setCases] = useState(() => getFromStorage('dkCases', []));
  const [quotes, setQuotes] = useState(() => getFromStorage('dkQuotes', []));
  const [users, setUsers] = useState(() => getFromStorage('dkUsers', []));
  const [suppliers, setSuppliers] = useState(() => getFromStorage('dkSuppliers', []));
  const [attendance, setAttendance] = useState(() => getFromStorage('dkAttendance', []));
  const [chats, setChats] = useState(() => getFromStorage('dkChats', []));
  const [finances, setFinances] = useState(() => getFromStorage('dkFinances', { income: [], expenses: [] }));
  const [applications, setApplications] = useState(() => getFromStorage('dkApplications', []));

  useEffect(() => saveToStorage('dkServices', servicesData), [servicesData]);
  useEffect(() => saveToStorage('dkCases', cases), [cases]);
  useEffect(() => saveToStorage('dkQuotes', quotes), [quotes]);
  useEffect(() => saveToStorage('dkUsers', users), [users]);
  useEffect(() => saveToStorage('dkSuppliers', suppliers), [suppliers]);
  useEffect(() => saveToStorage('dkAttendance', attendance), [attendance]);
  useEffect(() => saveToStorage('dkChats', chats), [chats]);
  useEffect(() => saveToStorage('dkFinances', finances), [finances]);
  useEffect(() => saveToStorage('dkApplications', applications), [applications]);

  const addCase = (caseData) => {
    const existingIds = cases.map(c => c.id);
    const newId = generateUniqueId('S', existingIds);
    const newCase = { ...caseData, id: newId, status: 'Pending', createdAt: new Date().toISOString() };
    setCases(prev => [...prev, newCase]);
    return newCase;
  };
  
  const updateCaseStatus = (caseId, status) => {
    setCases(prev => prev.map(c => c.id === caseId ? { ...c, status } : c));
  };

  const addApplication = (appData) => {
    const existingIds = applications.map(a => a.id);
    const newId = generateUniqueId('R', existingIds);
    const newApplication = { ...appData, id: newId, status: 'Applied', createdAt: new Date().toISOString() };
    setApplications(prev => [...prev, newApplication]);
    return newApplication;
  };

  const updateService = (categoryId, serviceId, updatedService) => {
    setServicesData(prevData => {
      return prevData.map(category => {
        if (category.category === categoryId) {
          return {
            ...category,
            services: category.services.map(service => 
              service.id === serviceId ? { ...service, ...updatedService } : service
            )
          };
        }
        return category;
      });
    });
  };
  
  const addUser = (userData) => {
    const existingIds = users.map(u => u.id);
    const newId = generateUniqueId('user-', existingIds);
    const newUser = { ...userData, id: newId, createdAt: new Date().toISOString() };
    setUsers(prev => [...prev, newUser]);
    return newUser;
  };

  const updateUser = (userId, updatedData) => {
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, ...updatedData } : u));
  };

  const deleteUser = (userId) => {
    setUsers(prev => prev.filter(u => u.id !== userId));
  };

  const addMessageToChat = (chatId, message) => {
    setChats(prevChats => {
      const chatExists = prevChats.some(c => c.id === chatId);
      if (chatExists) {
        return prevChats.map(c => 
          c.id === chatId 
            ? { ...c, messages: [...c.messages, message] } 
            : c
        );
      } else {
        const newChat = {
          id: chatId,
          participants: chatId.split('-'),
          messages: [message]
        };
        return [...prevChats, newChat];
      }
    });
  };

  const value = {
    servicesData,
    setServicesData,
    updateService,
    cases,
    addCase,
    updateCaseStatus,
    quotes,
    setQuotes,
    users,
    addUser,
    updateUser,
    deleteUser,
    suppliers,
    setSuppliers,
    attendance,
    setAttendance,
    chats,
    addMessageToChat,
    finances,
    setFinances,
    applications,
    addApplication,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
