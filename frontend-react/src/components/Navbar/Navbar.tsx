import React from "react";
import { Button } from "@/components/ui/button";
import { Crown, User, LogOut, Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import MainTicker from "../Ticker/MainTicker";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { Users } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { useDispatch } from "react-redux";
import { logout } from "@/store/auth/authSlice";
import { AppDispatch } from "@/store/store";
import { useNavigate } from "react-router-dom";
import UserAvatar from "@/components/UserAvatar/UserAvatar";
import fintechforgeLogo from "../../assets/fintechforge-logo.png";

import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";



const Navbar: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const user = useSelector((state: RootState) => state.auth.user);
  const navigate = useNavigate();

  // Extract user name for the dropdown
  const getUserName = () => {
    if (!user) return "Unknown User";

    if (user.name) return user.name;

    if (typeof user === "string") return user;

    if (typeof user === "object") return Object.values(user).join("");

    return "Unknown User";
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <nav className="bg-white shadow-md w-full">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img src={fintechforgeLogo} alt="fintechForgeLogo" className="h-10 w-auto" />

          </div>

          {/* Navigation links - hidden on mobile, visible on md+ screens */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              to="/"
              className="text-gray-600 hover:text-gray-800 hover:font-bold hover:shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out"
            >
              Home
            </Link>
            <Link
              to="/dashboard"
              className="text-gray-600 hover:text-gray-800 hover:font-bold hover:shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out"
            >
              Dashboard
            </Link>
            <Link
              to="/About"
              className="text-gray-600 hover:text-gray-800 hover:font-bold hover:shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out"
            >
              About
            </Link>
            <Link
              to="/Premium"
              className="text-gray-600 hover:text-gray-800 flex items-center hover:font-bold hover:shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out"
            >
              Premium
              <Crown className="ml-1 h-4 w-4 text-yellow-500" />
            </Link>
            <Link
              to="/Pricing"
              className="text-gray-600 hover:text-gray-800 flex items-center"
            >
              Pricing
            </Link>

            <Link 
             to="/Community"
            >
                <Users className="w-7 h-7 border-2 border-gray-500 rounded p-1  hover:bg-gray-200"/>
            </Link>
          </div>

          {/* Auth buttons (when not logged in) - hidden on mobile, visible on md+ screens */}
          {!isLoggedIn && (
            <div className="hidden md:flex items-center space-x-2">
              <Link to="/login">
                <Button variant="outline">Log In</Button>
              </Link>
              <Link to="/signup">
                <Button>Sign Up</Button>
              </Link>
            </div>
          )}

          {isLoggedIn && (<div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-sm mt-2 sm:mt-0">
            <div className="ml-auto flex-1 sm:flex-initial">
              <div className="flex gap-3 relative">
                <span className="font-bold">Logined as: {getUserName()}</span>
              </div>
            </div>
          </div>)}

          {/* This is the missing part where the SheetContent needs to close */}
          {/* Mobile menu (hamburger icon) and user dropdown */}
          <div className="md:hidden flex items-center"> {/* This div was orphaned; grouping the mobile elements here */}
            {/* Hamburger menu for mobile (when not logged in, or if user is logged in, show it for additional nav) */}
            {!isLoggedIn && ( // Only show hamburger when not logged in
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <div className="flex flex-col space-y-4">
                  <Link to="/" className="text-gray-600 hover:text-gray-800">Home</Link>
                  <Link to="/Features" className="text-gray-600 hover:text-gray-800">Features</Link>
                  <Link to="/About" className="text-gray-600 hover:text-gray-800">About</Link>
                  <Link to="/Premium" className="text-gray-600 hover:text-gray-800 flex items-center">
                    Premium <Crown className="ml-1 h-4 w-4 text-yellow-500" />
                  </Link>
                  <Link to="/Pricing" className="text-gray-600 hover:text-gray-800 flex items-center">
                    Pricing
                  </Link>
                  <Link to="/Login"><Button variant="outline">Log In</Button></Link>
                  <Link to="/SignUp"><Button>Sign Up</Button></Link>
                </div>
              </SheetContent>
            </Sheet>
            )}

            {/* User avatar dropdown for logged-in users (mobile and desktop) */}
            {isLoggedIn && user && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div role="button" className="focus:outline-none cursor-pointer">
                    <UserAvatar />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-64 p-4 mt-2">
                  {/* User info section */}
                  <div className="pb-3 mb-2 border-b border-gray-100">
                    <div className="font-semibold text-gray-800">{getUserName()}</div>
                    <div className="text-sm text-gray-400">Active now</div>
                  </div>

                  {/* Menu items - shown on all screen sizes */}
                  <DropdownMenuItem
                    onClick={() => navigate("/profile")}
                    className="cursor-pointer py-2 my-1 flex items-center"
                  >
                    <User className="mr-2 h-4 w-4 text-blue-500" /> Profile
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    onClick={() => navigate("/dashboard")}
                    className="cursor-pointer py-2 my-1 flex items-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="mr-2 h-4 w-4 text-blue-500"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="3" y="3" width="7" height="7"></rect>
                      <rect x="14" y="3" width="7" height="7"></rect>
                      <rect x="14" y="14" width="7" height="7"></rect>
                      <rect x="3" y="14" width="7" height="7"></rect>
                    </svg> Dashboard
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    onClick={() => {
                      dispatch(logout());
                      navigate("/login");
                    }}
                    className="cursor-pointer py-2 my-1 text-red-600 flex items-center"
                  >
                    <LogOut className="mr-2 h-4 w-4" /> Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            {/* When not logged in - show dropdown menu on mobile instead of hamburger - This seems like a duplicate of the above logic and potentially redundant */}
            {/* I'm commenting this out, you might want to review if this section is needed or if the above `Sheet` handles mobile login/signup */}
            {/*
            {!isLoggedIn && (
              <div className="md:hidden">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon" className="h-9 w-9 rounded-full bg-blue-500 text-white flex items-center justify-center">
                      <span className="font-semibold text-lg">?</span>
                    </Button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent className="w-60 p-4 mt-2">
                    <DropdownMenuItem
                      onClick={() => navigate("/profile")}
                      className="cursor-pointer py-2 my-1"
                    >
                      <User className="mr-2 h-4 w-4 text-blue-500" /> Profile
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      onClick={() => navigate("/dashboard")}
                      className="cursor-pointer py-2 my-1"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="mr-2 h-4 w-4 text-blue-500"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect x="3" y="3" width="7" height="7"></rect>
                        <rect x="14" y="3" width="7" height="7"></rect>
                        <rect x="14" y="14" width="7" height="7"></rect>
                        <rect x="3" y="14" width="7" height="7"></rect>
                      </svg> Dashboard
                    </DropdownMenuItem>

                    <div className="pt-3 mt-2 border-t border-gray-100 flex flex-col gap-2">
                      <Button variant="outline" onClick={() => navigate("/login")} className="w-full justify-center">
                        Log In
                      </Button>
                      <Button onClick={() => navigate("/signup")} className="w-full justify-center">
                        Sign Up
                      </Button>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}
            */}
          </div> {/* End of flex items-center div for mobile components */}

                          
                          <span className="font-semibold text-lg">?</span>
                        </Button>
                      </DropdownMenuTrigger>

                      <DropdownMenuContent className="w-60 p-4 mt-2">
                        <DropdownMenuItem
                          onClick={() => navigate("/profile")}
                          className="cursor-pointer py-2 my-1"
                        >
                          <User className="mr-2 h-4 w-4 text-blue-500" />{" "}
                          Profile
                        </DropdownMenuItem>

                        <DropdownMenuItem
                          onClick={() => navigate("/dashboard")}
                          className="cursor-pointer py-2 my-1"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="mr-2 h-4 w-4 text-blue-500"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <rect x="3" y="3" width="7" height="7"></rect>
                            <rect x="14" y="3" width="7" height="7"></rect>
                            <rect x="14" y="14" width="7" height="7"></rect>
                            <rect x="3" y="14" width="7" height="7"></rect>
                          </svg>{" "}
                          Dashboard
                        </DropdownMenuItem>

                        <div className="pt-3 mt-2 border-t border-gray-100 flex flex-col gap-2">
                          <Button
                            variant="outline"
                            onClick={() => navigate("/login")}
                            className="w-full justify-center"
                          >
                            Log In
                          </Button>
                          <Button
                            onClick={() => navigate("/signup")}
                            className="w-full justify-center"
                          >
                            Sign Up
                          </Button>
                        </div>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>

        </div>
        </div>
      </nav>
      <MainTicker>
      </MainTicker>
    </div>
  );
};

export default Navbar;
