import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { v4 as uuidv4 } from "uuid";

const textFields = [
  "gender",
  "nationality",
  "city",
  "state",
  "pincode",
  "institution",
  "university",
  "yearOfPassing",
  "registrationNumber",
  "registrationCouncil",
  "specialty",
  "currentDesignation",
  "workplace",
  "otherAssociationName",
  "fellowshipArea",
  "journalPreference",
  "paymentReference",
  "proposerName",
  "proposerMembershipNo",
  "proposerContact",
  "proposerEmail",
  "seconderName",
  "seconderMembershipNo",
  "seconderContact",
  "seconderEmail",
];

const fileFields = {
  degreeCertificate: "degreeCertificatePath",
  paymentProof: "paymentProofPath",
  photo: "photoPath",
  registrationCertificate: "registrationCertificatePath",
  panCard: "panCardPath",
  addressProof: "addressProofPath",
  workingProof: "workingProofPath",
};

async function saveUpload(file, prefix) {
  if (!file || file.size <= 0) return null;

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const fileName = `${prefix}_${uuidv4()}${path.extname(file.name)}`;
  const uploadsDir = path.join(process.cwd(), "public/uploads");
  const uploadPath = path.join(uploadsDir, fileName);

  await mkdir(uploadsDir, { recursive: true });
  await writeFile(uploadPath, buffer);

  return `/uploads/${fileName}`;
}

async function createMemberRecord(data, uploadPaths) {
  const memberData = {
    ...data,
    ...uploadPaths,
    status: "pending",
  };

  try {
    return await prisma.member.create({
      data: memberData,
    });
  } catch (error) {
    const message = String(error?.message || "");
    const canUseRawFallback =
      error?.name === "PrismaClientValidationError" ||
      message.includes("Unknown arg") ||
      message.includes("Unknown argument");

    if (!canUseRawFallback) {
      throw error;
    }

    const rows = await prisma.$queryRaw`
      INSERT INTO "Member" (
        "fullName",
        "guardianName",
        "dateOfBirth",
        "gender",
        "nationality",
        "occupation",
        "phone",
        "email",
        "panNumber",
        "aadhaarNumber",
        "permanentAddress",
        "correspondenceAddress",
        "city",
        "state",
        "pincode",
        "sameAddress",
        "degree",
        "institution",
        "university",
        "yearOfPassing",
        "registrationNumber",
        "registrationCouncil",
        "specialty",
        "currentDesignation",
        "workplace",
        "degreeCertificatePath",
        "registrationCertificatePath",
        "membershipType",
        "otherAssociationName",
        "fellowshipInterest",
        "fellowshipArea",
        "journalPreference",
        "paymentReference",
        "proposerName",
        "proposerMembershipNo",
        "proposerContact",
        "proposerEmail",
        "seconderName",
        "seconderMembershipNo",
        "seconderContact",
        "seconderEmail",
        "photoPath",
        "panCardPath",
        "addressProofPath",
        "workingProofPath",
        "paymentProofPath",
        "declarationAccepted",
        "status",
        "createdAt",
        "updatedAt"
      )
      VALUES (
        ${memberData.fullName},
        ${memberData.guardianName},
        ${memberData.dateOfBirth},
        ${memberData.gender},
        ${memberData.nationality},
        ${memberData.occupation},
        ${memberData.phone},
        ${memberData.email},
        ${memberData.panNumber},
        ${memberData.aadhaarNumber},
        ${memberData.permanentAddress},
        ${memberData.correspondenceAddress},
        ${memberData.city},
        ${memberData.state},
        ${memberData.pincode},
        ${memberData.sameAddress},
        ${memberData.degree},
        ${memberData.institution},
        ${memberData.university},
        ${memberData.yearOfPassing},
        ${memberData.registrationNumber},
        ${memberData.registrationCouncil},
        ${memberData.specialty},
        ${memberData.currentDesignation},
        ${memberData.workplace},
        ${memberData.degreeCertificatePath},
        ${memberData.registrationCertificatePath},
        ${memberData.membershipType},
        ${memberData.otherAssociationName},
        ${memberData.fellowshipInterest},
        ${memberData.fellowshipArea},
        ${memberData.journalPreference},
        ${memberData.paymentReference},
        ${memberData.proposerName},
        ${memberData.proposerMembershipNo},
        ${memberData.proposerContact},
        ${memberData.proposerEmail},
        ${memberData.seconderName},
        ${memberData.seconderMembershipNo},
        ${memberData.seconderContact},
        ${memberData.seconderEmail},
        ${memberData.photoPath},
        ${memberData.panCardPath},
        ${memberData.addressProofPath},
        ${memberData.workingProofPath},
        ${memberData.paymentProofPath},
        ${memberData.declarationAccepted},
        ${memberData.status},
        NOW(),
        NOW()
      )
      RETURNING "id", "fullName", "email", "status"
    `;

    return rows[0];
  }
}

export async function POST(request) {
  try {
    const formData = await request.formData();
    const dateOfBirthValue = formData.get("dateOfBirth");

    // Extract form data
    const data = {
      fullName: formData.get("fullName"),
      guardianName: formData.get("guardianName"),
      dateOfBirth: dateOfBirthValue ? new Date(dateOfBirthValue) : null,
      occupation: formData.get("occupation"),
      phone: formData.get("phone"),
      email: formData.get("email"),
      panNumber: formData.get("panNumber") || null,
      aadhaarNumber: formData.get("aadhaarNumber") || null,
      permanentAddress: formData.get("permanentAddress"),
      correspondenceAddress: formData.get("correspondenceAddress") || null,
      sameAddress: formData.get("sameAddress") === "true",
      degree: formData.get("degree"),
      membershipType: formData.get("membershipType"),
      fellowshipInterest: formData.get("fellowshipInterest") === "true",
      declarationAccepted: formData.get("declarationAccepted") === "true",
    };

    textFields.forEach((field) => {
      const value = formData.get(field);
      data[field] = value ? String(value) : null;
    });

    // Validate required fields
    const requiredFields = [
      "fullName",
      "guardianName",
      "dateOfBirth",
      "occupation",
      "phone",
      "email",
      "permanentAddress",
      "degree",
      "membershipType",
    ];

    for (const field of requiredFields) {
      if (!data[field]) {
        return NextResponse.json(
          { error: `${field} is required` },
          { status: 400 }
        );
      }
    }

    const uploadPaths = {};

    for (const [fieldName, dbFieldName] of Object.entries(fileFields)) {
      uploadPaths[dbFieldName] = await saveUpload(
        formData.get(fieldName),
        fieldName
      );
    }

    // Create member in database
    const member = await createMemberRecord(data, uploadPaths);

    // Send confirmation email (you'll need to implement this)
    // await sendConfirmationEmail(data.email, data.fullName)

    return NextResponse.json({
      success: true,
      message: "Registration submitted successfully!",
      memberId: member.id,
      data: {
        name: member.fullName,
        email: member.email,
        status: member.status,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);

    // Handle duplicate email/phone
    if (error.code === "P2002") {
      const field = error.meta?.target?.[0];
      return NextResponse.json(
        { error: `${field} already registered` },
        { status: 400 }
      );
    }

    if (error.code === "P2010" && error.meta?.code === "23505") {
      return NextResponse.json(
        { error: "Email or phone already registered" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Registration failed. Please try again." },
      { status: 500 }
    );
  }
}
