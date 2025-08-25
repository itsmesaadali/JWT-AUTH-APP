'use Client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface User {
    id:string;
    username:string;
    email:string;
}

interface AuthContextType {
    user: User | null;
    login:(email:string, password:string) => Promise<{success:boolean; message?:string}>;
    register:(username:string, email:string, password:string) => Promise<{success:boolean; message?:string}>;
    logout:() => Promise<void>;
    isLoading:boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({children}: {children:React.ReactNode}) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true)
    const router = useRouter();

    useEffect(()=> {
        checkAuth();
    }, [])

    const checkAuth = async () => {
        try {
            const response = await fetch('/api/auth/me');
            if(response.ok) {
                const userData = await response.json();
                setUser(userData)
            }
        } catch (error) {
            console.error('Auth check failed:', error)
        } finally {
            setIsLoading(false)
        }
    }

    const login = async (email:string, password: string) => {
        try {
            const response = await fetch('/api/auth/login', {
                method:'POST',
                headers: { 'Content-Type': 'application/json'},
                body:JSON.stringify({email, password}),
            });

            const data = await response.json();

            if(response.ok) {
                setUser(data.user);
                router.push('/')
                return { success:true}
            } else {
                return { success:false, message: data.message}
            }
        } catch (error) {
            return { success: false, message: 'An error occured during login'}
        }
    }

    
    const register = async (username:string, email:string, password: string) => {
        try {
            const response = await fetch('/api/auth/register', {
                method:'POST',
                headers: { 'Content-Type': 'application/json'},
                body:JSON.stringify({username, email, password}),
            });

            const data = await response.json();

            if(response.ok) {
                setUser(data.user);
                router.push('/')
                return { success:true}
            } else {
                return { success:false, message: data.message}
            }
        } catch (error) {
            return { success: false, message: 'An error occured during register'}
        }
    }

    const logout = async () => {
        try {
            await fetch('api/auth/logout', { method: 'POST'})
            setUser(null);
            router.push('/login')
        } catch (error) {
            console.error('Logout failed:', error)
        }
    }

    return(
        <AuthContext.Provider value={{user, login, register, logout, isLoading}}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext);
    if(context === undefined) {
        throw new Error('useAuth must be used with an AuthProvider')
    }

    return context;
}