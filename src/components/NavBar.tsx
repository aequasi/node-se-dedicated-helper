import React from "react";
import Link from "next/link";

export default function NavBar() {
    return (
        <nav className="bg-gray-800">
            <div className="max-w-7xl mx-auto px-8">
                <div className="relative flex items-center justify-between h-16">
                    <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                        <div className="flex-shrink-0 flex items-center">
                            <h1 className="block h-10 w-auto text-white text-2xl">
                                SE Mod Helper
                            </h1>
                        </div>
                        <div className="hidden sm:block sm:ml-6">
                            <div className="flex space-x-4">
                                <Link href="/">
                                    <a className="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium">
                                        Home
                                    </a>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
