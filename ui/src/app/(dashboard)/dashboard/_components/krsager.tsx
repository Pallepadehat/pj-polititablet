import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

const KrSager = () => {
  const dummy = [
    {
      sagsnr: "#10101",
      person: "Test Citizen",
      bøde: "20000 DKK",
      fængsel: "10 måneder",
      ansvarlig: "Test User",
      dato: "28-06-2023 13:44",
    },
    {
      sagsnr: "#10101",
      person: "Test Citizen",
      bøde: "20000 DKK",
      fængsel: "10 måneder",
      ansvarlig: "Test User",
      dato: "28-06-2023 13:44",
    },
    {
      sagsnr: "#10101",
      person: "Test Citizen",
      bøde: "20000 DKK",
      fængsel: "10 måneder",
      ansvarlig: "Test User",
      dato: "28-06-2023 13:44",
    },
    {
      sagsnr: "#10101",
      person: "Test Citizen",
      bøde: "20000 DKK",
      fængsel: "10 måneder",
      ansvarlig: "Test User",
      dato: "28-06-2023 13:44",
    },
    {
      sagsnr: "#10101",
      person: "Test Citizen",
      bøde: "20000 DKK",
      fængsel: "10 måneder",
      ansvarlig: "Test User",
      dato: "28-06-2023 13:44",
    },
    {
      sagsnr: "#10101",
      person: "Test Citizen",
      bøde: "20000 DKK",
      fængsel: "10 måneder",
      ansvarlig: "Test User",
      dato: "28-06-2023 13:44",
    },
    {
      sagsnr: "#10101",
      person: "Test Citizen",
      bøde: "20000 DKK",
      fængsel: "10 måneder",
      ansvarlig: "Test User",
      dato: "28-06-2023 13:44",
    },
  ];

  return (
    <div>
      <h1 className="text-white font-bold text-2xl p-2">Seneste sager i KR</h1>
      <div className="flex flex-col gap-5">
        <div className="w-full h-[650px]">
          <ScrollArea className="w-full h-full">
            <div className="flex flex-row justify-between">
              <div className="flex flex-row gap-5">
                <h1 className="Text-md font-bold text-white/40">Sags Nr.</h1>
                <h1 className="Text-md font-bold text-white/40">Person</h1>
                <h1 className="Text-md font-bold text-white/40">Bøde.</h1>
                <h1 className="Text-md font-bold text-white/40">Fængsel</h1>
                <h1 className="Text-md font-bold text-white/40">Ansvarlig</h1>
              </div>
              <div className="flex flex-col gap-2">
                <h1 className="Text-md font-bold text-white/40">Dato</h1>
              </div>
            </div>

            {dummy.map((item, idx) => (
              <div
                key={idx}
                className="border-b border-[#202022] pt-5 pb-5 flex items-center justify-between"
              >
                <div className="flex flex-row justify-between">
                  <div className="flex flex-row gap-5 text-white/70">
                    <p className="text-white">{item.sagsnr}</p>
                    <p>{item.person}</p>
                    <p>{item.bøde}</p>
                    <p>{item.fængsel}</p>
                    <p>{item.ansvarlig}</p>
                  </div>
                  <div>
                    <p className="text-white/70">{item.dato}</p>
                  </div>
                </div>
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

export default KrSager;
