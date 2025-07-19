import { type NextRequest, NextResponse } from "next/server"
import { generateAccessToken } from "@/lib/livekit"

export async function POST(request: NextRequest) {
  try {
    console.log('object');
    const { roomName, participantName } = await request.json()

    if (!roomName || !participantName) {
      return NextResponse.json({ error: "Missing roomName or participantName" }, { status: 400 })
    }

    const token = generateAccessToken(roomName, participantName)

    return NextResponse.json({ token })
  } catch (error) {
    console.error("Error generating token:", error)
    return NextResponse.json({ error: "Failed to generate token" }, { status: 500 })
  }
}
