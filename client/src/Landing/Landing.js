import React from "react";
import { Link } from "react-router-dom";

export function Landing() {
  return (
    <>
      <Link to="/aids">Aids</Link>
      <Link to="/mortality/adult">Adult mortality</Link>
      <Link to="/mortality/child">Child mortality</Link>
    </>
  );
}
