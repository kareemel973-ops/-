import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppUser, Farm, Crop, Expense, Revenue, Land, Worker, MarketItem } from '../types';
import {
  INITIAL_USER,
  INITIAL_FARMS,
  INITIAL_CROPS,
  INITIAL_EXPENSES,
  INITIAL_REVENUES,
  INITIAL_LANDS,
  INITIAL_WORKERS,
  INITIAL_MARKET_ITEMS,
} from '../data/mockData';

interface AppContextType {
  user: AppUser | null;
  setUser: (u: AppUser | null) => void;
  isAuthenticated: boolean;
  login: (emailOrPhone: string, pass: string) => Promise<boolean>;
  guestLogin: () => void;
  logout: () => void;
  registerUser: (userData: Partial<AppUser>) => Promise<boolean>;
  togglePremium: () => void;

  farms: Farm[];
  addFarm: (farm: Omit<Farm, 'id'>) => void;

  crops: Crop[];
  addCrop: (crop: Omit<Crop, 'id'>) => void;
  updateCrop: (id: string, crop: Partial<Crop>) => void;
  deleteCrop: (id: string) => void;

  expenses: Expense[];
  addExpense: (expense: Omit<Expense, 'id'>) => void;

  revenues: Revenue[];
  addRevenue: (revenue: Omit<Revenue, 'id'>) => void;

  lands: Land[];
  addLand: (land: Omit<Land, 'id'>) => void;

  workers: Worker[];
  addWorker: (worker: Omit<Worker, 'id'>) => void;

  marketItems: MarketItem[];
  addMarketItem: (item: Omit<MarketItem, 'id'>) => void;

  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AppUser | null>(INITIAL_USER);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true); // Default true or test mode
  const [farms, setFarms] = useState<Farm[]>(INITIAL_FARMS);
  const [crops, setCrops] = useState<Crop[]>(INITIAL_CROPS);
  const [expenses, setExpenses] = useState<Expense[]>(INITIAL_EXPENSES);
  const [revenues, setRevenues] = useState<Revenue[]>(INITIAL_REVENUES);
  const [lands, setLands] = useState<Land[]>(INITIAL_LANDS);
  const [workers, setWorkers] = useState<Worker[]>(INITIAL_WORKERS);
  const [marketItems, setMarketItems] = useState<MarketItem[]>(INITIAL_MARKET_ITEMS);
  const [activeTab, setActiveTab] = useState<string>('home');

  useEffect(() => {
    loadStoredData();
  }, []);

  const loadStoredData = async () => {
    try {
      const storedUser = await AsyncStorage.getItem('@mazraati_user');
      const storedCrops = await AsyncStorage.getItem('@mazraati_crops');
      const storedExpenses = await AsyncStorage.getItem('@mazraati_expenses');
      const storedRevenues = await AsyncStorage.getItem('@mazraati_revenues');

      if (storedUser) setUser(JSON.parse(storedUser));
      if (storedCrops) setCrops(JSON.parse(storedCrops));
      if (storedExpenses) setExpenses(JSON.parse(storedExpenses));
      if (storedRevenues) setRevenues(JSON.parse(storedRevenues));
    } catch (e) {
      console.log('Error loading local storage data', e);
    }
  };

  const saveData = async (key: string, data: any) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.log(`Error saving ${key}`, e);
    }
  };

  const login = async (emailOrPhone: string, pass: string): Promise<boolean> => {
    const mockUser: AppUser = {
      ...INITIAL_USER,
      email: emailOrPhone.includes('@') ? emailOrPhone : INITIAL_USER.email,
      phone: !emailOrPhone.includes('@') ? emailOrPhone : INITIAL_USER.phone,
    };
    setUser(mockUser);
    setIsAuthenticated(true);
    await saveData('@mazraati_user', mockUser);
    return true;
  };

  const guestLogin = () => {
    const guestUser: AppUser = {
      id: 'u_guest_' + Date.now(),
      name: 'زائر مزرعتي',
      email: 'guest@mazraati.app',
      phone: '0500000000',
      province: 'الرياض',
      userType: 'farmer',
      isPremium: false,
    };
    setUser(guestUser);
    setIsAuthenticated(true);
  };

  const logout = async () => {
    setUser(null);
    setIsAuthenticated(false);
    await AsyncStorage.removeItem('@mazraati_user');
  };

  const registerUser = async (userData: Partial<AppUser>): Promise<boolean> => {
    const newUser: AppUser = {
      id: 'u_' + Date.now(),
      name: userData.name || 'مستخدم جديد',
      email: userData.email || '',
      phone: userData.phone || '',
      province: userData.province || 'الرياض',
      userType: userData.userType || 'farmer',
      isPremium: false,
    };
    setUser(newUser);
    setIsAuthenticated(true);
    await saveData('@mazraati_user', newUser);
    return true;
  };

  const togglePremium = () => {
    if (user) {
      const updated = { ...user, isPremium: !user.isPremium };
      setUser(updated);
      saveData('@mazraati_user', updated);
    }
  };

  const addFarm = (f: Omit<Farm, 'id'>) => {
    const newFarm: Farm = { ...f, id: 'f_' + Date.now() };
    const updated = [newFarm, ...farms];
    setFarms(updated);
  };

  const addCrop = (c: Omit<Crop, 'id'>) => {
    const newCrop: Crop = { ...c, id: 'c_' + Date.now() };
    const updated = [newCrop, ...crops];
    setCrops(updated);
    saveData('@mazraati_crops', updated);
  };

  const updateCrop = (id: string, updatedFields: Partial<Crop>) => {
    const updated = crops.map(item => item.id === id ? { ...item, ...updatedFields } : item);
    setCrops(updated);
    saveData('@mazraati_crops', updated);
  };

  const deleteCrop = (id: string) => {
    const updated = crops.filter(item => item.id !== id);
    setCrops(updated);
    saveData('@mazraati_crops', updated);
  };

  const addExpense = (e: Omit<Expense, 'id'>) => {
    const newExp: Expense = { ...e, id: 'e_' + Date.now() };
    const updated = [newExp, ...expenses];
    setExpenses(updated);
    saveData('@mazraati_expenses', updated);
  };

  const addRevenue = (r: Omit<Revenue, 'id'>) => {
    const newRev: Revenue = { ...r, id: 'r_' + Date.now() };
    const updated = [newRev, ...revenues];
    setRevenues(updated);
    saveData('@mazraati_revenues', updated);
  };

  const addLand = (l: Omit<Land, 'id'>) => {
    const newLand: Land = { ...l, id: 'l_' + Date.now() };
    setLands([newLand, ...lands]);
  };

  const addWorker = (w: Omit<Worker, 'id'>) => {
    const newWorker: Worker = { ...w, id: 'w_' + Date.now() };
    setWorkers([newWorker, ...workers]);
  };

  const addMarketItem = (m: Omit<MarketItem, 'id'>) => {
    const newItem: MarketItem = { ...m, id: 'm_' + Date.now() };
    setMarketItems([newItem, ...marketItems]);
  };

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        isAuthenticated,
        login,
        guestLogin,
        logout,
        registerUser,
        togglePremium,
        farms,
        addFarm,
        crops,
        addCrop,
        updateCrop,
        deleteCrop,
        expenses,
        addExpense,
        revenues,
        addRevenue,
        lands,
        addLand,
        workers,
        addWorker,
        marketItems,
        addMarketItem,
        activeTab,
        setActiveTab,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
