import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Container } from "../index";
import LogoutBtn from "./LogoutBtn";
import Logo from "../Logo";
import Logo2 from "../../image/Logo2.png"
import close from "../../image/close.png";
import menu from "../../image/nav.png";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  const [navOpen, setnavOpen] = useState(false);

  const toggleNavBar = () => {
    setnavOpen(!navOpen);
  };

  const closeNavBar = () => {
    setnavOpen(false);
  };
  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
     {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    }
    // {
    //   name: "Edit post",
    //   slug: "/edit-post",
    //   active: authStatus,
    // },
  ];

  return (
    <header className="py-3 shadow sticky top-0 z-50 bg-primary-color ">
      <Container>
        <nav className="flex justify-between flex-wrap items-center">
          <div>
            <Link to="/" onClick={closeNavBar}>
              {/* <Logo width="100px" /> */}
              <img className="w-60 h-12"src={Logo2} alt="logo" />
            </Link>
          </div>
          <div className="md:hidden mr-4">
            <button onClick={toggleNavBar}>
              {navOpen ? (<img src={close}  alt="close"/>) :  (<img src={menu} alt="menu"/>)}
            </button>
          </div>
          <ul className={` ml-auto md:flex md:w-auto md:items-center md:flex-row   ${navOpen ? "w-full flex flex-col items-center" : "hidden"}`}>
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => {
                      navigate(item.slug);
                    }}
                    className="inline-bock text-white px-6 py-2 duration-200 hover:bg-header-hover-color hover:text-white dark:hover:bg-blue-100 rounded-full"
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
