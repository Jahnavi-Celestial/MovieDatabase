import { createContext, useContext, useState, type ReactNode } from 'react';

interface MovieContextType {
  timeWindow: 'day' | 'week';
  setTimeWindow: (val: 'day' | 'week') => void;
  popularType: 'movie' | 'tv' | 'person';
  setPopularType: (val: 'movie' | 'tv' | 'person') => void;
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  showSearch: boolean;
  setShowSearch: (val: boolean) => void
}

const MovieContext = createContext<MovieContextType | undefined>(undefined);

export const MovieProvider = ({ children }: { children: ReactNode }) => {
  const [timeWindow, setTimeWindow] = useState<'day' | 'week'>('day');
  const [popularType, setPopularType] = useState<'movie' | 'tv' | 'person'>('movie');
  const [searchQuery, setSearchQuery] = useState("")
  const [showSearch, setShowSearch] = useState<boolean>(false);

  return (
    <MovieContext.Provider value={{ timeWindow, setTimeWindow, popularType, setPopularType, searchQuery,  setSearchQuery, showSearch, setShowSearch}}>
      {children}
    </MovieContext.Provider>
  );
};

export const useMovieContext = () => {
  const context = useContext(MovieContext);
  if(!context){
    throw new Error("error in context")
  }
  return context;
};