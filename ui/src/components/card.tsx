import { LucideIcon } from "lucide-react";

interface CardProps {
  title: string;
  data: string;
  icon?: LucideIcon;
}

const Card = ({ title, data, icon: Icon }: CardProps) => {
  return (
    <div className="p-10 bg-[#131417] rounded-lg max-w-md">
      <div className="flex flex-col gap-2">
        <div className="flex flex-row items-center gap-2 text-white">
          {Icon && <Icon />}
          <h1 className="text-white/60 font-semibold text-lg">{title}</h1>
        </div>

        <h1 className="text-4xl text-white font-bold">{data}</h1>
      </div>
    </div>
  );
};

export default Card;
