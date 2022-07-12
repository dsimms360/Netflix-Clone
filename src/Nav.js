import React, {useState, useEffect} from 'react';
import "./Nav.css";

function Nav() {

    const [show, handleShow] = useState(false);

    useEffect(() => {
        window.addEventListener("scroll", () => {
            if(window.scrollY > 100) {
                handleShow(true);
            }
            else handleShow(false);
        });
    }, []);

  return (
    <div className={`nav ${show && "nav_black"}`}>
        <img
            className="nav_logo"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/799px-Netflix_2015_logo.svg.png?20190206123158"
            alt="Netflix logo"
        />
        <img
            className="nav_avatar"
            src="https://i.pinimg.com/originals/34/62/d2/3462d27440aa255b1c314ff16f4032b4.png"
            alt="Profile Avatar"
        />
    </div>
  )
}

export default Nav