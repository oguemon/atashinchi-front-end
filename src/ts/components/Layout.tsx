import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const Layout: React.FC = (props) => {
  return (
    <>
      <Header />
      {props.children}
      <Footer />
    </>
  );
}

export default Layout;

/*
import React, { useState, useCallback } from "react";
import { NavLink, Link } from "react-router-dom";

const Layout: React.FC = (props) => {
  let [ title, setTitle ] = useState<string>("Welcome");

  return (
    <div>
      <Header changeTitle={setTitle} title={title} />

      {props.children}

      <Link to="/">TOP</Link> /
      <Link to="/settings">SETTINGS</Link> /
      <NavLink to="/settings/main" className="btn" activeClassName="btn-act">settings</NavLink> /
      <Link to="/settings/extra">SETTING (extra)</Link>
      <Footer />
    </div>
  );
}
*/
