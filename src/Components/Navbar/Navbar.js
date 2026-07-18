import React from 'react'
import "./Navbar.css"
import "../../index.css"

function Navbar({ theme, toggleTheme }) {
  return (
    <nav>
      <div className="logo-area">
        <div className="tooltip">
          <span className="material-symbols-outlined hover">menu</span>
          <span className="tooltip-text">Main Menu</span>
        </div>
        <img
          className="gb_Hc gb_Hd"
          src="https://www.gstatic.com/images/branding/productlogos/keep_2026/v2/web-48dp/logo_keep_2026_color_1x_web_48dp.png"
          srcSet="
            https://www.gstatic.com/images/branding/productlogos/keep_2026/v2/web-48dp/logo_keep_2026_color_1x_web_48dp.png 1x,
            https://www.gstatic.com/images/branding/productlogos/keep_2026/v2/web-48dp/logo_keep_2026_color_2x_web_48dp.png 2x
          "
          alt="logo-image"
          aria-hidden="true"
          role="presentation"
          style={{ width: "40px", height: "40px" }}
        />
        <span className="logo-text">Keep</span>
      </div>
      <div className="middle-nav">
     <div className="search-area">
        <div className="tooltip">
          <span className="material-symbols-outlined hover">search</span>
          <span className="tooltip-text">Search</span>
        </div>
        <input type="text" placeholder="Search" />
      </div>
      <div className="settings-area">
        <div className="tooltip">
          <span className="material-symbols-outlined hover">refresh</span>
          <span className="tooltip-text">Refresh</span>
        </div>
        <div className="tooltip">
          <span className="material-symbols-outlined hover">view_agenda</span>
          <span className="tooltip-text">View List</span>
        </div>
        <div className="tooltip">
          <span className="material-symbols-outlined hover">settings</span>
          <span className="tooltip-text">Settings</span>
        </div>
      </div>

      </div>
 
      <div className="profile-actions-area">
        {/* Dark-mode control shows the mode that will be activated. */}
        <div className="tooltip">
          <button
            className="theme-toggle hover"
            type="button"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            <span className="material-symbols-outlined">
              {theme === "dark" ? "light_mode" : "dark_mode"}
            </span>
          </button>
          <span className="tooltip-text">
            {theme === "dark" ? "Light mode" : "Dark mode"}
          </span>
        </div>
        <div className="tooltip">
          <span className="material-symbols-outlined hover">apps</span>
          <span className="tooltip-text">Apps</span>
        </div>
        <div className="tooltip">
          <span className="material-symbols-outlined hover">account_circle</span>
          <span className="tooltip-text">Accounts</span>
        </div>
      </div>
    </nav>
  )
}

export default Navbar

      
