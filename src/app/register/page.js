"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  ChevronRight,
  ChevronLeft,
  Check,
  Upload,
  Loader2,
} from "lucide-react";

// Define validation schemas for each step
const step1Schema = z.object({
  fullName: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().regex(/^[0-9]{10}$/, "Phone must be 10 digits"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  registrationNumber: z.string().min(1, "Registration number is required"),
  currentInstitution: z.string().min(2, "Institution name is required"),
});

const step2Schema = z.object({
  degree: z.string().min(1, "Degree is required"),
  graduationYear: z.string().min(4, "Valid year required"),
  degreeCertificate: z
    .any()
    .refine((files) => files?.length > 0, "Certificate is required"),
  registrationProof: z
    .any()
    .refine((files) => files?.length > 0, "Registration proof is required"),
});

const step3Schema = z.object({
  membershipType: z.enum(["student", "practicing", "lifetime"]),
  researchMentorship: z.boolean().default(false),
  additionalServices: z.array(z.string()).optional(),
});

export default function RegisterPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const totalSteps = 4;

  // Form hook for current step
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: zodResolver(
      currentStep === 1
        ? step1Schema
        : currentStep === 2
        ? step2Schema
        : step3Schema
    ),
  });

  // Handle step navigation
  const nextStep = (data) => {
    setFormData({ ...formData, ...data });
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Final submission
  const onFinalSubmit = async (data) => {
    setIsSubmitting(true);
    const finalData = { ...formData, ...data };

    try {
      // Create FormData for file uploads
      const submitData = new FormData();
      Object.keys(finalData).forEach((key) => {
        if (finalData[key] instanceof FileList) {
          submitData.append(key, finalData[key][0]);
        } else {
          submitData.append(key, finalData[key]);
        }
      });

      const response = await fetch("/api/register", {
        method: "POST",
        body: submitData,
      });

      if (response.ok) {
        setCurrentStep(4); // Move to review step
      }
    } catch (error) {
      console.error("Registration error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center flex-1">
                <motion.div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                    step < currentStep
                      ? "bg-green-500 text-white"
                      : step === currentStep
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-500"
                  }`}
                  initial={{ scale: 0.8 }}
                  animate={{ scale: step === currentStep ? 1.1 : 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {step < currentStep ? <Check size={20} /> : step}
                </motion.div>
                {step < 4 && (
                  <div
                    className={`flex-1 h-1 mx-2 ${
                      step < currentStep ? "bg-green-500" : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="text-center text-gray-600">
            Step {currentStep} of {totalSteps}
          </div>
        </div>

        {/* Form Container */}
        <motion.div
          className="bg-white rounded-2xl shadow-xl p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <AnimatePresence mode="wait">
            {currentStep === 1 && (
              <Step1
                key="step1"
                register={register}
                errors={errors}
                onNext={handleSubmit(nextStep)}
              />
            )}
            {currentStep === 2 && (
              <Step2
                key="step2"
                register={register}
                errors={errors}
                onNext={handleSubmit(nextStep)}
                onPrev={prevStep}
              />
            )}
            {currentStep === 3 && (
              <Step3
                key="step3"
                register={register}
                errors={errors}
                onSubmit={handleSubmit(onFinalSubmit)}
                onPrev={prevStep}
                isSubmitting={isSubmitting}
              />
            )}
            {currentStep === 4 && (
              <ReviewStep key="review" formData={formData} />
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}

// Step 1: Personal Information
function Step1({ register, errors, onNext }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        Personal Information
      </h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            {...register("fullName")}
            type="text"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            placeholder="Dr. John Doe"
          />
          {errors.fullName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.fullName.message}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              {...register("email")}
              type="email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              placeholder="john.doe@example.com"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              {...register("phone")}
              type="tel"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              placeholder="9876543210"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">
                {errors.phone.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Date of Birth <span className="text-red-500">*</span>
          </label>
          <input
            {...register("dateOfBirth")}
            type="date"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          />
          {errors.dateOfBirth && (
            <p className="text-red-500 text-sm mt-1">
              {errors.dateOfBirth.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Professional Registration Number{" "}
            <span className="text-red-500">*</span>
          </label>
          <input
            {...register("registrationNumber")}
            type="text"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            placeholder="REG/2024/12345"
          />
          {errors.registrationNumber && (
            <p className="text-red-500 text-sm mt-1">
              {errors.registrationNumber.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Current Institution/Practice <span className="text-red-500">*</span>
          </label>
          <input
            {...register("currentInstitution")}
            type="text"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            placeholder="ABC Eye Hospital"
          />
          {errors.currentInstitution && (
            <p className="text-red-500 text-sm mt-1">
              {errors.currentInstitution.message}
            </p>
          )}
        </div>
      </div>

      <button
        onClick={onNext}
        className="mt-8 w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition flex items-center justify-center gap-2 group"
      >
        Continue to Qualifications
        <ChevronRight
          className="group-hover:translate-x-1 transition"
          size={20}
        />
      </button>
    </motion.div>
  );
}

// Step 2: Qualification Details (similar structure)
function Step2({ register, errors, onNext, onPrev }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        Qualification Details
      </h2>

      {/* Similar input fields for qualifications */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Degree <span className="text-red-500">*</span>
          </label>
          <select
            {...register("degree")}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          >
            <option value="">Select Degree</option>
            <option value="boptom">B.Optom</option>
            <option value="moptom">M.Optom</option>
            <option value="phd">PhD in Optometry</option>
          </select>
          {errors.degree && (
            <p className="text-red-500 text-sm mt-1">{errors.degree.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Upload Degree Certificate <span className="text-red-500">*</span>
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition cursor-pointer">
            <Upload className="mx-auto mb-2 text-gray-400" size={32} />
            <input
              {...register("degreeCertificate")}
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              className="hidden"
              id="degree-upload"
            />
            <label htmlFor="degree-upload" className="cursor-pointer">
              <span className="text-blue-600 font-medium">Click to upload</span>
              <span className="text-gray-500"> or drag and drop</span>
              <p className="text-sm text-gray-400 mt-1">
                PDF, JPG, PNG (Max 5MB)
              </p>
            </label>
          </div>
          {errors.degreeCertificate && (
            <p className="text-red-500 text-sm mt-1">
              {errors.degreeCertificate.message}
            </p>
          )}
        </div>
      </div>

      <div className="flex gap-4 mt-8">
        <button
          onClick={onPrev}
          className="flex-1 bg-gray-200 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-300 transition flex items-center justify-center gap-2"
        >
          <ChevronLeft size={20} />
          Back
        </button>
        <button
          onClick={onNext}
          className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition flex items-center justify-center gap-2 group"
        >
          Continue
          <ChevronRight
            className="group-hover:translate-x-1 transition"
            size={20}
          />
        </button>
      </div>
    </motion.div>
  );
}

// Step 3: Membership Type
function Step3({ register, errors, onSubmit, onPrev, isSubmitting }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Membership Type</h2>

      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {["student", "practicing", "lifetime"].map((type) => (
            <label
              key={type}
              className="relative border-2 border-gray-200 rounded-xl p-6 cursor-pointer hover:border-blue-500 transition"
            >
              <input
                {...register("membershipType")}
                type="radio"
                value={type}
                className="absolute top-4 right-4"
              />
              <div className="text-center">
                <h3 className="text-lg font-bold capitalize mb-2">{type}</h3>
                <p className="text-2xl font-bold text-blue-600 mb-2">
                  ₹
                  {type === "student"
                    ? "500"
                    : type === "practicing"
                    ? "2000"
                    : "10000"}
                </p>
                <p className="text-sm text-gray-500">
                  {type === "lifetime" ? "One-time payment" : "Annual"}
                </p>
              </div>
            </label>
          ))}
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              {...register("researchMentorship")}
              type="checkbox"
              className="mt-1"
            />
            <div>
              <h4 className="font-semibold text-gray-800">
                Research Mentorship Programme
              </h4>
              <p className="text-sm text-gray-600 mt-1">
                Get personalized guidance from experienced researchers.
                Additional ₹3,000/year
              </p>
            </div>
          </label>
        </div>
      </div>

      <div className="flex gap-4 mt-8">
        <button
          onClick={onPrev}
          className="flex-1 bg-gray-200 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-300 transition"
        >
          <ChevronLeft size={20} className="inline mr-2" />
          Back
        </button>
        <button
          onClick={onSubmit}
          disabled={isSubmitting}
          className="flex-1 bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition disabled:opacity-50"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="inline mr-2 animate-spin" size={20} />
              Submitting...
            </>
          ) : (
            "Submit Application"
          )}
        </button>
      </div>
    </motion.div>
  );
}

// Step 4: Review & Pending Approval
function ReviewStep({ formData }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center py-8"
    >
      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <Check className="text-green-600" size={40} />
      </div>
      <h2 className="text-3xl font-bold text-gray-800 mb-4">
        Application Submitted!
      </h2>
      <p className="text-gray-600 mb-6">
        Your membership application has been successfully submitted and is now
        pending review.
      </p>
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 max-w-md mx-auto">
        <h3 className="font-semibold text-gray-800 mb-3">Next Steps:</h3>
        <ol className="text-left text-sm text-gray-600 space-y-2">
          <li>1. Secretary will review your documents</li>
          <li>2. President will provide final approval</li>
          <li>3. You&apos;ll receive payment link via email</li>
          <li>4. Access credentials sent after payment</li>
        </ol>
      </div>
    </motion.div>
  );
}
