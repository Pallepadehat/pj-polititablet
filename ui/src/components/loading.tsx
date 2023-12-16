import { Loader2 } from "lucide-react";
const Loading = () => {
  return (
    <div className="flex items-center justify-center ">
      <div className="flex flex-col gap-2 items-center">
        <Loader2 className="w-10 h-10 text-white animate-spin" />
        <p className="text-lg font-medium leading-6 text-white">
          Loader registeret og bruger
        </p>
      </div>
    </div>
  );
};

export default Loading;
