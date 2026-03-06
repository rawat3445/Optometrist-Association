"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

export function RegisterPage() {
  const [submitStatus, setSubmitStatus] = useState("idle"); // idle | submitting | success | error
  const [submitError, setSubmitError] = useState("");
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState({});

  const { register, watch, setValue, handleSubmit, getValues, reset } = useForm(
    {
      defaultValues: {
        membershipType: "",
        sameAddress: false,
        declarationAccepted: false,
      },
    }
  );

  const validateStep1 = (data) => {
    const newErrors = {};

    if (!data.fullName || data.fullName.length < 3)
      newErrors.fullName = "Name must be 3+ characters";
    if (!data.guardianName || data.guardianName.length < 3)
      newErrors.guardianName = "Name must be 3+ characters";
    if (!data.dateOfBirth) newErrors.dateOfBirth = "Date of birth is required";
    if (!data.occupation || data.occupation.length < 2)
      newErrors.occupation = "Occupation required";
    if (!data.phone || !/^[0-9]{10}$/.test(data.phone))
      newErrors.phone = "Enter 10-digit mobile number";
    if (!data.email || !data.email.includes("@"))
      newErrors.email = "Enter valid email";
    if (!data.permanentAddress || data.permanentAddress.length < 10)
      newErrors.permanentAddress = "Address must be 10+ characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = (data) => {
    const newErrors = {};
    if (!data.degree) newErrors.degree = "Please select a degree";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep3 = (data) => {
    const newErrors = {};
    if (!data.membershipType)
      newErrors.membershipType = "Please select a membership type";
    if (!data.paymentProof || data.paymentProof?.length === 0)
      newErrors.paymentProof = "Please upload payment proof";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep4 = (data) => {
    const newErrors = {};
    if (!data.declarationAccepted)
      newErrors.declarationAccepted =
        "You must accept the declaration to continue";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    const data = getValues();

    if (currentStep === 1) {
      if (validateStep1(data)) {
        setErrors({});
        setCurrentStep(2);
      }
      return;
    }

    if (currentStep === 2) {
      if (validateStep2(data)) {
        setErrors({});
        setCurrentStep(3);
      }
      return;
    }

    if (currentStep === 3) {
      if (validateStep3(data)) {
        setErrors({});
        setCurrentStep(4);
      }
      return;
    }

    if (currentStep === 4) {
      if (validateStep4(data)) {
        setErrors({});
        setCurrentStep(5);
      }
      return;
    }
  };

  const prevStep = () => setCurrentStep((s) => Math.max(s - 1, 1));

  const onFinalSubmit = async (data) => {
    try {
      setSubmitStatus("submitting");
      setSubmitError("");

      // Create FormData for file uploads
      const formData = new FormData();

      // Add all form fields to FormData
      Object.entries(data).forEach(([key, value]) => {
        if (value === null || value === undefined) return;

        if (value instanceof FileList) {
          // Handle file inputs
          if (value[0]) {
            formData.append(key, value[0]);
          }
        } else if (typeof value === "boolean") {
          // Convert boolean to string
          formData.append(key, value.toString());
        } else if (value instanceof Date) {
          // Convert date to ISO string
          formData.append(key, value.toISOString().split("T")[0]);
        } else {
          // String values
          formData.append(key, value);
        }
      });

      // Send to API endpoint
      const response = await fetch("/api/membership/register", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Submission failed. Please try again.");
      }

      // Success
      setSubmitStatus("success");
      setCurrentStep(6);
    } catch (error) {
      setSubmitStatus("error");
      setSubmitError(error.message || "Something went wrong.");
      console.error("Form submission error:", error);
    }
  };

  // Reset form function
  const resetForm = () => {
    reset();
    setCurrentStep(1);
    setSubmitStatus("idle");
    setSubmitError("");
    setErrors({});
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-10 px-4">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg">
        <p className="text-center mb-6 text-gray-600 font-medium text-lg">
          Step {currentStep} of 5
        </p>

        {/* Status Messages */}
        {submitStatus === "submitting" && (
          <div className="mb-4 p-3 bg-blue-50 text-blue-700 rounded-lg flex items-center gap-2">
            <svg
              className="animate-spin h-5 w-5 text-blue-600"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              ></path>
            </svg>
            Submitting your registration...
          </div>
        )}

        {submitStatus === "error" && (
          <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg">
            {submitError}
          </div>
        )}

        <form onSubmit={handleSubmit(onFinalSubmit)} className="space-y-6">
          <AnimatePresence mode="wait">
            {currentStep === 1 && (
              <Step1
                key="step1"
                register={register}
                errors={errors}
                onNext={nextStep}
                watch={watch}
                setValue={setValue}
              />
            )}

            {currentStep === 2 && (
              <Step2
                key="step2"
                register={register}
                errors={errors}
                onNext={nextStep}
                onPrev={prevStep}
              />
            )}

            {currentStep === 3 && (
              <Step3
                key="step3"
                register={register}
                watch={watch}
                errors={errors}
                onPrev={prevStep}
                onNext={nextStep}
              />
            )}

            {currentStep === 4 && (
              <DeclarationStep
                key="step4"
                register={register}
                errors={errors}
                onPrev={prevStep}
                onNext={nextStep}
              />
            )}

            {currentStep === 5 && (
              <ReviewStep
                key="step5"
                getValues={getValues}
                onPrev={prevStep}
                submitStatus={submitStatus}
              />
            )}

            {currentStep === 6 && (
              <SuccessStep key="success" onReset={resetForm} />
            )}
          </AnimatePresence>
        </form>
      </div>
    </div>
  );
}

function Step1({ register, errors, onNext, watch, setValue }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-4"
    >
      <h2 className="text-2xl font-bold text-gray-800">Personal Details</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Full Name *
          </label>
          <input
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            {...register("fullName")}
          />
          {errors.fullName && (
            <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Father/Husband Name *
          </label>
          <input
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            {...register("guardianName")}
          />
          {errors.guardianName && (
            <p className="text-red-500 text-xs mt-1">{errors.guardianName}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Date of Birth *
          </label>
          <input
            type="date"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            {...register("dateOfBirth")}
          />
          {errors.dateOfBirth && (
            <p className="text-red-500 text-xs mt-1">{errors.dateOfBirth}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Occupation *
          </label>
          <input
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            {...register("occupation")}
          />
          {errors.occupation && (
            <p className="text-red-500 text-xs mt-1">{errors.occupation}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Mobile Number *
          </label>
          <input
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            {...register("phone")}
            placeholder="1234567890"
          />
          {errors.phone && (
            <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email *
          </label>
          <input
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            {...register("email")}
            placeholder="name@example.com"
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            PAN Number
          </label>
          <input
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            {...register("panNumber")}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Aadhaar Number
          </label>
          <input
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            {...register("aadhaarNumber")}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Permanent Address *
        </label>
        <textarea
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          rows={3}
          {...register("permanentAddress")}
        />
        {errors.permanentAddress && (
          <p className="text-red-500 text-xs mt-1">{errors.permanentAddress}</p>
        )}
      </div>

      <label className="flex items-center gap-2 p-3 border border-gray-200 rounded-lg">
        <input
          type="checkbox"
          {...register("sameAddress")}
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
          onChange={(e) => {
            if (e.target.checked) {
              setValue("correspondenceAddress", watch("permanentAddress"));
            }
          }}
        />
        <span className="text-sm text-gray-700">Same as permanent address</span>
      </label>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Correspondence Address
        </label>
        <textarea
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          rows={3}
          {...register("correspondenceAddress")}
        />
      </div>

      <button
        type="button"
        onClick={onNext}
        className="w-full md:w-auto bg-blue-600 text-white py-3 px-8 rounded-lg hover:bg-blue-700 font-semibold flex items-center justify-center gap-2 ml-auto shadow-lg"
      >
        Continue <ChevronRight className="w-5 h-5" />
      </button>
    </motion.div>
  );
}

function Step2({ register, errors, onNext, onPrev }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <h2 className="text-2xl font-bold text-gray-800">
        Qualification Details
      </h2>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Degree *
        </label>
        <select
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          {...register("degree")}
        >
          <option value="">Select Degree</option>
          <option value="boptom">B.Optom</option>
          <option value="moptom">M.Optom</option>
          <option value="phd">PhD</option>
        </select>
        {errors.degree && (
          <p className="text-red-500 text-xs mt-1">{errors.degree}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Degree Certificate
        </label>
        <input
          type="file"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          {...register("degreeCertificate")}
        />
      </div>

      <div className="flex gap-4">
        <button
          type="button"
          onClick={onPrev}
          className="flex-1 py-3 px-6 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-semibold flex items-center justify-center gap-2"
        >
          <ChevronLeft className="w-5 h-5" /> Back
        </button>
        <button
          type="button"
          onClick={onNext}
          className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 font-semibold flex items-center justify-center gap-2 shadow-lg"
        >
          Continue <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </motion.div>
  );
}

function Step3({ register, watch, errors, onPrev, onNext }) {
  const membershipType = watch("membershipType");

  const getFeeText = () => {
    if (membershipType === "student")
      return "Student Member fee: ₹750 per year";
    if (membershipType === "practicing")
      return "Regular / Associate fee: ₹1000 per year";
    return "Please select a membership type to see the fee.";
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <h2 className="text-2xl font-bold text-gray-800">Membership</h2>

      <div className="space-y-3">
        {["student", "practicing"].map((t) => (
          <label
            key={t}
            className={`flex items-center gap-3 rounded-md border px-4 py-2 text-sm capitalize cursor-pointer ${
              membershipType === t
                ? "border-blue-500 bg-blue-50"
                : "border-gray-200 hover:bg-gray-50"
            }`}
          >
            <input
              type="radio"
              value={t}
              {...register("membershipType")}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
            />
            {t}
          </label>
        ))}
        {errors.membershipType && (
          <p className="text-red-500 text-xs">{errors.membershipType}</p>
        )}
      </div>

      <div className="rounded-lg border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-800">
        <p className="font-semibold mb-1">Membership Fees</p>
        <p>{getFeeText()}</p>
        <p className="mt-1 text-xs text-amber-900">
          Proof of annual Membership fees (Regular/Associate: ₹1000, Student
          Member: ₹750) is required.
        </p>
      </div>

      <div className="rounded-lg border border-gray-200 p-4 flex flex-col items-center gap-3">
        <p className="text-sm text-gray-700 text-center">
          Scan this QR code to pay your membership fees using UPI or supported
          payment apps.
        </p>
        <Image
          src="/opto_site_QR.jpeg"
          width={200}
          height={200}
          alt="Payment QR"
        />
        <p className="text-xs text-gray-500 text-center">
          After successful payment, upload the proof of payment below.
        </p>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Proof of payment (screenshot / PDF) *
        </label>
        <input
          type="file"
          accept="image/*,application/pdf"
          {...register("paymentProof")}
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm file:mr-4 file:rounded-md file:border-0 file:bg-blue-50 file:px-3 file:py-1 file:text-sm file:text-blue-700 hover:file:bg-blue-100"
        />
        {errors.paymentProof && (
          <p className="text-red-500 text-xs">{errors.paymentProof}</p>
        )}
        <p className="text-xs text-gray-500">
          Upload UPI screenshot, bank confirmation, or PDF receipt.
        </p>
      </div>

      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={onPrev}
          className="inline-flex items-center gap-2 rounded-md border border-gray-300 bg-white px-5 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          <ChevronLeft className="h-4 w-4" /> Back
        </button>
        <button
          type="button"
          onClick={onNext}
          className="inline-flex items-center gap-2 rounded-md bg-green-600 px-5 py-2 text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          Continue <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </motion.div>
  );
}

function DeclarationStep({ register, errors, onPrev, onNext }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <h2 className="text-2xl font-bold text-gray-800">
        Declaration & Consent
      </h2>

      <div className="border rounded-lg p-4 text-sm text-gray-700 space-y-3 max-h-64 overflow-y-auto">
        <p>
          (i) I unconditionally subscribe to the aims and objects of the
          Society.
        </p>
        <p>
          (ii) I shall abide by the bylaws of the Society as amended from time
          to time.
        </p>
        <p>
          (iii) I have not been convicted of any offence involving moral
          turpitude.
        </p>
        <p>
          (iv) All information and documents provided by me are true and
          correct.
        </p>
      </div>

      <label className="flex items-start gap-3">
        <input
          type="checkbox"
          {...register("declarationAccepted")}
          className="mt-1 h-4 w-4 text-blue-600 border-gray-300 rounded"
        />
        <span className="text-sm text-gray-700">
          I have read and agree to the above declaration
        </span>
      </label>

      {errors?.declarationAccepted && (
        <p className="text-red-500 text-sm">{errors.declarationAccepted}</p>
      )}

      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={onPrev}
          className="inline-flex items-center gap-2 rounded-md border border-gray-300 bg-white px-5 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          <ChevronLeft className="h-4 w-4" /> Back
        </button>

        <button
          type="button"
          onClick={onNext}
          className="inline-flex items-center gap-2 rounded-md bg-green-600 px-5 py-2 text-sm font-medium text-white hover:bg-green-700"
        >
          Continue <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </motion.div>
  );
}

function ReviewStep({ getValues, onPrev, submitStatus }) {
  const data = getValues();

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <h2 className="text-2xl font-bold text-gray-800">
        Review Your Application
      </h2>

      <div className="space-y-4">
        <div className="border border-gray-200 rounded-lg p-4">
          <h3 className="font-medium text-gray-700 mb-2">Personal Details</h3>
          <p>
            <span className="font-medium">Name:</span> {data.fullName}
          </p>
          <p>
            <span className="font-medium">Father/Husband:</span>{" "}
            {data.guardianName}
          </p>
          <p>
            <span className="font-medium">Email:</span> {data.email}
          </p>
          <p>
            <span className="font-medium">Phone:</span> {data.phone}
          </p>
        </div>

        <div className="border border-gray-200 rounded-lg p-4">
          <h3 className="font-medium text-gray-700 mb-2">Qualification</h3>
          <p>
            <span className="font-medium">Degree:</span> {data.degree}
          </p>
        </div>

        <div className="border border-gray-200 rounded-lg p-4">
          <h3 className="font-medium text-gray-700 mb-2">Membership</h3>
          <p>
            <span className="font-medium">Type:</span> {data.membershipType}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={onPrev}
          disabled={submitStatus === "submitting"}
          className="inline-flex items-center gap-2 rounded-md border border-gray-300 bg-white px-5 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
        >
          <ChevronLeft className="h-4 w-4" /> Back
        </button>

        <button
          type="submit"
          disabled={submitStatus === "submitting"}
          className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-5 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {submitStatus === "submitting" ? (
            <>
              <svg
                className="animate-spin h-4 w-4 text-white"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                ></path>
              </svg>
              Submitting...
            </>
          ) : (
            "Final Submit"
          )}
        </button>
      </div>
    </motion.div>
  );
}

function SuccessStep({ onReset }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="space-y-4 text-center py-8"
    >
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
        <svg
          className="w-8 h-8 text-green-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 13l4 4L19 7"
          ></path>
        </svg>
      </div>

      <h2 className="text-2xl font-bold text-green-700">
        Registration Successful! 🎉
      </h2>

      <p className="text-gray-600">
        Thank you for registering with the Optometry Association. Your
        application is now pending review.
      </p>

      <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-700 text-left">
        <p className="font-medium mb-2">What happens next:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Our team will review your application</li>
          <li>You&apos;ll receive a confirmation email</li>
          <li>
            Payment verification will be completed within 2-3 business days
          </li>
          <li>Once approved, you&apos;ll receive your membership details</li>
        </ul>
      </div>

      <button
        type="button"
        onClick={onReset}
        className="inline-flex items-center justify-center rounded-md bg-blue-600 px-5 py-2 text-sm font-medium text-white hover:bg-blue-700 mt-4"
      >
        Register Another Member
      </button>
    </motion.div>
  );
}

export default RegisterPage;
