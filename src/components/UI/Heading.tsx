type Props = {
  title: string;
  subtitle?: string;
};

const Heading = ({ title, subtitle }: Props) => {
  return (
    <header className="flex flex-col gap-2">
      <h1 className="text-heading-m max-md:text-2xl">{title}</h1>
      {!!subtitle && (
        <p className="text-graphite-bold text-base-m">{subtitle}</p>
      )}
    </header>
  );
};

export default Heading;
