import { cn } from "~/lib/utils";
import {
  CalendarDays,
  ChromeIcon,
  CloudCog, Cog,
  ListChecksIcon,
  Mail,
  ShoppingBag,
} from "lucide-react";
import {useEffect, useState} from "react";
import Cookies from "js-cookie";

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  useEffect(() => {
    const perm = Cookies.get("X-Perm");
    setIsAdmin(!!(perm?.split(";").includes("admin")))
  }, [])
  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      <a href="/" className="relative z-20 flex items-center text-lg font-medium dark:text-white text-black">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2 h-6 w-6"
        >
          <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
        </svg>
        Reach
      </a>
      <a
        href="/kanban"
        className="text-sm flex items-center font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        <ListChecksIcon className="w-4 h-4 mr-2" />
        Kanban
      </a>
      <a
        href="/storage"
        className="text-sm flex items-center font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        <CloudCog className="w-4 h-4 mr-2" />
        Storage
      </a>
      <a
        href="/page"
        className="text-sm flex items-center font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        <ChromeIcon className="w-4 h-4 mr-2" />
        Page
      </a>
      <a
        href="/mail"
        className="text-sm flex items-center font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        <Mail className="w-4 h-4 mr-2" />
        Mail
      </a>
      <a
        href="/calendar"
        className="text-sm flex items-center font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        <CalendarDays className="w-4 h-4 mr-2" />
        Calendar
      </a>
      <a
        href="/store"
        className="text-sm flex items-center font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        <ShoppingBag className="w-4 h-4 mr-2" />
        Store
      </a>
      {isAdmin && (<a
          href="/store"
          className="text-sm flex items-center font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        <Cog className="w-4 h-4 mr-2"/>
        Manage Account
      </a>)}
    </nav>
  );
}
