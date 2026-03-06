import prisma from "@/lib/prisma";
import Link from "next/link";
import {
  Search,
  Filter,
  Download,
  Eye,
  EyeOff,
  CheckCircle,
  XCircle,
  Mail,
  Phone,
  User,
  GraduationCap,
  Calendar,
  ChevronRight,
  ChevronDown,
  X,
  Check,
  Clock,
  FileText,
  MapPin,
  BookOpen,
  Briefcase,
  IdCard,
  Globe,
  Edit,
  Building,
  Award,
  CreditCard,
} from "lucide-react";

export default async function MembersPage({ searchParams }) {
  const status = searchParams?.status || "all";

  const whereClause = status === "all" ? {} : { status: status };

  const members = await prisma.member.findMany({
    where: whereClause,
    orderBy: { createdAt: "desc" },
  });

  // Function to get status icon
  const getStatusIcon = (status) => {
    switch (status) {
      case "approved":
        return <Check className="w-4 h-4 text-green-600" />;
      case "rejected":
        return <X className="w-4 h-4 text-red-600" />;
      default:
        return <Clock className="w-4 h-4 text-yellow-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <nav className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link
                href="/admin/dashboard"
                className="text-gray-600 hover:text-blue-600 flex items-center gap-1"
              >
                ← Back to Dashboard
              </Link>
            </div>
            <Link
              href="/admin/dashboard"
              className="text-sm text-gray-600 hover:text-blue-600"
            >
              Admin Panel
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Member Management
          </h1>
          <p className="text-gray-600">
            Total {members.length} members registered
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Search members by name, email, or phone..."
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <Link
                href="/admin/members"
                className={`px-4 py-2.5 rounded-lg font-medium transition ${
                  status === "all"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                All
              </Link>
              <Link
                href="/admin/members?status=pending"
                className={`px-4 py-2.5 rounded-lg font-medium transition ${
                  status === "pending"
                    ? "bg-yellow-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Pending
              </Link>
              <Link
                href="/admin/members?status=approved"
                className={`px-4 py-2.5 rounded-lg font-medium transition ${
                  status === "approved"
                    ? "bg-green-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Approved
              </Link>
            </div>

            <button className="flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium transition">
              <Download size={18} />
              Export
            </button>
          </div>
        </div>

        {/* Client Component Wrapper for Expandable Rows */}
        <div className="bg-white rounded-xl shadow overflow-hidden mb-8">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="py-4 px-6 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider whitespace-nowrap">
                    ID
                  </th>
                  <th className="py-4 px-6 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider min-w-[120px]">
                    Name
                  </th>
                  <th className="py-4 px-6 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider min-w-[180px]">
                    Email
                  </th>
                  <th className="py-4 px-6 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider whitespace-nowrap">
                    Phone
                  </th>
                  <th className="py-4 px-6 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider min-w-[100px]">
                    Degree
                  </th>
                  <th className="py-4 px-6 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider whitespace-nowrap">
                    Membership
                  </th>
                  <th className="py-4 px-6 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider whitespace-nowrap">
                    Status
                  </th>
                  <th className="py-4 px-6 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider whitespace-nowrap">
                    Registered
                  </th>
                  <th className="py-4 px-6 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider whitespace-nowrap">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {members.map((member) => (
                  <ExpandableRow
                    key={member.id}
                    member={member}
                    getStatusIcon={getStatusIcon}
                  />
                ))}
              </tbody>
            </table>
          </div>

          {members.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <FileText className="w-12 h-12 mx-auto text-gray-300 mb-4" />
              <p className="text-lg">No members found</p>
              <p className="text-sm mt-1">
                {status !== "all"
                  ? `No ${status} members found`
                  : "No members have registered yet"}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Client Component for Expandable Row
function ExpandableRow({ member, getStatusIcon }) {
  // This is a Client Component - must be in a separate file or marked with 'use client'
  // For simplicity, we'll include it here with a wrapper

  const ExpandableRowContent = () => {
    "use client";

    const [isExpanded, setIsExpanded] = useState(false);

    const formatDate = (date) => {
      return new Date(date).toLocaleDateString("en-GB", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    };

    return (
      <>
        {/* Main Table Row */}
        <tr className="hover:bg-gray-50 transition">
          <td className="py-4 px-6 whitespace-nowrap">
            <div className="font-medium text-gray-900">#{member.id}</div>
          </td>
          <td className="py-4 px-6">
            <div
              className="font-medium text-gray-900 max-w-[150px] truncate"
              title={member.fullName}
            >
              {member.fullName}
            </div>
          </td>
          <td className="py-4 px-6">
            <div className="flex items-center gap-2 max-w-[200px]">
              <Mail className="w-4 h-4 text-gray-400 flex-shrink-0" />
              <span
                className="text-gray-700 truncate hover:text-clip hover:whitespace-normal hover:absolute hover:z-10 hover:bg-white hover:shadow-lg hover:p-2 hover:rounded hover:max-w-xs cursor-help"
                title={member.email}
              >
                {member.email}
              </span>
            </div>
          </td>
          <td className="py-4 px-6 whitespace-nowrap">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-gray-400 flex-shrink-0" />
              <span className="text-gray-700">{member.phone}</span>
            </div>
          </td>
          <td className="py-4 px-6">
            <div className="flex items-center gap-2 max-w-[120px]">
              <GraduationCap className="w-4 h-4 text-gray-400 flex-shrink-0" />
              <span className="text-gray-700 truncate" title={member.degree}>
                {member.degree}
              </span>
            </div>
          </td>
          <td className="py-4 px-6 whitespace-nowrap">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
              {member.membershipType}
            </span>
          </td>
          <td className="py-4 px-6 whitespace-nowrap">
            <div className="flex items-center gap-2">
              {getStatusIcon(member.status)}
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  member.status === "approved"
                    ? "bg-green-100 text-green-800"
                    : member.status === "rejected"
                    ? "bg-red-100 text-red-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {member.status || "pending"}
              </span>
            </div>
          </td>
          <td className="py-4 px-6 whitespace-nowrap">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gray-400 flex-shrink-0" />
              <span className="text-gray-600 text-sm">
                {new Date(member.createdAt).toLocaleDateString("en-GB")}
              </span>
            </div>
          </td>
          <td className="py-4 px-6 whitespace-nowrap">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition text-sm font-medium"
                title={isExpanded ? "Hide Details" : "View Details"}
              >
                {isExpanded ? (
                  <>
                    <EyeOff className="w-4 h-4" />
                    Hide
                  </>
                ) : (
                  <>
                    <Eye className="w-4 h-4" />
                    View
                  </>
                )}
              </button>
              <div className="flex items-center gap-1">
                <button
                  className="p-1.5 text-green-600 hover:text-green-700 hover:bg-green-50 rounded transition"
                  title="Approve"
                >
                  <CheckCircle size={18} />
                </button>
                <button
                  className="p-1.5 text-red-600 hover:text-red-700 hover:bg-red-50 rounded transition"
                  title="Reject"
                >
                  <XCircle size={18} />
                </button>
              </div>
            </div>
          </td>
        </tr>

        {/* Expanded Details Row */}
        {isExpanded && (
          <tr className="bg-blue-50">
            <td colSpan="9" className="py-6 px-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Personal Information Column */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Personal Information
                  </h3>
                  <div className="space-y-3 pl-6">
                    <div>
                      <p className="text-xs text-gray-500">Full Name</p>
                      <p className="font-medium text-gray-900">
                        {member.fullName}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Email Address</p>
                      <p className="font-medium text-gray-900 break-all">
                        {member.email}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Phone Number</p>
                      <p className="font-medium text-gray-900">
                        {member.phone}
                      </p>
                    </div>
                    {/* Add more personal fields as needed */}
                  </div>
                </div>

                {/* Academic Information Column */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                    <GraduationCap className="w-4 h-4" />
                    Academic Information
                  </h3>
                  <div className="space-y-3 pl-6">
                    <div>
                      <p className="text-xs text-gray-500">
                        Degree/Qualification
                      </p>
                      <p className="font-medium text-gray-900">
                        {member.degree}
                      </p>
                    </div>
                    {member.institution && (
                      <div>
                        <p className="text-xs text-gray-500">Institution</p>
                        <p className="font-medium text-gray-900">
                          {member.institution}
                        </p>
                      </div>
                    )}
                    {member.yearOfPassing && (
                      <div>
                        <p className="text-xs text-gray-500">Year of Passing</p>
                        <p className="font-medium text-gray-900">
                          {member.yearOfPassing}
                        </p>
                      </div>
                    )}
                    {member.specialization && (
                      <div>
                        <p className="text-xs text-gray-500">Specialization</p>
                        <p className="font-medium text-gray-900">
                          {member.specialization}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Membership & Registration Column */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                    <IdCard className="w-4 h-4" />
                    Membership Details
                  </h3>
                  <div className="space-y-3 pl-6">
                    <div>
                      <p className="text-xs text-gray-500">Membership Type</p>
                      <p className="font-medium text-gray-900 capitalize">
                        {member.membershipType}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Status</p>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          member.status === "approved"
                            ? "bg-green-100 text-green-800"
                            : member.status === "rejected"
                            ? "bg-red-100 text-red-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {member.status || "pending"}
                      </span>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Registration Date</p>
                      <p className="font-medium text-gray-900">
                        {formatDate(member.createdAt)}
                      </p>
                    </div>
                    {member.paymentStatus && (
                      <div>
                        <p className="text-xs text-gray-500">Payment Status</p>
                        <p className="font-medium text-gray-900 capitalize">
                          {member.paymentStatus}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Additional Information Column - if you have more fields */}
                {(member.address ||
                  member.city ||
                  member.state ||
                  member.country) && (
                  <div className="space-y-4 md:col-span-2 lg:col-span-3">
                    <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      Address Details
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pl-6">
                      {member.address && (
                        <div>
                          <p className="text-xs text-gray-500">Address</p>
                          <p className="font-medium text-gray-900">
                            {member.address}
                          </p>
                        </div>
                      )}
                      {member.city && (
                        <div>
                          <p className="text-xs text-gray-500">City</p>
                          <p className="font-medium text-gray-900">
                            {member.city}
                          </p>
                        </div>
                      )}
                      {member.state && (
                        <div>
                          <p className="text-xs text-gray-500">State</p>
                          <p className="font-medium text-gray-900">
                            {member.state}
                          </p>
                        </div>
                      )}
                      {member.country && (
                        <div>
                          <p className="text-xs text-gray-500">Country</p>
                          <p className="font-medium text-gray-900">
                            {member.country}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Notes or Additional Info */}
                {member.notes && (
                  <div className="space-y-4 md:col-span-2 lg:col-span-3">
                    <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      Additional Notes
                    </h3>
                    <div className="pl-6">
                      <div className="bg-white p-4 rounded-lg border">
                        <p className="text-gray-700">{member.notes}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Action Buttons in Expanded View */}
                <div className="md:col-span-2 lg:col-span-3 pt-4 border-t">
                  <div className="flex flex-wrap gap-3 justify-end">
                    <Link
                      href={`/admin/members/${member.id}/edit`}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium"
                    >
                      <Edit className="w-4 h-4" />
                      Edit Member
                    </Link>
                    {member.status !== "approved" && (
                      <button
                        className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium"
                        onClick={() => console.log("Approve:", member.id)}
                      >
                        <CheckCircle className="w-4 h-4" />
                        Approve Membership
                      </button>
                    )}
                    {member.status !== "rejected" && (
                      <button
                        className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-medium"
                        onClick={() => console.log("Reject:", member.id)}
                      >
                        <XCircle className="w-4 h-4" />
                        Reject Application
                      </button>
                    )}
                    <button
                      onClick={() => setIsExpanded(false)}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition font-medium"
                    >
                      <EyeOff className="w-4 h-4" />
                      Close Details
                    </button>
                  </div>
                </div>
              </div>
            </td>
          </tr>
        )}
      </>
    );
  };

  // We need to import useState for the client component
  const { useState } = require("react");
  return <ExpandableRow />;
}
