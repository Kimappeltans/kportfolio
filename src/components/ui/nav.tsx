import { useState } from "react";

export default function MenuCustomAnimation() {
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <div className="flex items-center justify-between">
      
      <nav>
        <section className="MOBILE-MENU flex lg:hidden">
          <div
            className="HAMBURGER-ICON space-y-2"
            onClick={() => setIsNavOpen((prev) => !prev)}
          >
            <span className="block h-0.5 w-8 animate-pulse bg-white"></span>
            <span className="block h-0.5 w-8 animate-pulse bg-white"></span>
            <span className="block h-0.5 w-8 animate-pulse bg-white"></span>
          </div>

          <div className={isNavOpen ? "showMenuNav" : "hideMenuNav"}>
            <div
              className="absolute top-0 right-0 px-8 py-8"
              onClick={() => setIsNavOpen(false)}
            >
              <svg
                className="h-8 w-8 text-gray-600"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </div>
            <ul className="bg-black flex flex-col items-center justify-between min-h-[250px]">
              <li className="border-b border-gray-400 my-8 uppercase">
              <a href="#hero" className="menu-item" style={{ fontSize: '1.5rem' }}>Home</a>
              </li>
              <li className="border-b border-gray-400 my-8 uppercase">
                <a href="#about" className="menu-item" style={{ fontSize: '1.5rem' }}>About</a>
              </li>
              <li className="border-b border-gray-400 my-8 uppercase">
                <a href="#skills" className="menu-item" style={{ fontSize: '1.5rem' }}>Skills</a>
              </li>
              <li className="border-b border-gray-400 my-8 uppercase">
                <a href="#projects" className="menu-item" style={{ fontSize: '1.5rem' }}>Projects</a>
              </li>
              <li className="border-b border-gray-400 my-8 uppercase">
              <a href="#more" className="menu-item" style={{ fontSize: '1.5rem' }}>More</a>
              </li>
            </ul>
          </div>
        </section>

        <ul className="DESKTOP-MENU hidden space-x-8 lg:flex"> {/* Add flex-row-reverse class */}
          <li>
            <a href="#hero" className="menu-item">Home</a>
          </li>
          <li>
            <a href="#about" className="menu-item">About</a>
          </li>
          <li>
            <a href="#skills" className="menu-item">Skills</a>
          </li>
          <li>
            <a href="#projects" className="menu-item">Projects</a>
          </li>
          <li>
            <a href="#more" className="menu-item">More</a>
          </li>
        </ul>
      </nav>
      <style>{`
      .hideMenuNav {
        display: none;
      }
      .HAMBURGER-ICON{
        position: fixed!important; /* or absolute, depending on your layout */
        right: 40px!important;
        top: 40px!important;
      
      }
      .showMenuNav {
        display: block;
        position: absolute;
        width: 100%;
        height: 100vh;
        top: 0;
        left: 0;
        background: black;
        z-index: 10;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
      }
    `}</style>
    </div>
  );
}
