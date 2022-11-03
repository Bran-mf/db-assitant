import React from "react";
import { Button } from "react-bootstrap";

const SubGroupsPanel = () => {
  return (
    <div className="flex flex-row gap-2">
        <input
          onChange={({ target: { value } }: any) => (value)}
          className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
          placeholder="Search Group"
          type="text"
          name="filter"
        />
        <Button >Add</Button>
    </div>
  );
};

export default SubGroupsPanel;
