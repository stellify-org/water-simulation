import { DrawerComponent } from "./drawer.component";

export const NavbarComponent = () => {
  return (
    <nav className="w-full fixed px-10 py-6 flex justify-between items-center bg-[#000011] backdrop-blur-xl shadow-md">
      <h1 className="font-bold text-[24px] text-white">Water Simulation</h1>
      <div className="">
        <DrawerComponent />
      </div>
    </nav>
  );
};
