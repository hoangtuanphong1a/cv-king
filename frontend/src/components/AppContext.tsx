"use client";
import { createContext, useContext, useReducer, ReactNode } from 'react';
import type { Job } from '@/types/job.type';
import type { Company } from '@/types/company.type';
import type { BlogPost } from '@/types/blog.type';

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
  selectedJob?: Job;
  selectedJobId?: string;
  selectedCompany?: Company;
  selectedArticle?: BlogPost;
  user?: User;
  isLoggedIn: boolean;
  searchQuery?: string;
  filters?: Record<string, unknown>;
}

type AppAction =
  | { type: 'SET_PAGE'; payload: string }
  | { type: 'SET_JOB'; payload: Job }
  | { type: 'SET_JOB_ID'; payload: string }
  | { type: 'SET_COMPANY'; payload: Company }
  | { type: 'SET_ARTICLE'; payload: BlogPost }
  | { type: 'SET_USER'; payload: User }
  | { type: 'SET_SEARCH'; payload: string }
  | { type: 'SET_FILTERS'; payload: Record<string, unknown> }
  | { type: 'LOGOUT' }
  | { type: 'LOGIN'; payload: { user: User; redirectTo?: string } };

interface NavigateData {
  job?: Job;
  jobId?: string;
  company?: Company;
  article?: BlogPost;
  search?: string;
  filters?: Record<string, unknown>;
}

interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
  navigateTo: (page: string, data?: NavigateData) => void;
  setUser: (user: User) => void;
  logout: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'SET_PAGE':
      return { ...state, currentPage: action.payload };

    case 'SET_JOB':
      return { ...state, selectedJob: action.payload, selectedJobId: undefined };

    case 'SET_JOB_ID':
      return { ...state, selectedJobId: action.payload, selectedJob: undefined };

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

  const navigateTo = (page: string, data?: NavigateData) => {
    // Handle page navigation with data
    if (data?.job) {
      dispatch({ type: 'SET_JOB', payload: data.job });
    }
    if (data?.jobId) {
      dispatch({ type: 'SET_JOB_ID', payload: data.jobId });
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
