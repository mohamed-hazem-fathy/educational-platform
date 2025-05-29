import { Button } from "./ui/button";
import  SearchInput  from "./SearchInput";
import Link from 'next/link';
import { DarkModeToggle } from "./DarkModeToggle";
import { BookMarkedIcon, BookOpen } from "lucide-react";
import { SignedIn, SignedOut, UserButton, SignInButton } from "@clerk/nextjs";
function Header() {
  return (
    <header className="sticky top-0 z-50 bg-background/80 px-4 backdrop-blur-sm brder-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Left*/}
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center space-x-2 hover:opacity-90 trabsition-opacity">
            <BookOpen className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold bg-gradient-to-r form-primary-90 to-primarybg-clip-text">Learnify</span>
            </Link>
            <SearchInput />
          </div>
          {/* Right*/}
          <div className="flex items-center space-x-2 md:space-x-4">
            <nav>
              <SignedIn>
              <Link prefetch={false} href="/my-courses" className="flex space-x-2 items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors md:border md:border-border md:rounded-md md:px-4 md:py-2">
              <BookMarkedIcon className="h-6 w-6" />
              <span className="hidden md:block">My Courses</span>
              </Link>
              </SignedIn>
            </nav>
                   <DarkModeToggle />

                   <SignedIn>
                    <UserButton />
                   </SignedIn>

                   <SignedOut>
                    <SignInButton mode="modal">
                      <Button variant="outline">
                        Sign In
                      </Button>
                    </SignInButton>
                   </SignedOut>
          </div>
        </div>

       </div>
    </header>
  )
}

export default Header;
