import React from 'react';

import { API } from '../../utils';

const Home = () => {
  const [posts, setPosts] = React.useState([]);

  const onInit = async () => {
    const result = await API.get('/posts');

    console.log(1234, result);

    if (result.status >= 400) {
      console.error('Error loading posts', result.message);
    } else {
      setPosts(result.response);
    }
  };

  React.useEffect(() => {
    onInit();
  }, []);

  return (
    <div>
      <h1>Home</h1>

      {!!posts.length && (
        <div
          className='posts'
        >
          {posts.map((post, index) => (
            <div
              key={index}

              className='post'
            >
              <h2>{post.name}</h2>

              <p>{post.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;

