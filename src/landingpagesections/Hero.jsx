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
                <div className="py-5 herobg" >
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
                                        value: "#ffffff"
                                    },
                                    links: {
                                        color: "#ffffff",
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
                                    ISO <span className="herosecond">PIPELINE</span>
                                </h1>


                            </div>
                            <TypeAnimation
                                sequence={[

                                    'Create stunning graphics with ease and precision.',
                                    1000,
                                    'Transform your ideas into reality with ISO Pipelines. ',
                                    1000,
                                    'Customize every detail to fit your unique needs.',
                                    1000,
                                    'The ultimate tool for designing your workflow.',
                                    1000
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
