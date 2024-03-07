import { Bell, Menu, Upload, User } from "lucide-react";
import logo from "../assets/Logo.png";
import Button from "../assets/components/Button";

export default function PageHeader() {
  return (
    <div className="flex gap-10 lg:gap-20 justify-between pt-2 mx-4 mb-6">
      <div className="flex gap-4 items-center flex-shrink-0">
        <Button variant="ghost" size="icon">
          <Menu />
        </Button>
        <a href="/">
        <img src={logo} className="h-6" />
        </a>
      </div>
      <div></div>
      <div className="flex flex-shrink-0 md:gap-2">
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
