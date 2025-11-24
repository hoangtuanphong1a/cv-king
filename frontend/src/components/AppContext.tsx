"use client";
import { createContext, useContext, useReducer, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  userType: 'job-seeker' | 'employer';
  avatar?: string;
  company?: string;
}

interface AppState {
  currentPage: string;
  selectedJob?: any;
  selectedCompany?: any;
  selectedArticle?: any;
  user?: User;
  isLoggedIn: boolean;
  searchQuery?: string;
  filters?: any;
}

type AppAction =
  | { type: 'SET_PAGE'; payload: string }
  | { type: 'SET_JOB'; payload: any }
  | { type: 'SET_COMPANY'; payload: any }
  | { type: 'SET_ARTICLE'; payload: any }
  | { type: 'SET_USER'; payload: User }
  | { type: 'SET_SEARCH'; payload: string }
  | { type: 'SET_FILTERS'; payload: any }
  | { type: 'LOGOUT' }
  | { type: 'LOGIN'; payload: { user: User; redirectTo?: string } };

interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
  navigateTo: (page: string, data?: any) => void;
  setUser: (user: User) => void;
  logout: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'SET_PAGE':
      return { ...state, currentPage: action.payload };
    
    case 'SET_JOB':
      return { ...state, selectedJob: action.payload };
    
    case 'SET_COMPANY':
      return { ...state, selectedCompany: action.payload };
    
    case 'SET_ARTICLE':
      return { ...state, selectedArticle: action.payload };
    
    case 'SET_USER':
      return { ...state, user: action.payload, isLoggedIn: true };
    
    case 'SET_SEARCH':
      return { ...state, searchQuery: action.payload };
    
    case 'SET_FILTERS':
      return { ...state, filters: action.payload };
    
    case 'LOGIN':
      const targetPage = action.payload.user.userType === 'employer' 
        ? 'employer-dashboard' 
        : 'dashboard';
      return {
        ...state,
        user: action.payload.user,
        isLoggedIn: true,
        currentPage: action.payload.redirectTo || targetPage
      };
    
    case 'LOGOUT':
      return {
        ...state,
        user: undefined,
        isLoggedIn: false,
        currentPage: 'home'
      };
    
    default:
      return state;
  }
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(appReducer, {
    currentPage: 'home',
    isLoggedIn: false,
  });

  const navigateTo = (page: string, data?: any) => {
    // Handle page navigation with data
    if (data?.job) {
      dispatch({ type: 'SET_JOB', payload: data.job });
    }
    if (data?.company) {
      dispatch({ type: 'SET_COMPANY', payload: data.company });
    }
    if (data?.article) {
      dispatch({ type: 'SET_ARTICLE', payload: data.article });
    }
    if (data?.search) {
      dispatch({ type: 'SET_SEARCH', payload: data.search });
    }
    if (data?.filters) {
      dispatch({ type: 'SET_FILTERS', payload: data.filters });
    }
    
    dispatch({ type: 'SET_PAGE', payload: page });
  };

  const setUser = (user: User) => {
    dispatch({ type: 'SET_USER', payload: user });
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <AppContext.Provider value={{ state, dispatch, navigateTo, setUser, logout }}>
      {children}
    </AppContext.Provider>
  );
};
