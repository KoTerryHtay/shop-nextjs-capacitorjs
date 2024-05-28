import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import Link from "next/link";
import SearchProduct from "./search-product";

export default function Header() {
  return (
    <Navbar className="bg-[#00ADB5] shadow shadow-black">
      <NavbarBrand className="font-bold text-xl text-white">
        <Link href={"/"}>
          <div className="bg-[#393E46] p-1 pb-1 rounded border border-[#393E46]">
            <span className="text-[#2cf0fb]">S</span>HOP
          </div>
        </Link>
      </NavbarBrand>

      <NavbarContent justify="center">
        <SearchProduct />
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem>
          <Link href={"/create"}>
            <button className="text-white font-semibold active:bg-[#393E46] p-1 rounded">
              New
            </button>
          </Link>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
