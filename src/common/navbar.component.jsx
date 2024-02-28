import { DrawerComponent } from "./drawer.component";

export const NavbarComponent = () => {
  return (
    <nav className="bg-slate-900 w-full backdrop-blur-sm bg-white/10  fixed px-10 py-4 flex justify-between items-center shadow-md">
      <div className="relative ">
        <h1 className="font-bold text-[24px] text-white">Water Simulation</h1>
        {/*<div className="flex absolute top-6">*/}
        {/*  <p className=" text-white">Powered by</p>*/}
        {/*  <a*/}
        {/*    className="ml-1 text-white font-bold "*/}
        {/*    href="https://tokumeidev.vercel.app"*/}
        {/*  >*/}
        {/*    Tokumeidev*/}
        {/*  </a>*/}
        {/*</div>*/}
      </div>
      <DrawerComponent />
    </nav>
  );
};
