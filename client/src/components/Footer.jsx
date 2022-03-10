import React from "react";

export const Footer = () => {
    return (
        <section id="footer">
            <div className="footer container">
                <div className="brand">
                    <img src="/img/logo_coder.png" alt="" />
                </div>
                <h2>Soluciones web a tu medida</h2>
                <div className="social-icon">
                    <div className="social-item">
                        <a href="#">
                            <img
                                src="https://img.icons8.com/bubbles/100/000000/facebook-new.png"
                                alt="icon"
                            />
                        </a>
                    </div>
                    <div className="social-item">
                        <a href="#">
                            <img
                                src="https://img.icons8.com/bubbles/100/000000/instagram-new.png"
                                alt="icon"
                            />
                        </a>
                    </div>
                    <div className="social-item">
                        <a href="#">
                            <img
                                src="https://img.icons8.com/bubbles/100/000000/twitter.png"
                                alt="icon"
                            />
                        </a>
                    </div>
                    <div className="social-item">
                        <a href="#">
                            <img
                                src="https://img.icons8.com/bubbles/100/000000/behance.png"
                                alt="icon"
                            />
                        </a>
                    </div>
                </div>
                <p>Copyright © 2022 DMF. All rights reserved</p>
            </div>
        </section>
    );
};
