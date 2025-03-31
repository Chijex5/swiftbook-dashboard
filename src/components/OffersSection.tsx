import React from "react";
import { Tag, Bookmark } from "lucide-react";
export function OffersSection() {
  return <div className="space-y-6">
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-lg shadow p-6 text-white">
        <div className="flex items-center space-x-2 mb-4">
          <Tag className="w-6 h-6" />
          <h3 className="text-lg font-semibold">Special Offer</h3>
        </div>
        <p className="text-purple-100 mb-4">
          Get 20% off on all Computer Science textbooks this week!
        </p>
        <button className="bg-white text-purple-600 px-4 py-2 rounded-lg font-medium hover:bg-purple-50">
          Browse Offers
        </button>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Bookmark className="w-6 h-6 text-purple-600" />
          <h3 className="text-lg font-semibold">New Arrivals</h3>
        </div>
        <p className="text-gray-600 mb-4">
          Latest editions of Engineering textbooks now available!
        </p>
        <button className="border border-purple-600 text-purple-600 px-4 py-2 rounded-lg font-medium hover:bg-purple-50">
          View Collection
        </button>
      </div>
    </div>;
}