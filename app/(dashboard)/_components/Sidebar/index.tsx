import NewButton from "./NewButton";
import OrganizationList from "./OrganizationList";

function Sidebar() {
  return (
    <aside className="fixed z-[1] lef-o bg-blue-950 h-full w-[60px] flex p-3 flex-col gap-y-4 text-white">
      <OrganizationList />
      <NewButton />
    </aside>
  );
}

export default Sidebar;
