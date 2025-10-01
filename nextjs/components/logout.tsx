'use client';

import { LogOutIcon } from "lucide-react";
import { authClient } from "../lib/auth-client";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";


export function Logout ()  {

    const router = useRouter()
    const handleLogout = async () => {
        await authClient.signOut()
        router.push('/')
    }

    return (
        <Button variant='outline' onClick={handleLogout}>
            Logout <LogOutIcon className="size-4"/>
        </Button>
    )
}

