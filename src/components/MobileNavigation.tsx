import React from "react";
import { Navigation } from "./Navigation";
interface MobileNavigationProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileNavigation({
  isOpen,
  onClose
}: MobileNavigationProps) {
  if (!isOpen) return null;
  return <div className="lg:hidden">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-gray-800 bg-opacity-50 z-40" onClick={onClose} />
      {/* Navigation */}
      <div className="fixed inset-y-0 left-0 w-64 bg-white z-50">
        <div className="flex justify-end p-4">
          <button onClick={onClose} className="text-gray-600 hover:text-gray-900">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <Navigation />
      </div>
    </div>;
}