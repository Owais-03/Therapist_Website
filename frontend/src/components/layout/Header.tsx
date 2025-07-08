import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [showServicesPopup, setShowServicesPopup] = useState(false);
    const servicesRef = useRef<HTMLLIElement>(null);
    const [popupStyle, setPopupStyle] = useState<React.CSSProperties>({});
    const [windowWidth, setWindowWidth] = useState<number>(typeof window !== "undefined" ? window.innerWidth : 1024);

    const router = useRouter();

    useEffect(() => {
        // Close menu when component mounts
        setMenuOpen(false);
        
        function handleResize() {
            setWindowWidth(window.innerWidth);
            // Also close menu when screen resizes to desktop
            if (window.innerWidth >= 768) {
                setMenuOpen(false);
            }
        }
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    
    // Close menu on route change (fixes menu staying open when navigating to a different page)
    useEffect(() => {
        setMenuOpen(false);
    }, [router.asPath]); // use asPath for all navigation changes

    // Function to close menu when a link is clicked
    const handleNavLinkClick = () => {
        if (windowWidth < 768) {
            setMenuOpen(false);
        }
    };

    useEffect(() => {
        if (showServicesPopup && servicesRef.current) {
            const rect = servicesRef.current.getBoundingClientRect();
            setPopupStyle({
                position: 'fixed',
                top: rect.bottom - 35,
                left: rect.right + rect.width / 300,
                transform: 'translateX(-50%)',
                zIndex: 60,
            });
        }
    }, [showServicesPopup]);

    return (
        <>
            <motion.header 
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="flex justify-between items-center px-4 py-2 bg-[#023c40] text-[#EEE5BF] text-sm"
            >
                <div>
                    <span role="img" aria-label="phone">📞</span> Online: (123) 456-7890
                </div>
                <div
                    className="hidden md:block cursor-pointer"
                    onClick={() => {
                        const locationDiv = document.getElementById("location");
                        if (locationDiv) {
                            const offset = 150;
                            const elementPosition = locationDiv.getBoundingClientRect().top;
                            const offsetPosition = elementPosition + window.pageYOffset - offset;

                            window.scrollTo({
                                top: offsetPosition,
                                behavior: "smooth"
                            });
                        }
                    }}
                >
                    <span role="img" aria-label="location">📍</span> Location: Los Angeles, CA 
                </div>
            </motion.header>

            <motion.div 
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="sticky top-0 z-50"
            >
                <nav className="bg-[#e6f7ef]/70 backdrop-blur-md rounded-md px-4 py-2 flex items-center justify-between shadow-md relative flex-wrap">
                    {/* Logo on the left */}
                    <motion.div 
                      whileHover={{ scale: 1.05 }}
                      className="flex items-center cursor-pointer min-w-0 flex-shrink-0 max-w-[60vw]"
                    >
                        <Link href="/" legacyBehavior>
                            <a className="flex-shrink-0">
                                <img
                                    src="../../logo.png"
                                    alt="Grow My Therapy Logo"
                                    className="h-21 w-15 mr-5 md:h-27 md:w-21"
                                />
                            </a>
                        </Link>
                        <Link href="/" legacyBehavior>
                            <a className="truncate">
                                <span className="flex flex-col leading-tight min-w-0">
                                    <span className="text-xl md:text-xl font-bold text-[#023c40] truncate">Dr. Serena</span>
                                    <span className="text-md md:text-sm font-bold text-[#023c40] truncate">Arogya Therapy Wellness</span>
                                    <span className="text-md md:text-sm font-bold text-[#023c40] truncate">Clinic</span>
                                </span>
                            </a>
                        </Link>
                    </motion.div>
                    
                    {/* Hamburger menu for mobile */}
                    <button
                        className="md:hidden flex flex-col justify-center items-center w-10 h-10"
                        onClick={() => setMenuOpen((prev) => !prev)}
                        aria-label="Toggle menu"
                        type="button"
                    >
                        {menuOpen ? (
                            // Cross icon
                            <svg className="w-6 h-6 text-[#023c40]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            // Hamburger icon
                            <>
                                <span className="block w-6 h-0.5 bg-[#023c40] mb-1"></span>
                                <span className="block w-6 h-0.5 bg-[#023c40] mb-1"></span>
                                <span className="block w-6 h-0.5 bg-[#023c40]"></span>
                            </>
                        )}
                    </button>
                    <ul
                        key={router.asPath} // force re-render on navigation
                        className={`
                            ${(menuOpen || windowWidth >= 768) ? 'flex' : 'hidden md:flex'} 
                            flex-col absolute top-full left-0 w-full bg-[#e6f7ef]/95 rounded-b-md shadow-md 
                            md:shadow-none md:bg-transparent md:static md:flex-row md:items-center md:gap-10 md:w-auto md:rounded-none
                            gap-6 font-semibold
                            md:text-xl
                            max-[840px]:text-base
                            overflow-x-auto scrollbar-thin scrollbar-thumb-[#023c40]/40
                        `}
                        style={{ WebkitOverflowScrolling: 'touch' }}
                    >
                        <li
                            className="relative"
                            ref={servicesRef}
                            onMouseEnter={() => setShowServicesPopup(true)}
                            onMouseLeave={() => setShowServicesPopup(false)}
                        >
                            <Link href="/services" legacyBehavior>
                                <a
                                    className="block px-4 py-2 text-[#3a7d5d] hover:text-[#023c40] transition-colors whitespace-nowrap relative"
                                    onClick={handleNavLinkClick}
                                >
                                    Services
                                </a>
                            </Link>
                            {/* Services Popup positioned below the nav link - hidden on mobile */}
                            {showServicesPopup && (
                                <div 
                                    className="hidden min-[766px]:block bg-gray-100 rounded-lg p-4 w-80 shadow-lg border border-gray-200"
                                    style={popupStyle}
                                    onMouseEnter={() => setShowServicesPopup(true)}
                                    onMouseLeave={() => setShowServicesPopup(false)}
                                >
                                    <h3 className="text-lg mb-3 text-[#3bb6b0] font-semibold">Our Services</h3>
                                    <div className="space-y-3">
                                        <div className="border-b border-gray-300 pb-3 p-3 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer">
                                            <h4 className="text-base font-semibold text-[#2a2e4b] mb-1">Individual Counseling</h4>
                                            <p className="text-sm text-[#2a2e4b]">
                                                One-on-one therapy sessions focused on your personal growth and well-being.
                                            </p>
                                            <p className="text-[#3bb6b0] font-medium mt-1 text-sm">$200 per session</p>
                                        </div>
                                        <div className="p-3 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer">
                                            <h4 className="text-base font-semibold text-[#2a2e4b] mb-1">Family Counseling</h4>
                                            <p className="text-sm text-[#2a2e4b]">
                                                Therapy sessions designed to improve family dynamics and relationships.
                                            </p>
                                            <p className="text-[#3bb6b0] font-medium mt-1 text-sm">$240 per session</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </li>
                        <li>
                            <Link href="/#about" legacyBehavior>
                                <a
                                    className="block px-4 py-2 text-[#3a7d5d] hover:text-[#023c40] transition-colors whitespace-nowrap"
                                    onClick={(e) => {
                                        if (window.location.pathname === "/") {
                                            e.preventDefault();
                                            const aboutSection = document.getElementById("about");
                                            if (aboutSection) {
                                                const offset = 150; 
                                                const elementPosition = aboutSection.getBoundingClientRect().top;
                                                const offsetPosition = elementPosition + window.pageYOffset - offset;

                                                window.scrollTo({
                                                    top: offsetPosition,
                                                    behavior: "smooth"
                                                });
                                            }
                                        }
                                        handleNavLinkClick();
                                    }}
                                >
                                    About
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/#testimonial" legacyBehavior>
                                <a
                                    className="block px-4 py-2 text-[#3a7d5d] hover:text-[#023c40] transition-colors whitespace-nowrap"
                                    onClick={(e) => {
                                        if (window.location.pathname === "/") {
                                            e.preventDefault();
                                            const testimonialSection = document.getElementById("testimonial");
                                            if (testimonialSection) {
                                                const offset = 150;
                                                const elementPosition = testimonialSection.getBoundingClientRect().top;
                                                const offsetPosition = elementPosition + window.pageYOffset - offset;

                                                window.scrollTo({
                                                    top: offsetPosition,
                                                    behavior: "smooth"
                                                });
                                            }
                                        }
                                        handleNavLinkClick();
                                    }}
                                >
                                    Testimonial
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/#faq" legacyBehavior>
                                <a
                                    className="block px-4 py-2 text-[#3a7d5d] hover:text-[#023c40] transition-colors whitespace-nowrap"
                                    onClick={(e) => {
                                        if (window.location.pathname === "/") {
                                            e.preventDefault();
                                            const faqSection = document.getElementById("faq");
                                            if (faqSection) {
                                                const offset = 150;
                                                const elementPosition = faqSection.getBoundingClientRect().top;
                                                const offsetPosition = elementPosition + window.pageYOffset - offset;
                                                
                                                window.scrollTo({
                                                    top: offsetPosition,
                                                    behavior: "smooth"
                                                });
                                            }
                                        }
                                        handleNavLinkClick();
                                    }}
                                >
                                    FAQ & Prices
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/contact" legacyBehavior>
                                <a
                                    className="block px-4 py-2 text-[#3a7d5d] hover:text-[#023c40] transition-colors whitespace-nowrap"
                                    onClick={handleNavLinkClick}
                                >
                                    Contact
                                </a>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </motion.div>
        </>
    );
}