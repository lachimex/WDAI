import { Outlet, Link } from "react-router-dom";
import "./layout.css"

const Layout = () => {
  return (
    <>
      <nav className="navbar">
        <ul>
          <li>
            <Link to='/zad1'>Zad1</Link>
          </li>
          <li>
            <Link to='/zad2'>Zad2</Link>
          </li>
          <li>
            <Link to='/zad4'>Zad4</Link>
          </li>
          <li>
            <Link to='/zad5'>Zad5</Link>  
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  )
};

export default Layout;