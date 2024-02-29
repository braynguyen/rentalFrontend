// pages/users/[id].tsx
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

const getCookie = (name: string): string | null => {
    return Cookies.get(name) || null;
};

const getBearerToken = (): string | null => {
    const tokenCookie = getCookie('token');
    return tokenCookie ? `Bearer ${tokenCookie}` : null;
};

const getUser = async (id: string, token: string | null): Promise<any> => {
    try {
        const response = await fetch(`http://localhost:5000/api/user/${id}`, {
            method: 'GET',
            headers: {
                'Authorization': token as string,
            },
        });

        if (response.ok) {
            const userData = await response.json();
            return userData;
        } else {
            console.error('Fetch failed');
            return null;
        }
    } catch (error) {
        console.error('Error during fetch:', error);
        return null;
    }
};

const UserPage = ({ params }: { params: { id: string } }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = getBearerToken();
        getUser(params.id, token).then((userData) => {
            setUser(userData);
        });
    }, [params.id]);

    return (
        <>
            <div>My GET: {params.id}</div>
            {user && (
                <div>
                    User Data:
                    <pre>{JSON.stringify(user, null, 2)}</pre>
                </div>
            )}
        </>
    );
};

export default UserPage;
