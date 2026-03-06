import prisma from "@/lib/prisma";
import Link from "next/link";
import {
  Search,
  Download,
  Eye,
  CheckCircle,
  XCircle,
  Mail,
  Phone,
  GraduationCap,
  Calendar,
  FileText,
  Check,
  X,
  Clock,
  Building,
  MapPin,
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

        {/* Desktop Table View */}
        <div className="hidden lg:block bg-white rounded-xl shadow overflow-hidden mb-8">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1400px]">
              <thead className="bg-gray-50">
                <tr>
                  <th className="py-4 px-6 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider w-20">
                    ID
                  </th>
                  <th className="py-4 px-6 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider w-60">
                    Name
                  </th>
                  <th className="py-4 px-6 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider w-80">
                    Email
                  </th>
                  <th className="py-4 px-6 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider w-40">
                    Phone
                  </th>
                  <th className="py-4 px-6 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider w-80">
                    Degree
                  </th>
                  <th className="py-4 px-6 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider w-60">
                    Institution
                  </th>
                  <th className="py-4 px-6 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider w-40">
                    Membership
                  </th>
                  <th className="py-4 px-6 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider w-32">
                    Status
                  </th>
                  <th className="py-4 px-6 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider w-40">
                    Registered
                  </th>
                  <th className="py-4 px-6 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider w-48">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {members.map((member) => (
                  <tr key={member.id} className="hover:bg-gray-50 transition">
                    <td className="py-4 px-6 whitespace-nowrap">
                      <div className="font-medium text-gray-900">
                        #{member.id}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="font-medium text-gray-900">
                        {member.fullName}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-start gap-2">
                        <Mail className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 break-all">
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
                      <div className="flex items-center gap-2">
                        <GraduationCap className="w-4 h-4 text-gray-400 flex-shrink-0" />
                        <span className="text-gray-700">{member.degree}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <Building className="w-4 h-4 text-gray-400 flex-shrink-0" />
                        <span className="text-gray-700">
                          {member.institution || "-"}
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
                          {new Date(member.createdAt).toLocaleDateString(
                            "en-GB"
                          )}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/admin/members/${member.id}`}
                          className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition text-sm font-medium"
                          title="View Full Details"
                        >
                          <Eye className="w-4 h-4" />
                          View
                        </Link>
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

        {/* Mobile Card View */}
        <div className="lg:hidden space-y-4">
          {members.map((member) => (
            <div
              key={member.id}
              className="bg-white rounded-xl shadow p-5 hover:shadow-md transition"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="max-w-[70%]">
                  <div
                    className="text-lg font-semibold text-gray-900 truncate"
                    title={member.fullName}
                  >
                    {member.fullName}
                  </div>
                  <p className="text-sm text-gray-500 mt-1">ID: #{member.id}</p>
                </div>
                <div className="flex items-center gap-2">
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
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  <span className="text-gray-700 truncate" title={member.email}>
                    {member.email}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  <span className="text-gray-700 truncate" title={member.phone}>
                    {member.phone}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <GraduationCap className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  <span
                    className="text-gray-700 truncate"
                    title={member.degree}
                  >
                    {member.degree}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Building className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  <span
                    className="text-gray-700 truncate"
                    title={member.institution || "Not specified"}
                  >
                    {member.institution || "Not specified"}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  <span className="text-gray-700 truncate">
                    Registered:{" "}
                    {new Date(member.createdAt).toLocaleDateString("en-GB")}
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-center mt-5 pt-4 border-t">
                <div className="flex gap-2">
                  <button
                    className="p-2 text-green-600 hover:text-green-700 hover:bg-green-50 rounded-lg transition"
                    title="Approve"
                  >
                    <CheckCircle size={18} />
                  </button>
                  <button
                    className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition"
                    title="Reject"
                  >
                    <XCircle size={18} />
                  </button>
                </div>
                <Link
                  href={`/admin/members/${member.id}`}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
                >
                  <Eye size={16} />
                  View Details
                </Link>
              </div>
            </div>
          ))}

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
