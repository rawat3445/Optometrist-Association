import prisma from "@/lib/prisma";
import { Link } from "lucide-react";

export default async function MembersPage({ searchParams }) {
  try {
    const status = searchParams?.status || "all";

    const whereClause = status === "all" ? {} : { status: status };

    const members = await prisma.member.findMany({
      where: whereClause,
      orderBy: { createdAt: "desc" },
    });

    return (
      <div>
        <h1>Member Management</h1>
        <p>Total {members.length} members</p>

        <div>
          <Link href="/admin/members">All</Link>
          <Link href="/admin/members?status=pending">Pending</Link>
          <Link href="/admin/members?status=approved">Approved</Link>
        </div>

        <table border="1" style={{ borderCollapse: "collapse", width: "100%" }}>
          <thead>
            <tr style={{ backgroundColor: "#f0f0f0" }}>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Degree</th>
              <th>Membership</th>
              <th>Status</th>
              <th>Registered</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {members.map((member) => (
              <tr key={member.id}>
                <td>#{member.id}</td>
                <td>{member.fullName}</td>
                <td style={{ maxWidth: "200px", wordBreak: "break-all" }}>
                  {member.email}
                </td>
                <td>{member.phone}</td>
                <td>{member.degree}</td>
                <td>{member.membershipType}</td>
                <td>
                  <span
                    style={{
                      padding: "2px 8px",
                      borderRadius: "12px",
                      backgroundColor:
                        member.status === "approved"
                          ? "#d4edda"
                          : member.status === "rejected"
                          ? "#f8d7da"
                          : "#fff3cd",
                      color:
                        member.status === "approved"
                          ? "#155724"
                          : member.status === "rejected"
                          ? "#721c24"
                          : "#856404",
                    }}
                  >
                    {member.status || "pending"}
                  </span>
                </td>
                <td>{new Date(member.createdAt).toLocaleDateString()}</td>
                <td>
                  <a
                    href={`/admin/members/${member.id}`}
                    style={{ marginRight: "8px" }}
                  >
                    View
                  </a>
                  <button style={{ marginRight: "4px" }}>✓</button>
                  <button>✗</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {members.length === 0 && (
          <div style={{ textAlign: "center", padding: "20px" }}>
            No members found
          </div>
        )}
      </div>
    );
  } catch (error) {
    return (
      <div>
        <h1 style={{ color: "red" }}>Error</h1>
        <p>Failed to load members</p>
        <pre>{error.message}</pre>
      </div>
    );
  }
}
