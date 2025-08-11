import { Link, Navigate, Route, Routes, useNavigate } from 'react-router-dom';

import Home from './pages/Home';
import About from './pages/About';

function App() {
  const navigate = useNavigate();

  return (
    <div className="root">
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
                <Link to="/about">
                  O nama
                </Link>
              </li>

              <li>
                <button>
                  Kupi me
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
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
}

export default App;
