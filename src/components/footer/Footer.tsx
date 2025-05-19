import FooterBackground from "./FooterBackground";
import FooterContent from "./FooterContent";

const Footer = () => {
  return (
    <footer className="z-10 h-[60vh] w-full">
      <FooterContent />
      <section aria-hidden="true" className="relative h-full">
        <FooterBackground />
      </section>
    </footer>
  );
};

export default Footer;
