import { ArrowLeft, Bell, Menu, Mic, Search, Upload, User } from "lucide-react";
import logo from "../assets/Logo.png";
import Button from "../assets/components/Button";
import { useState } from "react";
import { useSidebarContext } from "../context/SidebarProvider";

export default function PageHeader() {

  const [showFullWidthSearch, setShowFullWidthSearch] = useState(false);
  return (
    <div className="flex gap-10 lg:gap-20 justify-between pt-2 mx-4 mb-6">
      <PageHeaderSection hidden={showFullWidthSearch} />

      <form
        className={`gap-4 flex-grow justify-center items-center flex-shrink-0 ${
          showFullWidthSearch ? "flex" : "hidden md:flex"
        }`}
      >
        {showFullWidthSearch && (
          <Button
            variant="ghost"
            size="icon"
            type="button"
            onClick={() => setShowFullWidthSearch(false)}
          >
            <ArrowLeft />
          </Button>
        )}
        <div className="flex flex-grow max-w-[600px]">
          <input
            type="search"
            placeholder="Search"
            className="rounded-l-full w-full text-lg border border-secondary-border py-1 px-4 shadow-inner shadow-secondary outline-none focus:border-blue-500"
          />
          <Button
            type="button"
            className="rounded-r-full py-2 px-4 border border-secondary-border border-l-0 flex-shrink-0"
          >
            <Search />
          </Button>
        </div>
        <Button size="icon" type="button">
          <Mic />
        </Button>
      </form>
      <div
        className={`flex-shrink-0 md:gap-2 ${
          showFullWidthSearch ? "hidden" : "flex"
        }`}
      >
        <Button
          size="icon"
          onClick={() => setShowFullWidthSearch(true)}
          variant="ghost"
          className="md:hidden"
        >
          <Search />
        </Button>
        <Button size="icon" variant="ghost" className="md:hidden">
          <Mic />
        </Button>
        <Button size="icon" variant="ghost">
          <Upload />
        </Button>
        <Button size="icon" variant="ghost">
          <Bell />
        </Button>
        <Button size="icon" variant="ghost">
          <User />
        </Button>
      </div>
    </div>
  );
}

type PageHeaderSectionProps = {
  hidden?: boolean;
}
 
export function PageHeaderSection({hidden = false}: PageHeaderSectionProps ){
  const {toggle} = useSidebarContext();
  return (
    <div
        className={`gap-4 items-center flex-shrink-0 ${
          hidden ? "hidden" : "flex"
        }`}
      >
        <Button variant="ghost" onClick={toggle} size="icon">
          <Menu />
        </Button>
        <a href="/">
          <img src={logo} className="h-6" />
        </a>
      </div>
  )
}
