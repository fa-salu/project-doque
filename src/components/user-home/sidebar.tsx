"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { AiOutlineHome } from "react-icons/ai";
import { HiOutlineTemplate } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store";
import { fetchWorkspaceData } from "@/lib/store/features/workspace-slice";

const Sidebar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [activePath, setActivePath] = useState<string>("/u/home");
  const { workSpace } = useSelector((state: RootState) => state.workspace);

  const sidebarItems = [
    {
      icon: <AiOutlineHome className="text-2xl" />,
      label: "Home",
      link: "/u/home",
    },
    {
      icon: <HiOutlineTemplate className="text-2xl" />,
      label: "Templates",
      link: "/u/home/templates",
    },
  ];

  const activeLink = (path: string) => {
    setActivePath(path);
  };

  useEffect(() => {
    const fetchData = () => {
      dispatch(fetchWorkspaceData());
    };
    fetchData();
  }, [dispatch]);

  return (
    <div className="w-full sm:w-1/4 md:w-1/5 bg-[#EDF1F4] p-4 flex flex-col dark:bg-gray-950">
      <div className="flex-1">
        {sidebarItems.map((item, index) => (
          <Link
            key={index}
            href={item.link}
            onClick={() => activeLink(item.link)}>
            <div
              className={`flex items-center p-1 mr-2 mt-1 cursor-pointer ${
                activePath === item.link ? "border-l-2 border-black dark:border-l-2 dark:border-white" : "hover:bg-[#E1E4E6]"
              }`}>
              {item.icon}
              <h2 className="font-medium text-sm ml-2">{item.label}</h2>
            </div>
          </Link>
        ))}

        <hr className="my-2 border-gray-500 h-1" />
        <h2 className="font-semibold text-sm mt-1 text-gray-600">Workspaces</h2>

        <div className="max-h-[360px] overflow-y-auto">
          {workSpace?.map((workspace, index) => (
            <Link href={`/w/${workspace.WorkspaceId}/dashboard`} key={index}>
              <div className="flex items-center hover:bg-zinc-200 px-4 py-2 rounded-md">
                <div className="flex flex-col py-1">
                  <span className="font-semibold text-sm">
                    {workspace.name}
                  </span>
                  <span className="font-medium text-sm">Workspace</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
