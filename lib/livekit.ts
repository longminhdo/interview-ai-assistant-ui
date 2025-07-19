import { AccessToken } from "livekit-server-sdk"

export function generateAccessToken(roomName: string, participantName: string) {
  const apiKey = process.env.NEXT_PUBLIC_LIVEKIT_API_KEY
  const apiSecret = process.env.NEXT_PUBLIC_LIVEKIT_API_SECRET
  const wsUrl = process.env.NEXT_PUBLIC_LIVEKIT_URL

  if (!apiKey || !apiSecret || !wsUrl) {
    throw new Error("Missing LiveKit environment variables")
  }

  const at = new AccessToken(apiKey, apiSecret, {
    identity: participantName,
    name: participantName,
  })

  at.addGrant({
    room: roomName,
    roomJoin: true,
    canPublish: true,
    canSubscribe: true,
    canPublishData: true,
  })

  return at.toJwt()
}

export const livekitConfig = {
  wsUrl: process.env.NEXT_PUBLIC_LIVEKIT_URL || "ws://localhost:7880",
  apiKey: process.env.LIVEKIT_API_KEY,
  apiSecret: process.env.LIVEKIT_API_SECRET,
}
