"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Users,
  FileText,
  DollarSign,
  CheckCircle,
  Clock,
  TrendingUp,
  Download,
  BarChart3,
  UserCheck,
  Mail,
  Settings,
  LogOut,
  Eye,
  Shield,
} from "lucide-react";

export default function AdminDashboardPage() {
  const router = useRouter();
  const [stats, setStats] = useState({
    totalMembers: 0,
    pendingMembers: 0,
    approvedMembers: 0,
    totalArticles: 0,
    revenue: 0,
  });

  const [recentMembers, setRecentMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchStats = useCallback(async () => {
    try {
      const memberRes = await fetch("/api/members");
      const memberData = await memberRes.json();

      const articleRes = await fetch("/api/articles");
      const articleData = await articleRes.json();

      if (memberData.success && articleData.success) {
        setStats({
          totalMembers: memberData.count,
          pendingMembers: memberData.pending,
          approvedMembers: memberData.approved,
          totalArticles: articleData.count,
          revenue: 0,
        });
      }
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  }, []);

  const fetchRecentMembers = useCallback(async () => {
    try {
      const response = await fetch("/api/members?limit=5");
      const data = await response.json();
      if (data.success) {
        setRecentMembers(data.members || []);
      }
    } catch (error) {
      console.error("Error fetching recent members:", error);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    router.push("/admin/login");
  };

  useEffect(() => {
    const checkAuth = async () => {
      const isAdmin = localStorage.getItem("isAdmin");
      if (!isAdmin) {
        router.push("/admin/login");
      } else {
        setTimeout(() => {
          setLoading(false);
        }, 0);
      }
    };
    checkAuth();
  }, [router]);

  useEffect(() => {
    if (!loading) {
      setTimeout(() => {
        fetchStats();
        fetchRecentMembers();
      }, 0);
    }
  }, [loading, fetchStats, fetchRecentMembers]);

  const statCards = [
    {
      title: "Total Members",
      value: stats.totalMembers,
      icon: Users,
      color: "blue",
      link: "/admin/members",
    },
    {
      title: "Pending Approval",
      value: stats.pendingMembers,
      icon: Clock,
      color: "orange",
      link: "/admin/members?status=pending",
    },
    {
      title: "Approved Members",
      value: stats.approvedMembers,
      icon: CheckCircle,
      color: "green",
      link: "/admin/members?status=approved",
    },
    {
      title: "Article Submissions",
      value: stats.totalArticles,
      icon: FileText,
      color: "purple",
      link: "/admin/articles",
    },
  ];

  const quickActions = [
    { icon: UserCheck, label: "Approve Members", link: "/admin/members" },
    { icon: Mail, label: "Send Newsletter", link: "/admin/newsletter" },
    { icon: DollarSign, label: "View Payments", link: "/admin/payments" },
    { icon: Settings, label: "Settings", link: "/admin/settings" },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
          <p className="text-lg font-medium text-gray-700">
            Loading admin dashboard...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation - Clean & Sharp */}
      <nav className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <Shield className="text-white" size={22} />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Admin Panel</h1>
                <p className="text-sm text-gray-600">
                  Journal Management System
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/"
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 border border-gray-200 hover:border-gray-300 rounded-lg transition-colors"
              >
                View Public Site
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg border border-transparent transition-colors"
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome Header - Smaller fonts */}
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Welcome, Administrator
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Manage members, articles, and journal operations
          </p>
        </div>

        {/* Stats Grid - Smaller padding, crisp borders */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((stat, index) => {
            const colors = {
              blue: { bg: "bg-blue-100", icon: "text-blue-600" },
              orange: { bg: "bg-orange-100", icon: "text-orange-600" },
              green: { bg: "bg-green-100", icon: "text-green-600" },
              purple: { bg: "bg-purple-100", icon: "text-purple-600" },
            };
            const color = colors[stat.color];

            return (
              <Link
                key={index}
                href={stat.link}
                className="bg-white rounded-lg p-5 border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-200 hover:-translate-y-1"
              >
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-12 h-12 ${color.bg} rounded-lg flex items-center justify-center`}
                  >
                    <stat.icon className={color.icon} size={22} />
                  </div>
                  <TrendingUp className="text-gray-400" size={18} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">
                  {stat.value}
                </h3>
                <p className="text-sm font-medium text-gray-700">
                  {stat.title}
                </p>
              </Link>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Recent Members - Compact layout */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-gray-900">
                  Recent Registrations
                </h2>
                <Link
                  href="/admin/members"
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  View all →
                </Link>
              </div>

              <div className="space-y-3">
                {recentMembers.length === 0 ? (
                  <p className="text-gray-500 text-center py-8 text-sm">
                    No members registered yet
                  </p>
                ) : (
                  recentMembers.map((member) => (
                    <div
                      key={member.id}
                      className="flex items-center justify-between p-4 border border-gray-100 hover:border-gray-200 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-gray-900 text-sm truncate">
                          {member.fullName}
                        </h4>
                        <p className="text-xs text-gray-600 truncate">
                          {member.email}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <span
                            className={`px-2 py-1 text-xs font-medium rounded-full ${
                              member.status === "approved"
                                ? "bg-green-100 text-green-800"
                                : member.status === "pending"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-red-100 text-red-800"
                            }`}
                          >
                            {member.status || "pending"}
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(member.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <Link
                        href={`/admin/members/${member.id}`}
                        className="p-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <Eye size={16} />
                      </Link>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Quick Actions - Compact */}
          <div>
            <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6 shadow-sm">
              <h2 className="text-lg font-bold text-gray-900 mb-6">
                Quick Actions
              </h2>
              <div className="space-y-3">
                {quickActions.map((action, index) => (
                  <Link
                    key={index}
                    href={action.link}
                    className="flex items-center gap-3 p-3 border border-gray-200 hover:border-blue-300 hover:bg-blue-50 rounded-lg transition-all duration-200"
                  >
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <action.icon className="text-blue-600" size={18} />
                    </div>
                    <span className="font-medium text-sm text-gray-900">
                      {action.label}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Export Data - Compact */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-4 text-sm">
                Export Data
              </h3>
              <div className="space-y-3">
                <button className="w-full flex items-center justify-center gap-2 p-3 border border-gray-200 hover:border-green-300 hover:bg-green-50 rounded-lg transition-colors text-sm">
                  <Download size={16} />
                  Export Members (CSV)
                </button>
                <button className="w-full flex items-center justify-center gap-2 p-3 border border-gray-200 hover:border-purple-300 hover:bg-purple-50 rounded-lg transition-colors text-sm">
                  <BarChart3 size={16} />
                  Generate Reports
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
