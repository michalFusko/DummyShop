interface AboutSectionProps {
  title: string;
  p1: string;
  p2?: string;
}

const AboutSection = ({ title, p1, p2 }: AboutSectionProps) => {
  return (
    <section>
      <h1 className="pl-2 text-xl font-medium xl:text-2xl">{title}</h1>
      <ul className="flex flex-col gap-2 p-5 text-sm text-black/70 lg:text-base xl:text-lg">
        <li>
          <p>{p1}</p>
        </li>
        <li>
          <p>{p2}</p>
        </li>
      </ul>
    </section>
  );
};

export default AboutSection;
