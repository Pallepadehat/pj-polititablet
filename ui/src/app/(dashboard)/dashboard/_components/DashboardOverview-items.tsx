import { Info, LucideIcon } from "lucide-react";

interface DashboardOverviewItemProps {
  title: string;
  value: number | string;
  icon?: LucideIcon;
}

const DashboardOverviewItem = ({
  title,
  value,
  icon: Icon,
}: DashboardOverviewItemProps) => {
  return (
    <div className="px-4 py-7 bg-[#2C2C2E] w-full rounded-[14px] flex flex-col gap-2 items-center">
      <div className="flex flex-col gap-2 items-center">
        <div className="flex flex-row text-[#EBEBF5]/60 items-center">
          <div className="w-10 h-10 rounded-[7px] flex items-center justify-center ">
            {Icon && <Icon />}
          </div>
          <h1 className="text-md">{title}</h1>
        </div>
      </div>
      <p className="text-5xl text-white font-semibold">{value}</p>
    </div>
  );
};

export default DashboardOverviewItem;
