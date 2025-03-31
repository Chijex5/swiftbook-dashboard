import React from "react";
import { User } from "lucide-react";
export function UserInfo() {
  return <div className="bg-white rounded-lg shadow p-6 mb-8 flex items-center space-x-4">
      <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
        <User className="w-8 h-8 text-purple-600" />
      </div>
      <div>
        <h2 className="text-xl font-semibold text-gray-900">John Smith</h2>
        <p className="text-gray-500">Computer Science - Year 2</p>
      </div>
    </div>;
}