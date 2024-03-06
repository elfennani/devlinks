type Props = {};

const Preview = (_props: Props) => {
  return (
    <div className="w-72 max-w-full max-h-full">
      <div className="relative z-20 pt-[205%] h-0 overflow-hidden rounded">
        <img
          className="absolute -z-10 top-0 left-0 right-0 bottom-0"
          src="/images/preview-section.svg"
        />
        <div className="absolute px-8 py-16 top-0 left-0 right-0 bottom-0 flex flex-col items-stretch justify-between">
          <div className="flex flex-col gap-6 items-center">
            <div className="size-24 rounded-full bg-neutral-100" />
            <div className="flex flex-col gap-3 w-full items-center">
              <div className="w-9/12 h-4 rounded-full bg-neutral-100" />
              <div className="w-2/5 h-2 rounded-full bg-neutral-100" />
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="h-10 w-full bg-neutral-100 rounded-lg" />
            <div className="h-10 w-full bg-neutral-100 rounded-lg" />
            <div className="h-10 w-full bg-neutral-100 rounded-lg" />
            <div className="h-10 w-full bg-neutral-100 rounded-lg" />
            <div className="h-10 w-full bg-neutral-100 rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preview;
