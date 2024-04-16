import React from 'react';
import Sidebar from '@/components/Sidebar/Sidebar';
import Nav from "@/components/Nav/Nav";

const Home: React.FC = () => {
  return (
    <div>
      <Nav />
      <Sidebar />
    </div>
  );
};

export default Home;
