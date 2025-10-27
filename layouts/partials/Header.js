// import Logo from "@components/Logo";
// import config from "@config/config.json";
// import menu from "@config/menu.json";
// import { useAuth } from "context/AuthContext";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import React, { useEffect, useRef, useState } from "react";
// import { CgClose } from "react-icons/cg";

// const Header = () => {
//   // destructuring the main menu from menu object
//   const { main } = menu;

//   // states declaration
//   const [showMenu, setShowMenu] = useState(false);
//   const [sticky, setSticky] = useState(false);
//   const headerRef = useRef(null);
//   const [direction, setDirection] = useState(null);

//   const pathname = usePathname();
//   const asPath = pathname;

//   const {user, isLoggedIn} = useAuth()

//   // sticky header
//   useEffect(() => {
//     const header = headerRef.current;
//     const headerHeight = header.clientHeight + 200;
//     let prevScroll = 0;
//     window.addEventListener("scroll", () => {
//       const scrollY = window.scrollY;
//       scrollY > 0 ? setSticky(true) : setSticky(false);
//       if (scrollY > headerHeight) {
//         prevScroll > scrollY ? setDirection(-1) : setDirection(1);
//         prevScroll = scrollY;
//       } else {
//         setDirection(null);
//       }
//     });
//   }, []);

//   // logo source
//   const { logo } = config.site;

//   return (
//     <>
//       <div className="header-height-fix"></div>
//       <header
//         className={`header ${sticky && "header-sticky"} ${
//           direction === 1 && "unpinned"
//         }`}
//         ref={headerRef}
//       >
//         <nav className="navbar container-xl">
//           {/* logo */}
//           <div className="order-0">
//             <Logo src={logo} />
//           </div>

//           <ul
//             id="nav-menu"
//             className={`navbar-nav order-2 w-full justify-center lg:order-1 md:w-auto md:space-x-2 lg:flex ${
//               !showMenu && "hidden"
//             }`}
//           >
//             {main.map((menu, i) => (
//               <React.Fragment key={`menu-${i}`}>
//                 {menu.hasChildren ? (
//                   <li className="nav-item nav-dropdown group relative">
//                     <span className="nav-link inline-flex items-center cursor-pointer">
//                       {menu.name}
//                       <svg
//                         className="h-4 w-4 fill-current"
//                         viewBox="0 0 20 20"
//                       >
//                         <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
//                       </svg>
//                     </span>
//                     {/* Full-width dropdown */}
//                     <div className="nav-dropdown-container absolute left-0 right-0 top-full">
//                       <ul className="nav-dropdown-list hidden bg-white border-t border-gray-200 shadow-lg lg:group-hover:flex lg:visible">
//                         <li className="w-full">
//                           <div className="mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-8 py-6 w-full max-w-screen-xl">
//                             {menu.children.map((group, i) => (
//                               <div key={`group-${i}`} className="min-w-0">
//                                 <h4 className="font-medium text-dark text-sm mb-3">
//                                   {group.title}
//                                 </h4>
//                                 <ul className="space-y-2">
//                                   {group.links.map((link, j) => (
//                                     <li key={`link-${j}`}>
//                                       <Link
//                                         href={link.url}
//                                         className={`block px-2 py-1 text-xs text-gray-600 hover:text-primary transition leading-relaxed ${
//                                           asPath === link.url && "active"
//                                         }`}
//                                         onClick={() => setShowMenu(false)}
//                                       >
//                                         {link.name}
//                                       </Link>
//                                     </li>
//                                   ))}
//                                 </ul>
//                               </div>
//                             ))}
//                           </div>
//                         </li>
//                       </ul>
//                     </div>
//                   </li>
//                 ) : (
//                   <li className="nav-item">
//                     <Link
//                       href={menu.url}
//                       className={`nav-link block ${
//                         asPath === menu.url && "active"
//                       }`}
//                       onClick={() => setShowMenu(false)}
//                     >
//                       {menu.name}
//                     </Link>
//                   </li>
//                 )}
//               </React.Fragment>
//             ))}
//             {config.nav_button.enable && (
//               <li className="nav-item lg:hidden">
//                 <Link
//                   className="btn btn-primary hidden lg:flex"
//                   href={config.nav_button.link}
//                   onClick={() => setShowMenu(false)}
//                 >
//                   {config.nav_button.label}
//                 </Link>
//               </li>
//             )}
//           </ul>
//           <div className="order-1 ml-auto flex items-center md:ml-0">
//             {config.nav_button.enable && (
//               <Link
//                 className="btn btn-primary hidden lg:flex"
//                 href={config.nav_button.link}
//               >
//                 {config.nav_button.label}
//               </Link>
//             )}

//             {/* navbar toggler */}
//             {showMenu ? (
//               <button
//                 className="h-8 w-8 text-3xl text-dark lg:hidden"
//                 onClick={() => setShowMenu(!showMenu)}
//               >
//                 <CgClose />
//               </button>
//             ) : (
//               <button
//                 className="text-dark lg:hidden"
//                 onClick={() => setShowMenu(!showMenu)}
//               >
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   viewBox="0 0 32 32"
//                   width="32px"
//                   height="32px"
//                 >
//                   <path
//                     fill="currentColor"
//                     d="M 5 5 L 5 11 L 11 11 L 11 5 L 5 5 z M 13 5 L 13 11 L 19 11 L 19 5 L 13 5 z M 21 5 L 21 11 L 27 11 L 27 5 L 21 5 z M 7 7 L 9 7 L 9 9 L 7 9 L 7 7 z M 15 7 L 17 7 L 17 9 L 15 9 L 15 7 z M 23 7 L 25 7 L 25 9 L 23 9 L 23 7 z M 5 13 L 5 19 L 11 19 L 11 13 L 5 13 z M 13 13 L 13 19 L 19 19 L 19 13 L 13 13 z M 21 13 L 21 19 L 27 19 L 27 13 L 21 13 z M 7 15 L 9 15 L 9 17 L 7 17 L 7 15 z M 15 15 L 17 15 L 17 17 L 15 17 L 15 15 z M 23 15 L 25 15 L 25 17 L 23 17 L 23 15 z M 5 21 L 5 27 L 11 27 L 11 21 L 5 21 z M 13 21 L 13 27 L 19 27 L 19 21 L 13 21 z M 21 21 L 21 27 L 27 27 L 27 21 L 21 21 z M 7 23 L 9 23 L 9 25 L 7 25 L 7 23 z M 15 23 L 17 23 L 17 25 L 15 25 L 15 23 z"
//                   />
//                 </svg>
//               </button>
//             )}
//             {/* /navbar toggler */}
//           </div>
//         </nav>
//       </header>

//       <style jsx>{`
//         .header-height-fix {
//           height: 80px;
//         }

//         .header {
//           position: fixed;
//           top: 0;
//           left: 0;
//           width: 100%;
//           z-index: 50;
//           background: white;
//           transition: transform 0.3s ease;
//         }

//         .header-sticky {
//           box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
//         }

//         .header.unpinned {
//           transform: translateY(-100%);
//         }

//         .nav-dropdown-container {
//           left: 0;
//           right: 0;
//         }

//         .nav-dropdown-list {
//           width: 100vw;
//           margin-left: calc(-50vw + 50%);
//         }

//         @media (max-width: 1023px) {
//           .nav-dropdown-list {
//             position: static;
//             width: 100%;
//             margin-left: 0;
//             transform: none;
//             border: none;
//             box-shadow: none;
//           }

//           .nav-dropdown-container {
//             position: static;
//             width: 100%;
//             transform: none;
//           }
//         }
//       `}</style>
//     </>
//   );
// };

// export default Header;

import Logo from "@components/Logo";
import config from "@config/config.json";
import menu from "@config/menu.json";
import { useAuth } from "context/AuthContext";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { CgClose } from "react-icons/cg";

const Header = () => {
  // destructuring the main menu from menu object
  const { main } = menu;

  // states declaration
  const [showMenu, setShowMenu] = useState(false);
  const [sticky, setSticky] = useState(false);
  const headerRef = useRef(null);
  const [direction, setDirection] = useState(null);

  const pathname = usePathname();
  const asPath = pathname;

  const { user, isLoggedIn, handleLogout } = useAuth();

  // sticky header
  useEffect(() => {
    const header = headerRef.current;
    const headerHeight = header.clientHeight + 200;
    let prevScroll = 0;
    window.addEventListener("scroll", () => {
      const scrollY = window.scrollY;
      scrollY > 0 ? setSticky(true) : setSticky(false);
      if (scrollY > headerHeight) {
        prevScroll > scrollY ? setDirection(-1) : setDirection(1);
        prevScroll = scrollY;
      } else {
        setDirection(null);
      }
    });
  }, []);

  // logo source
  const { logo } = config.site;

  // Handle logout
  const handleLogoutClick = async () => {
    console.log("logout");
    await handleLogout();
    setShowMenu(false);
  };

  return (
    <>
      <div className="header-height-fix"></div>
      <header
        className={`header ${sticky && "header-sticky"} ${
          direction === 1 && "unpinned"
        }`}
        ref={headerRef}
      >
        <nav className="navbar container-xl">
          {/* logo */}
          <div className="order-0">
            <Logo src={logo} />
          </div>

          <ul
            id="nav-menu"
            className={`navbar-nav order-2 w-full justify-center lg:order-1 md:w-auto md:space-x-2 lg:flex ${
              !showMenu && "hidden"
            }`}
          >
            {main.map((menu, i) => (
              <React.Fragment key={`menu-${i}`}>
                {menu.hasChildren ? (
                  <li className="nav-item nav-dropdown group relative">
                    <span className="nav-link inline-flex items-center cursor-pointer">
                      {menu.name}
                      <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </span>
                    {/* Full-width dropdown */}
                    <div className="nav-dropdown-container absolute left-0 right-0 top-full">
                      <ul className="nav-dropdown-list hidden bg-white border-t border-gray-200 shadow-lg lg:group-hover:flex lg:visible">
                        <li className="w-full">
                          <div className="mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-8 py-6 w-full max-w-screen-xl">
                            {menu.children.map((group, i) => (
                              <div key={`group-${i}`} className="min-w-0">
                                <h4 className="font-medium text-dark text-sm mb-3">
                                  {group.title}
                                </h4>
                                <ul className="space-y-2">
                                  {group.links.map((link, j) => (
                                    <li key={`link-${j}`}>
                                      <Link
                                        href={link.url}
                                        className={`block px-2 py-1 text-xs text-gray-600 hover:text-primary transition leading-relaxed ${
                                          asPath === link.url && "active"
                                        }`}
                                        onClick={() => setShowMenu(false)}
                                      >
                                        {link.name}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        </li>
                      </ul>
                    </div>
                  </li>
                ) : (
                  <li className="nav-item">
                    <Link
                      href={menu.url}
                      className={`nav-link block ${
                        asPath === menu.url && "active"
                      }`}
                      onClick={() => setShowMenu(false)}
                    >
                      {menu.name}
                    </Link>
                  </li>
                )}
              </React.Fragment>
            ))}

            {/* Mobile auth buttons */}
            <li className="nav-item lg:hidden">
              {isLoggedIn ? (
                <div className="flex flex-col space-y-2">
                  <span className="nav-link text-primary font-medium">
                    Welcome, {user?.first_name || user?.email || "User"}
                  </span>
                  <button
                    onClick={handleLogoutClick}
                    className="btn btn-outline-primary text-sm"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex flex-col space-y-2">
                  <Link
                    className="btn btn-primary text-sm"
                    href="/login"
                    onClick={() => setShowMenu(false)}
                  >
                    Login
                  </Link>
                  <Link
                    className="btn btn-outline-primary text-sm"
                    href="/signup"
                    onClick={() => setShowMenu(false)}
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </li>
          </ul>

          <div className="order-1 ml-auto flex items-center md:ml-0 space-x-4">
            {/* Desktop auth buttons */}
            {isLoggedIn ? (
              <div className="hidden lg:flex items-center space-x-4">
                <span className="text-sm text-gray-700">
                  Welcome,{" "}
                  <span className="font-medium text-primary">
                    {user?.first_name || user?.email || "User"}
                  </span>
                </span>
                <button
                  onClick={handleLogoutClick}
                  className="btn btn-outline-primary text-sm"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="hidden lg:flex items-center space-x-3">
                <Link className="btn btn-outline-primary text-sm" href="/login">
                  Login
                </Link>
                <Link className="btn btn-primary text-sm" href="/signup">
                  Sign Up
                </Link>
              </div>
            )}

            {/* navbar toggler */}
            {showMenu ? (
              <button
                className="h-8 w-8 text-3xl text-dark lg:hidden"
                onClick={() => setShowMenu(!showMenu)}
              >
                <CgClose />
              </button>
            ) : (
              <button
                className="text-dark lg:hidden"
                onClick={() => setShowMenu(!showMenu)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 32 32"
                  width="32px"
                  height="32px"
                >
                  <path
                    fill="currentColor"
                    d="M 5 5 L 5 11 L 11 11 L 11 5 L 5 5 z M 13 5 L 13 11 L 19 11 L 19 5 L 13 5 z M 21 5 L 21 11 L 27 11 L 27 5 L 21 5 z M 7 7 L 9 7 L 9 9 L 7 9 L 7 7 z M 15 7 L 17 7 L 17 9 L 15 9 L 15 7 z M 23 7 L 25 7 L 25 9 L 23 9 L 23 7 z M 5 13 L 5 19 L 11 19 L 11 13 L 5 13 z M 13 13 L 13 19 L 19 19 L 19 13 L 13 13 z M 21 13 L 21 19 L 27 19 L 27 13 L 21 13 z M 7 15 L 9 15 L 9 17 L 7 17 L 7 15 z M 15 15 L 17 15 L 17 17 L 15 17 L 15 15 z M 23 15 L 25 15 L 25 17 L 23 17 L 23 15 z M 5 21 L 5 27 L 11 27 L 11 21 L 5 21 z M 13 21 L 13 27 L 19 27 L 19 21 L 13 21 z M 21 21 L 21 27 L 27 27 L 27 21 L 21 21 z M 7 23 L 9 23 L 9 25 L 7 25 L 7 23 z M 15 23 L 17 23 L 17 25 L 15 25 L 15 23 z"
                  />
                </svg>
              </button>
            )}
            {/* /navbar toggler */}
          </div>
        </nav>
      </header>

      <style jsx>{`
        .header-height-fix {
          height: 80px;
        }

        .header {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 50;
          background: white;
          transition: transform 0.3s ease;
        }

        .header-sticky {
          box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
        }

        .header.unpinned {
          transform: translateY(-100%);
        }

        .nav-dropdown-container {
          left: 0;
          right: 0;
        }

        .nav-dropdown-list {
          width: 100vw;
          margin-left: calc(-50vw + 50%);
        }

        @media (max-width: 1023px) {
          .nav-dropdown-list {
            position: static;
            width: 100%;
            margin-left: 0;
            transform: none;
            border: none;
            box-shadow: none;
          }

          .nav-dropdown-container {
            position: static;
            width: 100%;
            transform: none;
          }
        }
      `}</style>
    </>
  );
};

export default Header;
