import { Outlet } from "react-router";

const CustomerServices = () => {
  return (
    <section
      aria-label="Customer services page"
      className="flex w-full items-center justify-center bg-white py-20 text-black md:mt-[7vh]"
    >
      <div className="w-7/8 md:w-4/5 lg:w-2/3 2xl:w-1/2">
        {/* renders children via app.tsx */}
        <Outlet />
      </div>
    </section>
  );
};

export default CustomerServices;
