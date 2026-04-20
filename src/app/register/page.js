"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import {
  BookOpen,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  Shield,
  User,
} from "lucide-react";
import Image from "next/image";

const FORM_STEPS = [
  { number: 1, label: "Applicant", icon: User },
  { number: 2, label: "Qualification", icon: GraduationCap },
  { number: 3, label: "Membership", icon: BookOpen },
  { number: 4, label: "Declaration", icon: Shield },
  { number: 5, label: "Review", icon: CheckCircle },
];

const inputClass =
  "w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

const fileClass =
  "w-full rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-700 file:mr-4 file:rounded-full file:border-0 file:bg-blue-100 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-blue-700 hover:file:bg-blue-200";

const ONE_TIME_APPLICATION_FEE = 750;
const ANNUAL_RENEWAL_FEES = {
  student: 250,
  practitioner: 500,
};

function formatRupees(amount) {
  return `Rs. ${amount.toLocaleString("en-IN")}`;
}

export function RegisterPage() {
  const [submitStatus, setSubmitStatus] = useState("idle"); // idle | submitting | success | error
  const [submitError, setSubmitError] = useState("");
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState({});

  const { register, watch, setValue, handleSubmit, getValues, reset } = useForm(
    {
      defaultValues: {
        membershipType: "practitioner",
        gender: "",
        fellowshipInterest: false,
        journalPreference: "digital",
        newsletterOptIn: true,
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
    if (!data.gender) newErrors.gender = "Please select gender";
    if (!data.occupation || data.occupation.length < 2)
      newErrors.occupation = "Occupation required";
    if (!data.phone || !/^[0-9]{10}$/.test(data.phone))
      newErrors.phone = "Enter 10-digit mobile number";
    if (!data.email || !data.email.includes("@"))
      newErrors.email = "Enter valid email";
    if (!data.permanentAddress || data.permanentAddress.length < 10)
      newErrors.permanentAddress = "Address must be 10+ characters";
    if (!data.city || data.city.length < 2) newErrors.city = "City is required";
    if (!data.state || data.state.length < 2)
      newErrors.state = "State is required";
    if (!data.pincode || !/^[0-9]{6}$/.test(data.pincode))
      newErrors.pincode = "Enter 6-digit pincode";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = (data) => {
    const newErrors = {};
    if (!data.degree) newErrors.degree = "Please select a degree";
    if (!data.institution || data.institution.length < 3)
      newErrors.institution = "Institution is required";
    if (!data.yearOfPassing || !/^[0-9]{4}$/.test(data.yearOfPassing))
      newErrors.yearOfPassing = "Enter year of passing";
    if (!data.registrationNumber || data.registrationNumber.length < 3)
      newErrors.registrationNumber = "Registration number is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep3 = (data) => {
    const newErrors = {};
    if (!data.membershipType)
      newErrors.membershipType = "Please select a membership type";
    if (!data.proposerName || data.proposerName.length < 3)
      newErrors.proposerName = "Proposer name is required";
    if (!data.proposerMembershipNo || data.proposerMembershipNo.length < 2)
      newErrors.proposerMembershipNo = "Proposer membership number is required";
    if (!data.seconderName || data.seconderName.length < 3)
      newErrors.seconderName = "Seconder name is required";
    if (!data.seconderMembershipNo || data.seconderMembershipNo.length < 2)
      newErrors.seconderMembershipNo = "Seconder membership number is required";
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
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,#dbeafe_0%,#f8fafc_38%,#ecfeff_100%)] px-4 py-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 overflow-hidden rounded-[2.5rem] bg-slate-950 p-6 text-white shadow-2xl md:p-10">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-teal-200">
                Society Membership Application
              </p>
              <h1 className="mt-4 text-4xl font-black leading-tight md:text-6xl">
                Formal membership form
              </h1>
              <p className="mt-5 max-w-3xl text-base leading-8 text-blue-100">
                Redesigned in the style of Delhi Ophthalmological Society
                membership applications, with personal details, addresses,
                qualifications, proposer and seconder references, document
                uploads, payment proof and declaration.
              </p>
            </div>
            
            <div className="rounded-[2rem] border border-white/10 bg-white/10 p-5 backdrop-blur">
              <p className="text-sm font-bold text-white">
                Keep these ready before submitting
              </p>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-blue-100">
                <li className="flex gap-3">
                  <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-teal-300" />
                  Degree, registration certificate and applicant photograph.
                </li>
                <li className="flex gap-3">
                  <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-teal-300" />
                  Proposer and seconder membership details for verification.
                </li>
                <li className="flex gap-3">
                  <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-teal-300" />
                  Payment reference and screenshot after scanning the QR code.
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mb-6 grid gap-3 md:grid-cols-5">
          {FORM_STEPS.map((step) => {
            const Icon = step.icon;
            const active = currentStep === step.number;
            const done = currentStep > step.number;

            return (
              <div
                key={step.number}
                className={`rounded-2xl border p-4 shadow-sm transition ${
                  active
                    ? "border-blue-500 bg-blue-50"
                    : done
                    ? "border-emerald-200 bg-emerald-50"
                    : "border-slate-200 bg-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`inline-flex h-10 w-10 items-center justify-center rounded-xl ${
                      active
                        ? "bg-blue-600 text-white"
                        : done
                        ? "bg-emerald-600 text-white"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {done ? (
                      <CheckCircle className="h-5 w-5" />
                    ) : (
                      <Icon className="h-5 w-5" />
                    )}
                  </span>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
                      Step {step.number}
                    </p>
                    <p className="text-sm font-bold text-slate-950">
                      {step.label}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mx-auto rounded-[2.5rem] border border-white bg-white/95 p-5 shadow-xl shadow-blue-100/60 sm:p-8">
        {currentStep <= 5 && (
          <p className="mb-6 text-center text-sm font-semibold uppercase tracking-[0.22em] text-slate-500">
            Step {currentStep} of 5
          </p>
        )}

        {/* Status Messages */}
        {submitStatus === "submitting" && (
          <div className="mb-4 flex items-center gap-2 rounded-2xl border border-blue-200 bg-blue-50 p-3 text-blue-700">
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
          <div className="mb-4 rounded-2xl border border-red-200 bg-red-50 p-3 text-red-700">
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
    </div>
  );
}

function Step1({ register, errors, onNext, watch, setValue }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="rounded-[2rem] border border-blue-100 bg-gradient-to-br from-blue-50 to-white p-5">
        <p className="text-xs font-bold uppercase tracking-[0.24em] text-blue-600">
          Application Part A
        </p>
        <h2 className="mt-2 text-2xl font-bold text-slate-950">
          Personal details and address
        </h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          This follows the formal society format for applicant profile,
          contact details and correspondence information.
        </p>
      </div>

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
            Gender *
          </label>
          <select
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            {...register("gender")}
          >
            <option value="">Select Gender</option>
            <option value="female">Female</option>
            <option value="male">Male</option>
            <option value="other">Other</option>
            <option value="prefer-not-to-say">Prefer not to say</option>
          </select>
          {errors.gender && (
            <p className="text-red-500 text-xs mt-1">{errors.gender}</p>
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            City *
          </label>
          <input
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            {...register("city")}
          />
          {errors.city && (
            <p className="text-red-500 text-xs mt-1">{errors.city}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            State *
          </label>
          <input
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            {...register("state")}
          />
          {errors.state && (
            <p className="text-red-500 text-xs mt-1">{errors.state}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Pincode *
          </label>
          <input
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            {...register("pincode")}
          />
          {errors.pincode && (
            <p className="text-red-500 text-xs mt-1">{errors.pincode}</p>
          )}
        </div>
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
      <div className="rounded-[2rem] border border-emerald-100 bg-gradient-to-br from-emerald-50 to-white p-5">
        <p className="text-xs font-bold uppercase tracking-[0.24em] text-emerald-700">
          Application Part B
        </p>
        <h2 className="mt-2 text-2xl font-bold text-slate-950">
          Qualification and registration
        </h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          Add your degree, institution, professional registration and speciality
          details for society verification.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Degree *
          </label>
          <select
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            {...register("degree")}
          >
            <option value="">Select Degree</option>
            <option value="B.Optom">B.Optom</option>
            <option value="M.Optom">M.Optom</option>
            <option value="Diploma in Optometry">Diploma in Optometry</option>
            <option value="PhD">PhD</option>
            <option value="Other">Other</option>
          </select>
          {errors.degree && (
            <p className="text-red-500 text-xs mt-1">{errors.degree}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Speciality / area of interest
          </label>
          <input
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Contact lens, low vision, binocular vision..."
            {...register("specialty")}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Institution / college *
          </label>
          <input
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            {...register("institution")}
          />
          {errors.institution && (
            <p className="text-red-500 text-xs mt-1">{errors.institution}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            University / board
          </label>
          <input
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            {...register("university")}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Year of passing *
          </label>
          <input
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="2026"
            {...register("yearOfPassing")}
          />
          {errors.yearOfPassing && (
            <p className="text-red-500 text-xs mt-1">
              {errors.yearOfPassing}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Registration number *
          </label>
          <input
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            {...register("registrationNumber")}
          />
          {errors.registrationNumber && (
            <p className="text-red-500 text-xs mt-1">
              {errors.registrationNumber}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Registration council
          </label>
          <input
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            {...register("registrationCouncil")}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Current workplace
          </label>
          <input
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            {...register("workplace")}
          />
        </div>
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

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Registration Certificate
        </label>
        <input
          type="file"
          accept="image/*,application/pdf"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          {...register("registrationCertificate")}
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
  const fellowshipInterest = watch("fellowshipInterest");
  const annualRenewalFee = ANNUAL_RENEWAL_FEES[membershipType] || 0;
  const firstYearPayable = ONE_TIME_APPLICATION_FEE + annualRenewalFee;

  const getFeeText = () => {
    if (membershipType === "student")
      return `Student first-year payable: ${formatRupees(
        firstYearPayable
      )} (${formatRupees(ONE_TIME_APPLICATION_FEE)} one-time + ${formatRupees(
        annualRenewalFee
      )} annual renewal).`;
    if (membershipType === "practitioner")
      return `Practitioner first-year payable: ${formatRupees(
        firstYearPayable
      )} (${formatRupees(ONE_TIME_APPLICATION_FEE)} one-time + ${formatRupees(
        annualRenewalFee
      )} annual renewal).`;
    return "Select a membership type to see the fee note.";
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="rounded-[2rem] border border-amber-100 bg-gradient-to-br from-amber-50 to-white p-5">
        <p className="text-xs font-bold uppercase tracking-[0.24em] text-amber-700">
          Application Part C
        </p>
        <h2 className="mt-2 text-2xl font-bold text-slate-950">
          Membership, proposer and seconder
        </h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          Select the category and add two member references for society
          verification.
        </p>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        {[
          [
            "student",
            "Student Member",
            `Renewable yearly fee ${formatRupees(
              ANNUAL_RENEWAL_FEES.student
            )}`,
          ],
          [
            "practitioner",
            "Practitioner Member",
            `Renewable yearly fee ${formatRupees(
              ANNUAL_RENEWAL_FEES.practitioner
            )}`,
          ],
        ].map(([value, label, description]) => (
          <label
            key={value}
            className={`flex cursor-pointer items-start gap-3 rounded-2xl border px-4 py-4 text-sm font-semibold ${
              membershipType === value
                ? "border-blue-500 bg-blue-50 text-blue-800"
                : "border-gray-200 text-gray-700 hover:bg-gray-50"
            }`}
          >
            <input
              type="radio"
              value={value}
              {...register("membershipType")}
              className="mt-1 h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span>
              <span className="block text-base">{label}</span>
              <span className="mt-1 block text-xs font-medium text-slate-500">
                {description}
              </span>
            </span>
          </label>
        ))}
        {errors.membershipType && (
          <p className="text-red-500 text-xs">{errors.membershipType}</p>
        )}
      </div>

      <div className="rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-800">
        <p className="font-semibold mb-1">Member references</p>
        <p>
          Enter proposer and seconder details. If the society later relaxes this
          rule, the same fields can be made optional without changing the form
          layout.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Proposer Name *
          </label>
          <input className={inputClass} {...register("proposerName")} />
          {errors.proposerName && (
            <p className="text-red-500 text-xs mt-1">{errors.proposerName}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Proposer Membership No. *
          </label>
          <input className={inputClass} {...register("proposerMembershipNo")} />
          {errors.proposerMembershipNo && (
            <p className="text-red-500 text-xs mt-1">
              {errors.proposerMembershipNo}
            </p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Seconder Name *
          </label>
          <input className={inputClass} {...register("seconderName")} />
          {errors.seconderName && (
            <p className="text-red-500 text-xs mt-1">{errors.seconderName}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Seconder Membership No. *
          </label>
          <input className={inputClass} {...register("seconderMembershipNo")} />
          {errors.seconderMembershipNo && (
            <p className="text-red-500 text-xs mt-1">
              {errors.seconderMembershipNo}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Journal / newsletter preference
          </label>
          <select className={inputClass} {...register("journalPreference")}>
            <option value="digital">Digital journal and newsletter</option>
            <option value="print">Printed journal where available</option>
            <option value="both">Digital and printed updates</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Other society membership
          </label>
          <input
            className={inputClass}
            placeholder="AIOS, OCI, academic society..."
            {...register("otherAssociationName")}
          />
        </div>
      </div>

      <div className="rounded-2xl border border-purple-200 bg-purple-50 p-4">
        <label className="flex items-start gap-3">
          <input
            type="checkbox"
            {...register("fellowshipInterest")}
            className="mt-1 h-4 w-4 rounded border-purple-300 text-purple-600 focus:ring-purple-500"
          />
          <span>
            <span className="block text-sm font-bold text-purple-900">
              I am interested in Fellowship review
            </span>
            <span className="mt-1 block text-sm leading-6 text-purple-800">
              Fellowship is kept separate from Student and Practitioner
              membership. It can be reviewed after membership eligibility,
              professional contribution, and society approval.
            </span>
          </span>
        </label>
        {fellowshipInterest && (
          <div className="mt-4">
            <label className="block text-sm font-medium text-purple-900 mb-1">
              Fellowship area / reason
            </label>
            <input
              className={inputClass}
              placeholder="Clinical practice, research, teaching, society service..."
              {...register("fellowshipArea")}
            />
          </div>
        )}
      </div>

      <div className="rounded-lg border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-800">
        <p className="font-semibold mb-1">Membership Fees</p>
        <p>{getFeeText()}</p>
        <div className="mt-3 grid gap-2 sm:grid-cols-3">
          <div className="rounded-xl bg-white/70 px-3 py-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-amber-700">
              One-time
            </p>
            <p className="mt-1 font-bold text-amber-950">
              {formatRupees(ONE_TIME_APPLICATION_FEE)}
            </p>
            <p className="text-xs text-amber-800">For all applicants</p>
          </div>
          <div className="rounded-xl bg-white/70 px-3 py-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-amber-700">
              Student yearly
            </p>
            <p className="mt-1 font-bold text-amber-950">
              {formatRupees(ANNUAL_RENEWAL_FEES.student)}
            </p>
            <p className="text-xs text-amber-800">Renewable each year</p>
          </div>
          <div className="rounded-xl bg-white/70 px-3 py-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-amber-700">
              Practitioner yearly
            </p>
            <p className="mt-1 font-bold text-amber-950">
              {formatRupees(ANNUAL_RENEWAL_FEES.practitioner)}
            </p>
            <p className="text-xs text-amber-800">Renewable each year</p>
          </div>
        </div>
        <p className="mt-3 text-xs text-amber-900">
          Pay the first-year total shown above and upload the payment proof.
          Fellowship review is separate and does not replace student membership.
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
          Current first-year payable: {formatRupees(firstYearPayable)}. After
          payment, upload the proof below.
        </p>
      </div>

      <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
        <p className="text-sm font-semibold text-gray-800 mb-3">
          Additional attachments
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Applicant photograph
            </label>
            <input type="file" accept="image/*" className={fileClass} {...register("photo")} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              PAN card
            </label>
            <input type="file" accept="image/*,application/pdf" className={fileClass} {...register("panCard")} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Residence proof
            </label>
            <input type="file" accept="image/*,application/pdf" className={fileClass} {...register("addressProof")} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Working proof / institute ID
            </label>
            <input type="file" accept="image/*,application/pdf" className={fileClass} {...register("workingProof")} />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Payment reference / UTR
        </label>
        <input
          className={inputClass}
          placeholder="Optional transaction reference"
          {...register("paymentReference")}
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Proof of payment (screenshot / PDF) *
        </label>
        <input
          type="file"
          accept="image/*,application/pdf"
          {...register("paymentProof")}
          className={fileClass}
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
      className="space-y-6 text-slate-700"
    >
      <div className="rounded-[2rem] border border-blue-100 bg-gradient-to-br from-blue-50 to-white p-5">
        <p className="text-xs font-bold uppercase tracking-[0.24em] text-blue-600">
          Final review
        </p>
        <h2 className="mt-2 text-2xl font-bold text-slate-950">
          Review Your Application
        </h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          Please confirm these details before submitting your membership
          application.
        </p>
      </div>

      <div className="space-y-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 text-sm leading-7 text-slate-700 shadow-sm">
          <h3 className="mb-3 text-base font-bold text-slate-950">
            Personal Details
          </h3>
          <p>
            <span className="font-semibold text-slate-900">Name:</span>{" "}
            {data.fullName || "-"}
          </p>
          <p>
            <span className="font-semibold text-slate-900">
              Father/Husband:
            </span>{" "}
            {data.guardianName || "-"}
          </p>
          <p>
            <span className="font-semibold text-slate-900">Email:</span>{" "}
            {data.email || "-"}
          </p>
          <p>
            <span className="font-semibold text-slate-900">Phone:</span>{" "}
            {data.phone || "-"}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 text-sm leading-7 text-slate-700 shadow-sm">
          <h3 className="mb-3 text-base font-bold text-slate-950">
            Qualification
          </h3>
          <p>
            <span className="font-semibold text-slate-900">Degree:</span>{" "}
            {data.degree || "-"}
          </p>
          <p>
            <span className="font-semibold text-slate-900">Institution:</span>{" "}
            {data.institution || "-"}
          </p>
          <p>
            <span className="font-semibold text-slate-900">Registration:</span>{" "}
            {data.registrationNumber || "-"}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 text-sm leading-7 text-slate-700 shadow-sm">
          <h3 className="mb-3 text-base font-bold text-slate-950">
            Membership
          </h3>
          <p>
            <span className="font-semibold text-slate-900">Type:</span>{" "}
            {data.membershipType || "-"}
          </p>
          <p>
            <span className="font-semibold text-slate-900">
              First-year payable:
            </span>{" "}
            {data.membershipType
              ? formatRupees(
                  ONE_TIME_APPLICATION_FEE +
                    (ANNUAL_RENEWAL_FEES[data.membershipType] || 0)
                )
              : "-"}
          </p>
          <p>
            <span className="font-semibold text-slate-900">
              Fellowship interest:
            </span>{" "}
            {data.fellowshipInterest ? "Yes" : "No"}
          </p>
          <p>
            <span className="font-semibold text-slate-900">Proposer:</span>{" "}
            {data.proposerName || "-"}
          </p>
          <p>
            <span className="font-semibold text-slate-900">Seconder:</span>{" "}
            {data.seconderName || "-"}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="button"
          onClick={onPrev}
          disabled={submitStatus === "submitting"}
          className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-300 bg-white px-5 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-50 sm:w-auto"
        >
          <ChevronLeft className="h-4 w-4" /> Back
        </button>

        <button
          type="submit"
          disabled={submitStatus === "submitting"}
          className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 text-sm font-bold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
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
