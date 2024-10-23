"use client";

import React, { useEffect, useState } from "react";
import MembersGrid from "@/components/workspace/members-views/member-grid";
import MembersList from "@/components/workspace/members-views/member-list";
import TeamsGrid from "@/components/workspace/members-views/team-grid";
import TeamsList from "@/components/workspace/members-views/team-list";
import { teams } from "@/consts/members-datas";
import { IoGrid, IoList } from "react-icons/io5";
import { FiSearch } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/store";
import {
  fetchUserProfiles,
  fetchWorkspaceMembers,
  Member,
  Users,
} from "@/lib/store/features/workspace-slice";
import { useParams } from "next/navigation";

export default function Members() {
  const dispatch = useDispatch<AppDispatch>();
  const [activeTab, setActiveTab] = useState<"members" | "teams">("members");
  const [viewType, setViewType] = useState<"grid" | "list">("grid");
  const handleTabSwitch = (tab: "members" | "teams") => setActiveTab(tab);
  const handleViewSwitch = (view: "grid" | "list") => setViewType(view);
  const { members, users }: { members: Member[]; users: Users[] } = useSelector(
    (state: RootState) => state.workspace
  );
  const { workSpaceId }: { workSpaceId: string } = useParams();

  const renderContent = () => {
    if (activeTab === "members") {
      return viewType === "grid" ? (
        <MembersGrid members={users} />
      ) : (
        <MembersList members={users} />
      );
    } else {
      return viewType === "grid" ? (
        <TeamsGrid teams={teams} />
      ) : (
        <TeamsList teams={teams} />
      );
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchWorkspaceMembers({ workSpaceId }));
    };
    fetchData();
  }, [workSpaceId]);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchUserProfiles({ members }));
    };
    fetchData();
  }, [members]);

  return (
    <div>
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-300">Members</h1>
      </div>

      <div className="border-b border-gray-300 mb-4 relative ">
        <div className="flex justify-between ">
          <div className="flex space-x-4 mt-2">
            <h2
              className={`text-base font-semibold cursor-pointer ${
                activeTab === "members"
                  ? "border-b-2 border-blue-600"
                  : "text-gray-600"
              }`}
              onClick={() => handleTabSwitch("members")}
            >
              Members
            </h2>
            <h2
              className={`text-base font-semibold cursor-pointer ${
                activeTab === "teams"
                  ? "border-b-2 border-blue-600"
                  : "text-gray-600"
              }`}
              onClick={() => handleTabSwitch("teams")}
            >
              Teams
            </h2>
          </div>
          <div className="flex items-center space-x-4 pb-2">
            <div className="relative flex items-center text-sm">
              <FiSearch className="absolute left-3 text-gray-400" />
              <input
                type="text"
                className="pl-10 pr-4 py-2 border-none rounded-xl focus:outline-none"
                placeholder="Search..."
              />
              <select className="ml-4 px-3 py-2 rounded-xl focus:outline-none">
                <option value="">Sort by</option>
                <option value="name">Name</option>
                <option value="date">Date Joined</option>
              </select>
            </div>
            <div className="flex items-center space-x-4">
              <div
                className={`p-2 rounded-full cursor-pointer ${
                  viewType === "grid" ? "bg-red-200" : "bg-transparent"
                }`}
                onClick={() => handleViewSwitch("grid")}
                title="Grid View"
              >
                <IoGrid
                  className={`text-gray-600 text-xl ${
                    viewType === "grid" ? "text-blue-600" : ""
                  }`}
                />
              </div>
              <div
                className={`p-2 rounded-full cursor-pointer ${
                  viewType === "list" ? "bg-red-200" : "bg-transparent"
                }`}
                onClick={() => handleViewSwitch("list")}
                title="List View"
              >
                <IoList
                  className={`text-gray-600 text-2xl ${
                    viewType === "list" ? "text-blue-600" : ""
                  }`}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div>{renderContent()}</div>
      </div>
    </div>
  );
}
