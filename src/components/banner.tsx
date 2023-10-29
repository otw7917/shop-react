import { ReactNode } from "react";

type ObjectFit =
  | "object-contain"
  | "object-cover"
  | "object-fill"
  | "object-none"
  | "object-scale-down";

interface BannerImage {
  name: string;
  filePath: string;
  title: string;
  description: string;
}

interface BannerProps {
  IMAGE: BannerImage;
  objectFit: ObjectFit;
}

function Banner({ IMAGE, objectFit }: BannerProps) {
  const { filePath, name, title, description } = IMAGE;

  return (
    <div className='relative h-full'>
      <img
        src={filePath}
        alt={name}
        className={`h-full w-full ${objectFit} opacity-70`}
      />
      <BannerTitle>
        <BannerTitle.Title>{title}</BannerTitle.Title>
        <BannerTitle.Description>{description}</BannerTitle.Description>
      </BannerTitle>
    </div>
  );
}

interface BannerTitleProps {
  children?: ReactNode;
}

const BannerTitle = ({ children }: BannerTitleProps) => {
  return (
    <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center'>
      {children}
    </div>
  );
};

const Title = ({ children }: BannerTitleProps) => {
  return (
    <div>
      <h1 className='text-4xl'>{children}</h1>
    </div>
  );
};

const Description = ({ children }: BannerTitleProps) => {
  return <span>{children}</span>;
};

BannerTitle.Title = Title;
BannerTitle.Description = Description;

export default Banner;
