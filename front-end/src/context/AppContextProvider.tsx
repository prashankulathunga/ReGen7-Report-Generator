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
    allUser: TAuthUser[];
    setIsLoginForm: Dispatch<SetStateAction<boolean>>;
    setUser: Dispatch<SetStateAction<TAuthUser>>;
    setAllUser: Dispatch<SetStateAction<TAuthUser[]>>;
};

const AppContext = createContext<AppContextType | null>(null);

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
    const [isLoginForm, setIsLoginForm] = useState<boolean>(true);
    const [user, setUser] = useState<TAuthUser>({
        id: 'usr_002',
        firstName: 'Sarah',
        lastName: 'William',
        email: 'sarah.w@example.com',
        regCode: 'RGEN1002',
        role: 'Manager',
    });

    const [allUser, setAllUser] = useState<TAuthUser[]>([
        {
            id: 'usr_001',
            firstName: 'Alex',
            lastName: 'Johnson',
            email: 'alex.j@example.com',
            regCode: 'RGEN1001',
            role: 'Member',
        },
        {
            id: 'usr_002',
            firstName: 'Sarah',
            lastName: 'Williams',
            email: 'sarah.w@example.com',
            regCode: 'RGEN1002',
            role: 'Manager',
        },
        {
            id: 'usr_003',
            firstName: 'Michael',
            lastName: 'Brown',
            email: 'michael.b@example.com',
            regCode: 'RGEN1003',
            role: 'Member',
        },
        {
            id: 'usr_004',
            firstName: 'Emma',
            lastName: 'Davis',
            email: 'emma.d@example.com',
            regCode: 'RGEN1004',
            role: 'Admin',
        },
    ]);

    const value: AppContextType = {
        isUser: true,
        isLoginForm,
        setIsLoginForm,
        user,
        setUser,
        allUser,
        setAllUser,
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
