import React from 'react';

function Footer() {
    return (
        <div className="pt-5">
            <footer className="blog-footer pt-5 border-top ">
                <p>
                    Copyright © 2009 - 2024 .
                </p>
                <p className="">BlogPost made by
                    <a href="https://twitter.com/mrx" target="_blank" rel="noopener noreferrer"> MRX</a>.
                </p>

                <div className="social-icons mb-3">
                    <a href="https://twitter.com/mrx" target="_blank" rel="noopener noreferrer" className="mx-2">
                        <i className="fab fa-twitter"></i>
                    </a>
                    <a href="https://github.com/mrx" target="_blank" rel="noopener noreferrer" className="mx-2">
                        <i className="fab fa-github"></i>
                    </a>
                    <a href="https://linkedin.com/in/mrx" target="_blank" rel="noopener noreferrer" className="mx-2">
                        <i className="fab fa-linkedin"></i>
                    </a>
                </div>

            </footer>
        </div>


    );
}

export default Footer;
