import React, { useState } from "react";
import { Link } from "react-router-dom";

import { styles } from "../styles.js";
import { navLinks } from "../constants";
import { logo, menu, close } from "../assets";
import { useComponentVisible } from "../hooks/visibility";

const Navbar = () => {
  const [active, setActive] = useState("");
  const { ref, openerRef, isComponentVisible, setIsComponentVisible } =
    useComponentVisible(false);

  const handleScrollTop = () => {
    setActive("");
    window.screenTop(0, 0);
  };

  const handleToggle = () => setIsComponentVisible((prev) => !prev);

  return (
    <nav
      className={`${styles.paddingX} w-full flex items-center py-5 fixed top-0 z-20 bg-primary`}
    >
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
        <Link
          to="/"
          className="flex items-center gap-2"
          onClick={handleScrollTop}
        >
          <img src={logo} alt="logo" className=" w-9 h-9 object-contain" />
          <p className="text-white text-[18px] font-bold cursor-pointer flex">
            Vlad &nbsp;<span className="sm:block hidden">| Samoylyk</span>
          </p>
        </Link>
        <ul className="list-none hidden sm:flex flex-row gap-10">
          {navLinks.map((link) => (
            <NavgationItem
              key={`desk-${link.id}`}
              {...{ link, active, isComponentVisible, setActive, handleToggle }}
            />
          ))}
        </ul>
        <div className="sm:hidden flex flex-1 justify-end items-center">
          <img
            src={isComponentVisible ? close : menu}
            alt="menu"
            className="w-[28px] h-[28px] object-contain cursor-pointer"
            onClick={handleToggle}
            ref={openerRef}
          />
          <div
            className={`${
              !isComponentVisible ? "hidden" : "flex"
            } p-6 black-gradient absolute top-20 right-0 mx-4 my-2 min-w[140px] z-10 rounded-xl`}
            ref={ref}
          >
            <ul className="list-none flex justify-end items-start flex-col gap-4">
              {navLinks.map((link) => (
                <NavgationItem
                  key={`mob-${link.id}`}
                  {...{
                    link,
                    active,
                    isComponentVisible,
                    setActive,
                    handleToggle,
                  }}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

const NavgationItem = ({
  link,
  active,
  isComponentVisible,
  setActive,
  handleToggle,
}) => {
  const handleClick = () => {
    if (isComponentVisible) handleToggle();
    setActive(link.title);
  };

  return (
    <li
      key={link.id}
      className={`${active === link.title ? "text-white" : "text-secondary"} ${
        isComponentVisible
          ? "font-poppins font-medium  text-[16px]"
          : "hover:text-white text-[18px] font-medium"
      } cursor-pointer`}
      onClick={handleClick}
    >
      <a href={`#${link.id}`}>{link.title}</a>
    </li>
  );
};
