import React from "react";
import { NavLink } from "react-router-dom";

const SideLink = ({ title, to }) => {
  return (
    <NavLink
      to={to}
      className={(isActive) =>
        isActive
          ? "bg-[var(--color-bpciblue)] rounded-md flex items-center gap-[.5rem] active:scale-[.9] transition-all text-white p-[1rem]"
          : " hover:bg-[var(--color-bpciblue)] cursor-pointer active:scale-[.9] transition-all mt-[.15rem] hover:text-white rounded-md flex items-center gap-[.5rem] text-[var(--color-bpcibluei2)] p-[1rem] relative"
      }
    >
      {title}
    </NavLink>
  );
};

export default SideLink;
