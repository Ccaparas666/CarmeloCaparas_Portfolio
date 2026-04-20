export const About = () => {
    return (
        <section id="about" className="h-screen flex items-center justify-center">
            <div className="mt-12 grid grid-cols-12 gap-8 max-w-6xl mx-auto px-4">
                <div className="col-span-9">
                    <h2 className="text-3xl font-bold mb-4">About Me</h2>
                    <p className="text-slate-300 leading-relaxed mb-4">
                        I'm a full-stack developer specializing in modern web technologies and responsive design. 
                        I've delivered multiple production applications with a focus on user experience, clean code, 
                        and scalable architecture.
                    </p>
                    <p className="text-slate-300 leading-relaxed">
                        I thrive on solving complex technical challenges, optimizing performance, and collaborating with teams 
                        to build innovative solutions that make an impact.
                    </p>
                </div>
                <div className="col-span-3 bg-linear-to-br from-blue-500/10 to-purple-500/10 rounded-lg p-6 border border-slate-700">
                    <h3 className="text-lg font-semibold mb-4">Technical Stack</h3>
                    <ul className="space-y-2 text-sm text-slate-300">
                        <li>• JavaScript / React / Node.js</li>
                        <li>• Responsive Design / Tailwind CSS</li>
                        <li>• API Development & Integration</li>
                        <li>• Performance Optimization</li>
                    </ul>
                </div>
            </div>
        </section>
    )
}


