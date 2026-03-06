import prisma from "@/lib/prisma";
import Link from "next/link";
import { Search, Download, FileText, Check, X, Clock } from "lucide-react";
import { ExpandableRow } from "./ExpandableRow";

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

        {/* Members Table with Expandable Rows */}
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
