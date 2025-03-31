import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, CheckCircle, ArrowRight, X } from "lucide-react";
const steps = [{
  id: "personal",
  title: "Personal Information",
  fields: ["fullName", "phone"]
}, {
  id: "academic",
  title: "Academic Details",
  fields: ["department", "level"]
}, {
  id: "address",
  title: "Address Information",
  fields: ["address"]
}];
interface ProfileCompletionProps {
  onStart: () => void;
  email: string;
  profileurl: string;
  onComplete: (data: any) => void;
}

export function ProfileCompletion({
  onStart,
  email,
  profileurl,
  onComplete
}: ProfileCompletionProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    department: "",
    level: "",
    address: ""
  });
  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };
  const handleComplete = () => {
    const finalData = {
      ...formData,
      email,
      profileurl
    };
    onComplete(finalData); // Send data to parent component
    setIsOpen(false);
    onStart();
  };
  if (!isOpen) return null;
  return <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="p-6 bg-purple-50 border-b">
        <div className="flex items-start space-x-4">
          <div className="p-2 bg-purple-100 rounded-lg">
            <Shield className="w-6 h-6 text-purple-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              Complete Your Profile
            </h3>
            <p className="text-gray-600">
              We understand this form asks for personal information. This helps
              us recommend the most relevant books for your academic journey.
              Your information is secure and will only be used to enhance your
              experience.
            </p>
          </div>
          <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-gray-500">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="mt-6 flex space-x-2">
          {steps.map((step, index) => <div key={step.id} className={`flex-1 h-1 rounded-full ${index <= currentStep ? "bg-purple-600" : "bg-purple-200"}`} />)}
        </div>
      </div>
      <div className="p-6">
        <AnimatePresence mode="wait">
          <motion.div key={currentStep} initial={{
          opacity: 0,
          x: 20
        }} animate={{
          opacity: 1,
          x: 0
        }} exit={{
          opacity: 0,
          x: -20
        }} className="space-y-4">
            <h4 className="text-lg font-medium text-gray-900">
              {steps[currentStep].title}
            </h4>
            {steps[currentStep].id === "personal" && <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input type="text" value={formData.fullName} onChange={e => setFormData({
                ...formData,
                fullName: e.target.value
              })} className="w-full p-2 border rounded-lg" placeholder="Enter your full name" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input type="tel" value={formData.phone} onChange={e => setFormData({
                ...formData,
                phone: e.target.value
              })} className="w-full p-2 border rounded-lg" placeholder="Enter your phone number" />
                </div>
              </div>}
            {steps[currentStep].id === "academic" && <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Department
                  </label>
                  <select value={formData.department} onChange={e => setFormData({
                ...formData,
                department: e.target.value
              })} className="w-full p-2 border rounded-lg">
                    <option value="">Select department</option>
                    <option>Computer Science</option>
                    <option>Engineering</option>
                    <option>Medicine</option>
                    <option>Arts</option>
                    <option>Business</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Level
                  </label>
                  <select value={formData.level} onChange={e => setFormData({
                ...formData,
                level: e.target.value
              })} className="w-full p-2 border rounded-lg">
                    <option value="">Select level</option>
                    <option>Year 1</option>
                    <option>Year 2</option>
                    <option>Year 3</option>
                    <option>Year 4</option>
                  </select>
                </div>
              </div>}
            {steps[currentStep].id === "address" && <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address
                </label>
                <textarea value={formData.address} onChange={e => setFormData({
              ...formData,
              address: e.target.value
            })} className="w-full p-2 border rounded-lg" rows={3} placeholder="Enter your address" />
              </div>}
          </motion.div>
        </AnimatePresence>
        <div className="mt-6 flex justify-end space-x-3">
          {currentStep > 0 && <button onClick={() => setCurrentStep(currentStep - 1)} className="px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-50">
              Back
            </button>}
          <button onClick={handleNext} className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center space-x-2">
            <span>
              {currentStep === steps.length - 1 ? "Complete" : "Next"}
            </span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>;
}