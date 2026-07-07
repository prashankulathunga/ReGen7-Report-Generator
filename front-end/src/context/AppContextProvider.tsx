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
    setIsLoginForm: Dispatch<SetStateAction<boolean>>;
};

const AppContext = createContext<AppContextType | null>(null);

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
    const [isLoginForm, setIsLoginForm] = useState<boolean>(true);

    const value: AppContextType = {
        isUser: true,
        isLoginForm,
        setIsLoginForm,
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
