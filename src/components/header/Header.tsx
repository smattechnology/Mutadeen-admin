import React from "react";

const Header = () => {
  return (
    <header className="w-full p-4">
      <div className="lg:max-w-7xl mx-auto flex items-center justify-between">
        <h1 className="text-2xl font-bold">Mutadeen Admin</h1>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <a href="#" className="text-blue-500">
                Dashboard
              </a>
            </li>
            <li>
              <a href="#" className="text-blue-500">
                Settings
              </a>
            </li>
            <li>
              <a href="#" className="text-blue-500">
                Profile
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
