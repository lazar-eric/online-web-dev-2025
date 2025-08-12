import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';

const Main = (props) => {
  const navigate = useNavigate();

  return (
    <div>
      <header>
        <div className="omotac">
          <span
            onClick={() => {
              navigate('/qwe');
            }}
          >
            <img src="https://picsum.photos/300/100" alt="logo" className="logo" />
          </span>

          <nav>
            <ul className="meni">
              <li>
                <Link to="/">
                  Home
                </Link>
              </li>

              <li>
                <Link to="/create">
                  Create post
                </Link>
              </li>

              <li>
                <button
                  onClick={props.onSignOut}
                >
                  Sign out
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main>
        <Outlet />
      </main>

      <footer>
        <nav>
          <ul className="meni">
            <li>
              <a href="https://myspace.com">
                My Space
              </a>
            </li>

            <li>
              <a href="https://msn.com">
                MSN
              </a>
            </li>
          </ul>
        </nav>

        <p>Dragon ball Super, Akira Toriyama RIP</p>
      </footer>
    </div>
  );
};

export default Main;

