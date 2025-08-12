import React from 'react';

const Home = () => {
  const [posts, setPosts] = React.useState([]);

  const onInit = () => {
    // api 
  };

  React.useEffect(() => {
    onInit();
  }, []);

  return (
    <div>
      <h1>Home</h1>


    </div>
  );
};

export default Home;

