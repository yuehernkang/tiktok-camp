import Image from "next/image";
import React, { useState } from "react";
import logo from '../public/logo.png'
function Navbar() {

  return (
    <>
        <Image src={logo}/>
    </>
  );
}

export default Navbar;
