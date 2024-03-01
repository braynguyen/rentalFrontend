import React from 'react';
import UserPage from './getUser';

const Page = async ({ params }: { params: { id: string } }) => {
  const user = await UserPage({ params });

  return (
    <div>
      <h1>User Page</h1>
      <br />
      {user && (
        <>
          <p>User ID: {user._id}</p>
          <p>User Name: {user.firstName} {user.lastName}</p>
          <p>User Email: {user.email}</p>
          <p>User Phone Number: {user.mobile}</p>
        </>
      )}
    </div>
  );
};

export default Page;
