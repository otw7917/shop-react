import { ReactNode } from "react";

type ObjectFit =
  | "object-contain"
  | "object-cover"
  | "object-fill"
  | "object-none"
  | "object-scale-down";

interface BannerProps {
  IMAGE: BannerImage;
  objectFit: ObjectFit;
}
interface BannerImage {
  name: string;
  filePath: string;
  title: string;
  description: string;
}

function Banner({ IMAGE, objectFit }: BannerProps) {
  const { name, filePath, title, description } = IMAGE;

  return (
    <BannerLayout>
      <BannerImage filePath={filePath} name={name} objectFit={objectFit} />
      <BannerInfo>
        <BannerInfo.Title>{title}</BannerInfo.Title>
        <BannerInfo.Description>{description}</BannerInfo.Description>
      </BannerInfo>
    </BannerLayout>
  );
}

const BannerLayout = ({ children }: { children: ReactNode }) => {
  return <div className='relative h-full'>{children}</div>;
};

const BannerImage = ({
  filePath,
  name,
  objectFit,
}: {
  filePath: string;
  name: string;
  objectFit: string;
}) => {
  return (
    <img
      src={filePath}
      alt={name}
      className={`h-full w-full ${objectFit} opacity-70`}
    />
  );
};

interface BannerInfoProps {
  children?: ReactNode;
}

const BannerInfo = ({ children }: BannerInfoProps) => {
  return (
    <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center'>
      {children}
    </div>
  );
};

const Title = ({ children }: BannerInfoProps) => {
  return (
    <div>
      <h1 className='text-4xl'>{children}</h1>
    </div>
  );
};

const Description = ({ children }: BannerInfoProps) => {
  return <span>{children}</span>;
};

BannerInfo.Title = Title;
BannerInfo.Description = Description;

export default Banner;
