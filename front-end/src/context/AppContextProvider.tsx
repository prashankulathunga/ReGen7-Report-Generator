import { type TAuthUser } from '../types/index';
import {
    createContext,
    useContext,
    useState,
    type Dispatch,
    type ReactNode,
    type SetStateAction,
} from 'react';

type AppContextType = {
    isUser: boolean;
    isLoginForm: boolean;
    user: TAuthUser;
    setIsLoginForm: Dispatch<SetStateAction<boolean>>;
    setUser: Dispatch<SetStateAction<TAuthUser>>;
};

const AppContext = createContext<AppContextType | null>(null);

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
    const [isLoginForm, setIsLoginForm] = useState<boolean>(true);
    const [user, setUser] = useState<TAuthUser>({
        id: 'usr_002',
        firstName: 'Prashan',
        lastName: 'Kulathunga',
        email: 'prashan.kulathunga@example.com',
        regCode: 'RGEN1002',
        role: 'Member',
    });

    const value: AppContextType = {
        isUser: false,
        isLoginForm,
        setIsLoginForm,
        user,
        setUser,
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAppContext = () => {
    const context = useContext(AppContext);

    if (!context) {
        throw new Error('useAppContext must be used inside AppContextProvider');
    }

    return context;
};
