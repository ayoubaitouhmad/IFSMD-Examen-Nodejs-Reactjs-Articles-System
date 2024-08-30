import React from 'react';

function Footer() {
    return (
        <div className=" pt-5">
            <footer className="blog-footer pt-5 border-top ">


                <div className="row">
                    <div className="col-12 col-md">

                        <p>
                            Copyright © 2009 - 2024 .
                        </p>
                        <p className="">BlogPost made by
                            <a href="https://twitter.com/mrx" target="_blank" rel="noopener noreferrer"> MRX</a>.
                        </p>


                        <div className="social-icons mb-3">
                            <a href="https://twitter.com/mrx" target="_blank" rel="noopener noreferrer"
                               className="mx-2">
                                <i className="fab fa-twitter"></i>
                            </a>
                            <a href="https://github.com/mrx" target="_blank" rel="noopener noreferrer" className="mx-2">
                                <i className="fab fa-github"></i>
                            </a>
                            <a href="https://linkedin.com/in/mrx" target="_blank" rel="noopener noreferrer"
                               className="mx-2">
                                <i className="fab fa-linkedin"></i>
                            </a>
                        </div>

                    </div>
                    <div className="col-6 col-md">
                        <h5>Features</h5>
                        <ul className="list-unstyled text-small">
                            <li><a className="text-muted" href="#">Cool stuff</a></li>
                            <li><a className="text-muted" href="#">Random feature</a></li>
                            <li><a className="text-muted" href="#">Team feature</a></li>
                            <li><a className="text-muted" href="#">Stuff for developers</a></li>
                            <li><a className="text-muted" href="#">Another one</a></li>
                            <li><a className="text-muted" href="#">Last time</a></li>
                        </ul>
                    </div>
                    <div className="col-6 col-md">
                        <h5>Resources</h5>
                        <ul className="list-unstyled text-small">
                            <li><a className="text-muted" href="#">Resource</a></li>
                            <li><a className="text-muted" href="#">Resource name</a></li>
                            <li><a className="text-muted" href="#">Another resource</a></li>
                            <li><a className="text-muted" href="#">Final resource</a></li>
                        </ul>
                    </div>
                    <div className="col-6 col-md">
                        <h5>About</h5>
                        <ul className="list-unstyled text-small">
                            <li><a className="text-muted" href="#">Team</a></li>
                            <li><a className="text-muted" href="#">Locations</a></li>
                            <li><a className="text-muted" href="#">Privacy</a></li>
                            <li><a className="text-muted" href="#">Terms</a></li>
                        </ul>
                    </div>
                </div>
            </footer>
        </div>


    );
}

export default Footer;


