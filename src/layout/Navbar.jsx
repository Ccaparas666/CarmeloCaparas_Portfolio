import { Menu, X } from "lucide-react";
import { useState } from "react";

export const Navbar = () => {

    const [activeLink, setActiveLink] = useState('Home');
    const [isOpen, setIsOpen] = useState(false);

    const navLinks = [
        { href: "#home", label: "Home" },
        { href: "#about", label: "About" },
        { href: "#projects", label: "Projects" },
        { href: "#contact", label: "Contact" },
    ];
    return (
        <header className="fixed top-0 left-0 w-full z-100 border-b border-white/5 bg-slate-950/80 backdrop-blur-md">
            <nav className="container mx-auto flex items-center justify-between py-4 px-6 md:px-12">


                <a href="#" className="text-xl font-bold tracking-tighter hover:opacity-80 transition-opacity">
                    CARMELO<span className="text-primary">.</span>
                </a>


                <div className="hidden lg:flex items-center bg-white/5 border border-white/10 rounded-full px-2 py-1">
                    {navLinks.map((link, index) => (
                        <a
                            href={link.href}
                            key={index}
                            onClick={() => setActiveLink(link.label)}
                            className={`text-sm font-medium py-2 px-6 rounded-full transition-all duration-300
                            ${activeLink === link.label
                                    ? 'bg-primary text-white shadow-lg shadow-primary/20'
                                    : 'text-muted-foreground hover:text-white'}
                            `}
                        >
                            {link.label}
                        </a>
                    ))}
                </div>


                <div className="hidden lg:block">
                    <button className="bg-white text-black text-sm font-bold py-2.5 px-8 rounded-full hover:bg-primary hover:text-white transition-all duration-300">
                        Contact Me
                    </button>
                </div>


                <button
                    className="lg:hidden text-white"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </nav>


            <div className={`absolute top-full left-0 w-full bg-slate-950 border-b border-white/10 lg:hidden transition-all duration-300 ease-in-out ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
                <div className="flex flex-col p-6 gap-4">
                    {navLinks.map((link, index) => (
                        <a
                            href={link.href}
                            key={index}
                            onClick={() => {
                                setActiveLink(link.label);
                                setIsOpen(false);
                            }}
                            className="text-lg py-2 border-b border-white/5"
                        >
                            {link.label}
                        </a>
                    ))}
                    <button className="w-full bg-primary py-4 rounded-xl font-bold mt-4">
                        Contact Me
                    </button>
                </div>
            </div>
        </header>
    )
}

