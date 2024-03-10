import {
  ChevronDown,
  ChevronUp,
  Clapperboard,
  Clock,
  Film,
  Flame,
  Gamepad2,
  History,
  Home,
  Library,
  Music2,
  Newspaper,
  PlaySquare,
  Podcast,
  Radio,
  Repeat,
  Shirt,
  ShoppingBag,
  Trophy,
} from "lucide-react";
import React, { Children, ElementType, ReactNode, useState } from "react";
import Button, { buttonStyles } from "../assets/components/Button";
import { twMerge } from "tailwind-merge";
import { playlists, subscriptions } from "../data/sidebar";

export default function Sidebar() {
  return (
    <>
      <aside className="flex flex-col sticky top-0 pb-4 ml-1 overflow-y-auto scrollbar-hidden lg:hidden">
        <SmallSideBarItem Icon={Home} title="Home" url="/" />
        <SmallSideBarItem Icon={Repeat} title="Shorts" url="/shorts" />
        <SmallSideBarItem
          Icon={Clapperboard}
          title="Subscriptions"
          url="/subscriptions"
        />
        <SmallSideBarItem Icon={Library} title="Library" url="/library" />
      </aside>

      <aside className="w-56 hidden lg:sticky absolute top-0 overflow-y-auto scrollbar-hidden pb-4 px-2 lg:flex flex-col gap-2">
        <LargeSideBarSection>
          <LargeSideBarItem
            IconOrImgUrl={Home}
            isActive={true}
            title="Home"
            url="/"
          />
          <LargeSideBarItem
            IconOrImgUrl={Clapperboard}
            title="Subscription"
            url="/"
          />
        </LargeSideBarSection>
        <hr />

        <LargeSideBarSection visibleItemCount={5}>
          <LargeSideBarItem
            IconOrImgUrl={Library}
            title="Library"
            url="/library"
          />
          <LargeSideBarItem
            IconOrImgUrl={History}
            title="History"
            url="/history"
          />
          <LargeSideBarItem
            IconOrImgUrl={PlaySquare}
            title="Your Vidoes"
            url="/your-videos"
          />
          <LargeSideBarItem
            IconOrImgUrl={Clock}
            title="Watch Later"
            url="/playlist?list=WL"
          />

          {playlists.map((playlist) => (
            <LargeSideBarItem
              key={playlist.id}
              IconOrImgUrl={Clock}
              title={playlist.name}
              url={`playlist?list=${playlist.id}`}
            />
          ))}
        </LargeSideBarSection>
        <hr />

        <LargeSideBarSection title="Subscription">
          {subscriptions.map((sub) => (
            <LargeSideBarItem
              key={sub.id}
              IconOrImgUrl={sub.imgUrl}
              title={sub.channelName}
              url={`/@${sub.id}`}
            />
          ))}
        </LargeSideBarSection>
        <hr />

        <LargeSideBarSection title="Explore">
          <LargeSideBarItem IconOrImgUrl={Flame} title="Trending" url="/trending" />
          <LargeSideBarItem IconOrImgUrl={ShoppingBag} title="Shopping" url="/shopping" />
          <LargeSideBarItem IconOrImgUrl={Music2} title="Music" url="/music" />
          <LargeSideBarItem IconOrImgUrl={Film} title="Movies & TV" url="/movies-tv" />
          <LargeSideBarItem IconOrImgUrl={Radio} title="LIve" url="/live" />
          <LargeSideBarItem IconOrImgUrl={Gamepad2} title="Gaming" url="/gaming" />
          <LargeSideBarItem IconOrImgUrl={Newspaper} title="News" url="/news" />
          <LargeSideBarItem IconOrImgUrl={Trophy} title="Learning" url="/learning" />
          <LargeSideBarItem IconOrImgUrl={Shirt} title="Fashion & Beauty" url="/fashion-beauty" />
          <LargeSideBarItem IconOrImgUrl={Podcast} title="Podcasts" url="/podcasts" />
        </LargeSideBarSection>
      </aside>
    </>
  );
}

type LargeSideBarSectionProps = {
  children: ReactNode;
  title?: string;
  visibleItemCount?: number;
};

function LargeSideBarSection({
  children,
  title,
  visibleItemCount = Number.POSITIVE_INFINITY,
}: LargeSideBarSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const childrenArray = Children.toArray(children).flat();
  const showExpandButton = childrenArray.length > visibleItemCount;
  const visibleChildren = isExpanded
    ? childrenArray
    : childrenArray.slice(0, visibleItemCount);
  const ButtonIcon = !isExpanded ? ChevronDown : ChevronUp;

  return (
    <div>
      {title && <div className="ml-4 mt-2 text-lg mb-1">{title}</div>}
      {visibleChildren}
      {showExpandButton && (
        <Button
          onClick={() => setIsExpanded((isExpanded) => !isExpanded)}
          variant="ghost"
          className="w-full flex items-center rounded-lg gap-4 p-3"
        >
          <ButtonIcon className="w-6 h-6" />{" "}
          <div>{!isExpanded ? "Show more" : "Show less"}</div>
        </Button>
      )}
    </div>
  );
}

type SmallSideBarItemProps = {
  Icon: ElementType;
  title: string;
  url: string;
};

function SmallSideBarItem({ Icon, title, url }: SmallSideBarItemProps) {
  return (
    <a
      href={url}
      className={twMerge(
        buttonStyles({ variant: "ghost" }),
        "py-4 px-1 flex flex-col items-center rounded-lg gap-1"
      )}
    >
      <Icon className="w-5 h-5" />
      <div className="text-[12px]">{title}</div>
    </a>
  );
}

type LargeSideBarItemProps = {
  IconOrImgUrl: ElementType | string;
  title: string;
  url: string;
  isActive?: boolean;
};

function LargeSideBarItem({
  IconOrImgUrl,
  title,
  url,
  isActive = false,
}: LargeSideBarItemProps) {
  return (
    <a
      href={url}
      className={twMerge(
        buttonStyles({ variant: "ghost" }),
        `w-full flex items-center rounded-lg gap-4 p-3 ${
          isActive
            ? "font-semibold bg-neutral-100 hover:bg-secondary"
            : undefined
        }`
      )}
    >
      {typeof IconOrImgUrl === "string" ? (
        <img src={IconOrImgUrl} className="w-6 h-6 rounded-full" />
      ) : (
        <IconOrImgUrl className="w-6 h-6" />
      )}
      <div className="whitespace-nowrap overflow-hidden text-ellipsis">
        {title}
      </div>
    </a>
  );
}
