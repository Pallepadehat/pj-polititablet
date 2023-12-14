import DashboardNavbar from "./_components/navbar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen">
      <div className="flex flex-col flex-1 overflow-hidden">
        <div>
          <DashboardNavbar />
        </div>

        <div className="flex-1 overflow-x-hidden overflow-y-auto p-20 items-center justify-center w-full h-full">
          <div className="w-full h-full bg-[#1B1C1F] rounded-xl p-5">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
