'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const BaseTemplate = (props: {
  leftNav: React.ReactNode;
  rightNav?: React.ReactNode;
  children: React.ReactNode;
}) => {
  const pathname = usePathname();

  const navLinkClass = (path: string) =>
    `border-none text-base text-gray-700 font-main hover:text-gray-950 ${
      pathname === path ? 'underline' : ''
    }`;

  return (
    <div className="min-h-screen w-full bg-[#F5F4EF] px-1 font-main text-gray-700 antialiased">
      <div className="w-screen py-8">
        <header className="mx-auto flex max-w-screen-md flex-row items-start justify-between border-b border-gray-300">
          <div className="">
            <h1 className="text-3xl font-bold text-gray-900">
              RoboGuard
            </h1>
            <h2 className="text-xl">
              Turn robots into security guards
            </h2>
          </div>
          <div className="flex justify-between">
            <nav>
              <ul className="flex flex-wrap gap-x-5 text-xl">
                <li>
                  <Link href="/" className={navLinkClass('/')}>
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/videos" className={navLinkClass('/videos')}>
                    Videos
                  </Link>
                </li>
                <li>
                  <Link href="/example" className={navLinkClass('/example')}>
                    Dashboard Example
                  </Link>
                </li>
              </ul>
            </nav>
            <nav>
              <ul className="flex flex-wrap gap-x-5 text-xl">
                {props.rightNav}
              </ul>
            </nav>
          </div>

        </header>

        <main>{props.children}</main>

      </div>
    </div>
  );
};
