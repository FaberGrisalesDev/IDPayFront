import React from "react";
import AuthenticationService from "../services/AuthenticationService";
import {Navigate, useLocation} from "react-router-dom";
import {useLocalStorage} from "./useLocalStorage";

export interface AuthType {
    username: string,
    password: string,
}

export interface UsernameInformationType {
    token: string,
    username: string,
    rol: number,
    celular: string
}

interface AuthContextType {
    user: UsernameInformationType | null;
    signIn: (user: AuthType, callback: (user?: UsernameInformationType) => void) => Promise<boolean>;
    signOut: (callback: VoidFunction) => Promise<void>;
}

const AuthContext = React.createContext<AuthContextType>(null!);

export function useAuth() {
    return React.useContext(AuthContext);
}

type AuthProviderProps = {
    children: React.ReactNode
}

export function AuthProvider(props: AuthProviderProps) {
    const [user, setUser] = useLocalStorage<UsernameInformationType | null>("user", null);

    const signIn = async (userAuth: AuthType, callback: (user?: UsernameInformationType) => void): Promise<boolean> => {
        return await AuthenticationService.signIn(userAuth, (userAuth: UsernameInformationType) => {
            setUser(userAuth);
            callback(userAuth);
        });
    };

    const signOut = async (callback: VoidFunction) => {
        return await AuthenticationService.signOut(() => {
            setUser(null);
            callback();
        });
    };

    const value = {user, signIn, signOut};

    return <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
}

type RequireAuthType = {
    children: JSX.Element
}

export function RequireAuth(props: RequireAuthType) {
    const auth = useAuth();
    const location = useLocation();

    if (!auth.user) {
        // Redirect them to the /login page, but save the current location they were
        // trying to go to when they were redirected. This allows us to send them
        // along to that page after they login, which is a nicer user experience
        // than dropping them off on the home page.
        return <Navigate to="/auth" state={{from: location}} replace/>;
    }

    return props.children;
}