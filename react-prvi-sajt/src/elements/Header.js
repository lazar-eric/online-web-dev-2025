import React from 'react';

function Header() {

  return (
    <header>
      <div className="omotac">
        <a href="/">
          <img src="https://picsum.photos/300/100" alt="logo" className="logo" />
        </a>

        <nav>
          <ul className="meni">
            <li>
              <a href="/o-nama">
                About
              </a>
            </li>

            <li>
              <a href="/prodavnica">
                Prodavnica
              </a>
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
  );
}

export default Header;
