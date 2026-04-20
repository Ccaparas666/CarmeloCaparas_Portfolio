import { SquareKanban, ExternalLink } from 'lucide-react';
import { FaFacebook, FaGithub, FaLinkedin } from 'react-icons/fa';



export const Home = () => {

    return (
        <>
            <section id="home" className="relative min-h-screen flex items-center justify-center bg-background/50 py-20 lg:py-0 overflow-hidden">
                <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="flex flex-col gap-8 text-center lg:text-start items-center lg:items-start order-2 lg:order-1">
                        <div className="space-y-4">
                            <h2 className="text-lg md:text-xl font-medium text-primary tracking-[0.2em] uppercase">
                                Hi, I'm Carmelo Caparas
                            </h2>
                            <h1 className="text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.9]">
                                WEB <br />
                                <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-violet-500">
                                    DESIGNER
                                </span>
                            </h1>
                        </div>

                        <p className="text-muted-foreground text-lg md:text-xl max-w-lg leading-relaxed">
                            I craft high-performance, visually stunning digital experiences.
                            Focused on clean code and user-centric design to bring your ideas to life.
                        </p>


                        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mt-2">
                            <button className="flex items-center justify-center gap-3 bg-primary text-primary-foreground py-4 px-10 rounded-full font-bold shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-1 transition-all duration-300">
                                PROJECTS <SquareKanban size={20} />
                            </button>

                            <button className="flex items-center justify-center gap-3 border-2 border-primary py-4 px-10 rounded-full font-bold hover:bg-primary/10 transition-all duration-300">
                                HIRE ME <ExternalLink size={20} />
                            </button>
                        </div>


                        <div className="flex justify-center lg:justify-start items-center gap-6 mt-4">
                            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                                <FaGithub size={24} />
                            </a>
                            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                                <FaFacebook size={24} />
                            </a>
                            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                                <FaLinkedin size={24} />
                            </a>
                        </div>
                    </div>


                    <div className="relative flex justify-center items-center order-1 lg:order-2">

                        <div className="absolute w-75 h-75 bg-primary/30 rounded-full blur-[100px] animate-pulse"></div>

                        <div className="relative w-72 h-72 md:w-96 md:h-96 lg:w-125 lg:h-125 flex items-center justify-center">

                            <div className="w-full h-full rounded-4xl border border-white/10 bg-white/5 backdrop-blur-sm flex items-center justify-center rotate-3 hover:rotate-0 transition-transform duration-500 shadow-2xl overflow-hidden">
                                {/* <div className="flex flex-col items-center gap-4">
                                    <div className="w-24 h-24 rounded-full bg-linear-to-tr from-primary to-violet-500 animate-bounce" />
                                    <p className="font-mono text-sm opacity-50">IMAGE_PLACEHOLDER</p>
                                </div> */}

                                <div className="relative inline-block overflow-hidden rounded-2xl">

                                    <img
                                        src="src/assets/Minimalist-Line-Art-Hand-Tattoo-removebg-preview.png"
                                        alt="Carmelo"
                                        className="relative z-10 w-full h-auto rounded-2xl"
                                    />

                                    <img
                                        src="src/assets/Minimalist-Line-Art-Hand-Tattoo.jpg"
                                        alt="Carmelo"
                                        className="absolute top-0 z-9 w-full h-auto rounded-2xl"
                                    />


                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-9 w-[110%] h-[110%] pointer-events-none flex items-center justify-center">
                                        <svg
                                            viewBox="0 0 24 24"
                                            className="w-full h-full opacity-25 animate-[spin_25s_linear_infinite] filter drop-shadow-[0_0_12px_rgba(0,216,255,0.6)]"
                                        >
                                            <circle cx="12" cy="12" r="2.5" fill="#00D8FF" />
                                            <g stroke="#00D8FF" strokeWidth="0.5" fill="none">
                                                <ellipse rx="10" ry="4" transform="rotate(60 12 12)" cx="12" cy="12" />
                                                <ellipse rx="10" ry="4" transform="rotate(120 12 12)" cx="12" cy="12" />
                                                <ellipse rx="10" ry="4" cx="12" cy="12" />
                                            </g>
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            <div className="absolute -bottom-6 -left-6 p-4 bg-secondary/80 backdrop-blur-md border border-white/10 rounded-xl shadow-xl hidden md:block animate-float">
                                <p className="text-xs font-bold text-primary">5+ Years Exp.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>

    )
}
