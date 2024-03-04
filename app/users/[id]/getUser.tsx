import { cookies } from 'next/headers';

const UserPage = async ({ params }: { params: { id: string } }) => {
    const cookieStore = cookies()
    const token = cookieStore.get('token')
    let user = undefined;
    if (token) {
        const response = await fetch(`http://localhost:5000/api/user/${params.id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token.value}`,
            },
        });
        user = await response.json();
    }

    return user;
};

export default UserPage;