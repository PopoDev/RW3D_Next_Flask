"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import Link from "next/link";
import XMark from "./XMark";
import Bars3 from "./Bars3";

export default function Navbar() {
  const navLinks = [
    { text: "Home", href: "/" },
    { text: "Simulation", href: "/simulation" },
    { text: "About", href: "/about" },
  ];

  const pathname = usePathname();
  const [toggle, setToggle] = useState(false);

  const handleSmallScreen = () => {
    setToggle(!toggle);
  };

  return (
    <header className="bg-black text-white ease-in duration-300 w-full fixed top-0 left-0 z-10">
      <nav className="w-4/5 mx-auto h-[64px] flex justify-between items-center navbar">
        <Logo />

        {/* Desktop Navigation */}
        <ul className="h-[64px] hidden font-mono text-xl md:flex">
          {navLinks.map((nav, index) => (
            <li className="flex items-center text-center" key={nav.href}>
              <Link
                href={nav.href}
                className={`cursor-pointer py-4 px-8 hover:bg-slate-800 ${
                  pathname === nav.href ? "text-white" : "text-dimWhite"
                }`}
              >
                {nav.text}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile Navigation */}
        {/* Icons Toggle */}
        <div onClick={handleSmallScreen} className="flex md:hidden">
          {toggle ? <XMark /> : <Bars3 />}
        </div>

        {/* Sidebar */}
        <div
          className={`
          absolute top-[64px] right-0 bottom-0 flex w-full h-screen bg-slate-800 ease-in duration-300 md:hidden
          ${toggle ? "left-0" : "left-[-100%]"}
          `}
        >
          <div className="w-4/5 mx-auto my-20">
            <ul className="font-mono text-xl">
              {navLinks.map((nav, index) => (
                <li className="flex" key={nav.href}>
                  <Link
                    href={nav.href}
                    onClick={() => {
                      handleSmallScreen();
                    }}
                    className={`
                    cursor-pointer p-4 w-full hover:bg-slate-600
                    ${pathname === nav.href ? "text-white" : "text-dimWhite"}
                    `}
                  >
                    {nav.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
