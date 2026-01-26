import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { email, archetype, secondaryArchetype } = await request.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Valid email required" },
        { status: 400 }
      );
    }

    const LOOPS_API_KEY = process.env.LOOPS_API_KEY;

    if (!LOOPS_API_KEY) {
      console.error("LOOPS_API_KEY not configured");
      return NextResponse.json(
        { error: "Email service not configured" },
        { status: 500 }
      );
    }

    const response = await fetch("https://app.loops.so/api/v1/contacts/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${LOOPS_API_KEY}`,
      },
      body: JSON.stringify({
        email,
        source: "learning-profile-builder",
        userGroup: "weekly-checkin",
        archetype: archetype || null,
        secondaryArchetype: secondaryArchetype || null,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("Loops API error:", errorData);

      // If contact already exists, that's fine
      if (response.status === 409) {
        return NextResponse.json({ success: true, message: "Already subscribed" });
      }

      return NextResponse.json(
        { error: "Failed to subscribe" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Subscribe error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
