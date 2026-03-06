import  prisma  from "@/lib/prisma";
import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";
import { v4 as uuidv4 } from "uuid";

export async function POST(request) {
  try {
    const formData = await request.formData();

    // Extract form data
    const data = {
      fullName: formData.get("fullName"),
      guardianName: formData.get("guardianName"),
      dateOfBirth: new Date(formData.get("dateOfBirth")),
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
      declarationAccepted: formData.get("declarationAccepted") === "true",
    };

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

    // Handle file uploads
    const degreeCertificateFile = formData.get("degreeCertificate");
    const paymentProofFile = formData.get("paymentProof");

    let degreeCertificatePath = null;
    let paymentProofPath = null;

    // Upload degree certificate if exists
    if (degreeCertificateFile && degreeCertificateFile.size > 0) {
      const bytes = await degreeCertificateFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const fileName = `degree_${uuidv4()}${path.extname(
        degreeCertificateFile.name
      )}`;
      const uploadPath = path.join(process.cwd(), "public/uploads", fileName);

      await writeFile(uploadPath, buffer);
      degreeCertificatePath = `/uploads/${fileName}`;
    }

    // Upload payment proof
    if (paymentProofFile && paymentProofFile.size > 0) {
      const bytes = await paymentProofFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const fileName = `payment_${uuidv4()}${path.extname(
        paymentProofFile.name
      )}`;
      const uploadPath = path.join(process.cwd(), "public/uploads", fileName);

      await writeFile(uploadPath, buffer);
      paymentProofPath = `/uploads/${fileName}`;
    }

    // Create member in database
    const member = await prisma.member.create({
      data: {
        ...data,
        degreeCertificatePath,
        paymentProofPath,
        status: "pending",
      },
    });

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

    return NextResponse.json(
      { error: "Registration failed. Please try again." },
      { status: 500 }
    );
  }
}
