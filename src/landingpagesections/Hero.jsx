"use client"
import Particles from "react-tsparticles";
import { TypeAnimation } from "react-type-animation";
import { loadFull } from "tsparticles";

export default function Hero() {
    const particlesInit = async (main) => {
        await loadFull(main);
    };

    const particlesLoaded = (container) => {
        console.log(container);
    };
    return (
        <>
            <section id="home">
                <div className="pt-5 herobg" >
                    <div id="particles-container" >
                        <Particles
                            id="tsparticles"
                            init={particlesInit}
                            loaded={particlesLoaded}
                            options={{
                                fpsLimit: 30,
                                interactivity: {
                                    events: {
                                        onClick: {
                                            enable: false,
                                            mode: "push"
                                        },
                                        onHover: {
                                            enable: true,
                                            mode: "repulse"
                                        },
                                        resize: false
                                    },
                                    modes: {
                                        push: {
                                            quantity: 2
                                        },
                                        repulse: {
                                            distance: 50,
                                            duration: 0.4
                                        }
                                    }
                                },
                                particles: {
                                    color: {
                                        value: "#ffa500"
                                    },
                                    links: {
                                        color: "#ffa500",
                                        distance: 150,
                                        enable: true,
                                        opacity: 0.5,
                                        width: 1
                                    },
                                    collisions: {
                                        enable: false
                                    },
                                    move: {
                                        direction: "none",
                                        enable: true,
                                        outModes: {
                                            default: "bounce"
                                        },
                                        random: false,
                                        speed: 1,
                                        straight: false
                                    },
                                    number: {
                                        density: {
                                            enable: true,
                                            area: 800
                                        },
                                        value: 200
                                    },
                                    opacity: {
                                        value: 0.2
                                    },
                                    shape: {
                                        type: "circle"
                                    },
                                    size: {
                                        value: { min: 1, max: 5 }
                                    }
                                },
                                detectRetina: true,
                                fullScreen: { enable: false }

                            }}
                        />



                        <div className="text-container ">

                            <div className="header">
                                <h1 >
                                REVIEW<span className="herosecond">R</span>
                                </h1>


                            </div>
                            <TypeAnimation
                                sequence={[

                                    'Bridge Research & Industry: AI in Action.',
                                    1000,
                                    'Fuels Startups with Cutting-Edge Academic Insights.',
                                    1000,
                                    'Turns Academic Breakthroughs into Business Knowledge.',
                                    1000,
                                    'Where Research Feeds Rapid Scale.',
                                    1000,
                                    'Where AI driven speed & disruption.',
                                    1000,
                                ]}
                                wrapper="p"
                                speed={80}
                                style={{ fontSize: '2em', display: 'inline-block' }}
                                repeat={Infinity}
                            />

                        </div>
                    </div>
                </div>
            </section>

        </>

    );
}
