import { DrawerComponent } from "./drawer.component";

export const NavbarComponent = () => {
  return (
    <nav className="backdrop-blur-sm bg-white/10 w-full fixed px-10 py-4 flex justify-between items-center shadow-md">
      <h1 className="font-bold text-[24px] text-white">Water Simulation</h1>
      <DrawerComponent />
    </nav>
  );
};
