import { Clapperboard, Home, Library, Repeat } from "lucide-react";
import { ElementType } from "react";
import { buttonStyles } from "../assets/components/Button";
import { twMerge } from "tailwind-merge";

export default function Sidebar() {
  return (
    <aside className="flex flex-col sticky top-0 pb-4 ml-1 overflow-y-auto scrollbar-hidden lg:hidden">
      <SmallSideBarItem Icon={Home} title="Home" url="/" />
      <SmallSideBarItem Icon={Repeat} title="Shorts" url="/shorts" />
      <SmallSideBarItem Icon={Clapperboard} title="Subscriptions" url="/subscriptions" />
      <SmallSideBarItem Icon={Library} title="Library" url="/library" />

    </aside>
  );
}

type SmallSideBarItemProps = {
    Icon: ElementType,
    title: string,
    url: string,
}

function SmallSideBarItem({Icon, title, url}: SmallSideBarItemProps){
    return <a href={url} className={twMerge(buttonStyles({variant: "ghost"}), "py-4 px-1 flex flex-col items-center rounded-lg gap-1")}>
        <Icon className="w-5 h-5" />
        <div className="text-[12px]">{title}</div>
    </a>
}
