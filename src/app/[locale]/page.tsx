import Hero from '@/components/Hero';
import ServiceCards from '@/components/ServiceCards';
import FeatureSection from '@/components/FeatureSection';
import Services from '@/components/Services';

export default function Home() {
    return (
        <>
            <section id="home">
                <Hero />
            </section>
            <ServiceCards />
            <FeatureSection />
            <section id="services">
                <Services />
            </section>
            <section id="contact">
                {/* Contact section will go here */}
            </section>
        </>
    );
}
