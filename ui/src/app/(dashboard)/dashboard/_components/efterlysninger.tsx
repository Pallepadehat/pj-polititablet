import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

const Efterlysninger = () => {
  const dummy = [
    { label: "Test Citizen", reason: "some reason" },
    { label: "Test Citizen", reason: "some reason" },
    { label: "Test Citizen", reason: "some reason" },
    { label: "Test Citizen", reason: "some reason" },
    { label: "Test Citizen", reason: "some reason" },
    { label: "Test Citizen", reason: "some reason" },
    { label: "Test Citizen", reason: "some reason" },
    { label: "Test Citizen", reason: "some reason" },
    { label: "Test Citizen", reason: "some reason" },
    { label: "Test Citizen", reason: "some reason" },
    { label: "Test Citizen", reason: "some reason" },
    { label: "Test Citizen", reason: "some reason" },
    { label: "Test Citizen", reason: "some reason" },
    { label: "Test Citizen", reason: "some reason" },
    { label: "Test Citizen", reason: "some reason" },
  ];

  return (
    <div>
      <h1 className="text-white font-bold text-2xl p-2">Efterlysninger</h1>
      <div className="flex flex-col gap-5">
        <div className="w-full h-[650px]">
          <ScrollArea className="w-full h-full">
            {dummy.map((item, idx) => (
              <div
                key={idx}
                className="border-b border-[#202022] p-2 pb-5 flex justify-between items-center"
              >
                <div className="flex flex-col">
                  <h1 className="text-lg font-semibold text-white">
                    {item.label}
                  </h1>
                  <p className="text-md text-white/50">{item.reason}</p>
                </div>
                <Button
                  variant="ghost"
                  className="text-white text-lg hover:text-blue-500 hover:bg-transparent"
                >
                  Gå til person
                </Button>
              </div>
            ))}
          </ScrollArea>
          <p className="text-center mt-3 text-white/50">
            Seneste efterlysninger
          </p>
        </div>
      </div>
    </div>
  );
};

export default Efterlysninger;
