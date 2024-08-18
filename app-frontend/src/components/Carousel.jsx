import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './NavCarousel.css'; // Custom CSS for styling

function NavCarousel() {
    const navItems = [
        { name: "World", href: "#" },
        { name: "U.S.", href: "#" },
        { name: "Technology", href: "#" },
        { name: "Design", href: "#" },
        { name: "Culture", href: "#" },
        { name: "Business", href: "#" },
        { name: "Politics", href: "#" },
        { name: "Opinion", href: "#" },
        { name: "Science", href: "#" },
        { name: "Health", href: "#" },
        { name: "Style", href: "#" },
        { name: "Travel", href: "#" },
        { name: "Travel", href: "#" },
        { name: "Travel", href: "#" },
        { name: "Travel", href: "#" },
        { name: "Travel", href: "#" },
        { name: "Travel", href: "#" },
        { name: "Travel", href: "#" },
        { name: "Travel", href: "#" },
        { name: "Travel", href: "#" },
        { name: "Travel", href: "#" },
        { name: "Travel", href: "#" },
        { name: "Travel", href: "#" },
    ];

    return (
        <div className="nav-scroller">
            <nav className="nav">
                {navItems.map((item, index) => (
                    <a className="p-2 text-muted" href={item.href} key={index}>
                        {item.name}
                    </a>
                ))}
            </nav>
        </div>
    );
}

export default NavCarousel;
