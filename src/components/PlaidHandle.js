import { useCallback, useContext } from 'react';
import { UserContext } from './UserContext';

export default function PlaidHandle() {
    const { setUser, user, token, setBalance } = useContext(UserContext);
    

    this.getIdentity = useCallback(async ()=> {
        const res = await fetch("/api/identity/" + token, {});

        const accountsArray = await res.json();
        setUser(accountsArray[0].owners[0].names[0]);
    }, [token, setUser]);

    if (!user)
        this.getIdentity();

    this.getBalance = useCallback(async () => {
        const res = await fetch("/api/balance/" + token,{});

        const data = await res.json();
        setBalance(data);
    }, [token, setBalance])


}