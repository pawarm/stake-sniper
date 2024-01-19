import { createContext, useContext } from 'react';
import { PairCardData } from '../components/PairCard';
  
export interface AppStateContext {
  cardsData: PairCardData[]
}

export const initialState: AppStateContext = {
  cardsData: [],
} 

export const appStateContext = createContext<AppStateContext>(initialState);

export const useAppStateContext = (): AppStateContext => useContext(appStateContext);
