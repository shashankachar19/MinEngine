import React from 'react';
import CommandLog from './CommandLog';

export default function RightSidebarResizable() {
  return (
    <div id="right-sidebar-container" className="h-full w-full flex flex-col relative overflow-hidden bg-transparent rounded-2xl">
      
      {/* Full height AI Engine Logs */}
      <div className="relative flex-1 overflow-hidden min-h-0 flex flex-col rounded-2xl">
        <CommandLog />
      </div>
      
    </div>
  );
}
