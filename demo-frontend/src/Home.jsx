import React from 'react';

function Home() {
  const user = JSON.parse(localStorage.getItem('user'));
  return (
    <div>
      <h1>Welcome, {user?.username || "User"}!</h1>
      <h1>{user?.email || "User"}!</h1>
      <p>This is your home page after login.</p>
    </div>
  );
}

export default Home;
