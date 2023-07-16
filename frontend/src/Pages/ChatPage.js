import React from 'react';
import axios from 'axios';
import { useEffect } from 'react';

const Chatpage = () => {
  const fetchChats = async () => {
    const data = await axios.get(
      'https://stackblitzstartersfet5fz-wrmr--5000--e809191e.local-credentialless.webcontainer.io/'
    );
    console.log('Data Is ', data);
  };

  useEffect(() => {
    fetchChats();
  }, []);

  return <div>Chat page</div>;
};

export default Chatpage;
