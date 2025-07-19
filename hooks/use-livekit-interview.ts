"use client"

import { useEffect, useState, useCallback } from "react"
import { Room, RoomEvent, type RemoteParticipant, type RemoteTrackPublication, Track } from "livekit-client"

export interface InterviewState {
  isConnected: boolean
  isRecording: boolean
  aiSpeaking: boolean
  connectionQuality: "excellent" | "good" | "poor"
  error: string | null
}

export function useLivekitInterview(token: string, wsUrl: string) {
  const [room] = useState(() => new Room())
  const [state, setState] = useState<InterviewState>({
    isConnected: false,
    isRecording: false,
    aiSpeaking: false,
    connectionQuality: "good",
    error: null,
  })

  const connect = useCallback(async () => {
    try {
      await room.connect(wsUrl, token)
      setState((prev) => ({ ...prev, isConnected: true, error: null }))
    } catch (error) {
      setState((prev) => ({
        ...prev,
        error: error instanceof Error ? error.message : "Connection failed",
      }))
    }
  }, [room, wsUrl, token])

  const disconnect = useCallback(() => {
    room.disconnect()
    setState((prev) => ({ ...prev, isConnected: false }))
  }, [room])

  const startRecording = useCallback(async () => {
    try {
      await room.localParticipant.setMicrophoneEnabled(true)
      setState((prev) => ({ ...prev, isRecording: true }))
    } catch (error) {
      setState((prev) => ({
        ...prev,
        error: error instanceof Error ? error.message : "Failed to start recording",
      }))
    }
  }, [room])

  const stopRecording = useCallback(async () => {
    try {
      await room.localParticipant.setMicrophoneEnabled(false)
      setState((prev) => ({ ...prev, isRecording: false }))
    } catch (error) {
      setState((prev) => ({
        ...prev,
        error: error instanceof Error ? error.message : "Failed to stop recording",
      }))
    }
  }, [room])

  const sendMessage = useCallback(
    (message: string) => {
      const encoder = new TextEncoder()
      const data = encoder.encode(JSON.stringify({ type: "interview_response", content: message }))
      room.localParticipant.publishData(data, { reliable: true })
    },
    [room],
  )

  useEffect(() => {
    const handleTrackSubscribed = (track: RemoteTrackPublication, participant: RemoteParticipant) => {
      if (track.kind === Track.Kind.Audio) {
        setState((prev) => ({ ...prev, aiSpeaking: true }))
      }
    }

    const handleTrackUnsubscribed = (track: RemoteTrackPublication, participant: RemoteParticipant) => {
      if (track.kind === Track.Kind.Audio) {
        setState((prev) => ({ ...prev, aiSpeaking: false }))
      }
    }

    const handleDataReceived = (payload: Uint8Array, participant?: RemoteParticipant) => {
      const decoder = new TextDecoder()
      const message = JSON.parse(decoder.decode(payload))

      if (message.type === "ai_speaking_start") {
        setState((prev) => ({ ...prev, aiSpeaking: true }))
      } else if (message.type === "ai_speaking_end") {
        setState((prev) => ({ ...prev, aiSpeaking: false }))
      }
    }

    const handleConnectionQualityChanged = (quality: any) => {
      let connectionQuality: "excellent" | "good" | "poor" = "good"
      if (quality >= 4) connectionQuality = "excellent"
      else if (quality <= 2) connectionQuality = "poor"

      setState((prev) => ({ ...prev, connectionQuality }))
    }

    room.on(RoomEvent.TrackSubscribed, handleTrackSubscribed)
    room.on(RoomEvent.TrackUnsubscribed, handleTrackUnsubscribed)
    room.on(RoomEvent.DataReceived, handleDataReceived)
    room.on(RoomEvent.ConnectionQualityChanged, handleConnectionQualityChanged)

    return () => {
      room.off(RoomEvent.TrackSubscribed, handleTrackSubscribed)
      room.off(RoomEvent.TrackUnsubscribed, handleTrackUnsubscribed)
      room.off(RoomEvent.DataReceived, handleDataReceived)
      room.off(RoomEvent.ConnectionQualityChanged, handleConnectionQualityChanged)
    }
  }, [room])

  return {
    room,
    state,
    connect,
    disconnect,
    startRecording,
    stopRecording,
    sendMessage,
  }
}
