import { AlertOctagon, Info } from "lucide-react";

export const AnsatteOverviewScreen = () => {
  return (
    <div className="w-full h-full">
      <div className="p-10">
        <h1 className="text-4xl font-semibold text-white">Ansatte</h1>
      </div>
      <div className="pt-5 px-10 text-white">
        <div className="grid grid-cols-3 gap-5"></div>
      </div>
      <div className="grid grid-cols-2 px-10 w-full h-[120px] gap-2 mt-10"></div>
    </div>
  );
};
