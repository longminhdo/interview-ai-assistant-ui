"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Mic, MicOff } from "lucide-react"

interface VoiceVisualizationProps {
  aiStatus: "listening" | "thinking" | "speaking" | "waiting"
  isRecording: boolean
  selectedPersona?: {
    id: string
    name: string
    avatar: string
  }
  onMicToggle: () => void
  disabled?: boolean
}

export function VoiceVisualization({
  aiStatus,
  isRecording,
  selectedPersona,
  onMicToggle,
  disabled = false,
}: VoiceVisualizationProps) {
  return (
    <div className="relative flex items-center justify-center w-80 h-80">
      {/* Subtle outer ring for active states */}
      {(aiStatus === "speaking" || isRecording) && (
        <div
          className={`absolute rounded-full border opacity-20 ${
            aiStatus === "speaking" ? "border-blue-300" : "border-green-300"
          }`}
          style={{
            width: "280px",
            height: "280px",
            animation: "pulse 3s ease-in-out infinite",
          }}
        />
      )}

      {/* Main interactive circle */}
      <button
        className={`relative w-48 h-48 rounded-full flex items-center justify-center transition-all duration-500 ease-out ${
          aiStatus === "speaking"
            ? "bg-blue-500 shadow-lg"
            : aiStatus === "listening"
              ? isRecording
                ? "bg-green-500 shadow-lg"
                : "bg-green-400 shadow-md hover:shadow-lg hover:scale-[1.02]"
              : aiStatus === "thinking"
                ? "bg-yellow-500 shadow-lg"
                : "bg-gray-400 shadow-md"
        } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
        onClick={onMicToggle}
        disabled={disabled || aiStatus !== "listening"}
      >
        {/* Content inside circle */}
        {aiStatus === "speaking" ? (
          <Avatar className="h-20 w-20">
            <AvatarImage src={selectedPersona?.avatar || "/placeholder.svg"} />
            <AvatarFallback className="text-2xl font-semibold text-blue-500 bg-white">AI</AvatarFallback>
          </Avatar>
        ) : (
          <div className="text-white">
            {isRecording ? (
              <div className="flex flex-col items-center">
                <MicOff className="h-10 w-10 mb-3" />
                <div className="flex items-center space-x-1">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div
                      key={i}
                      className="w-1 bg-white/80 rounded-full"
                      style={{
                        height: `${8 + Math.sin(Date.now() / 300 + i) * 4}px`,
                        animation: `pulse 1.5s ease-in-out infinite`,
                        animationDelay: `${i * 0.2}s`,
                      }}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <Mic className="h-10 w-10" />
            )}
          </div>
        )}

        {/* Subtle thinking indicator */}
        {aiStatus === "thinking" && (
          <div
            className="absolute inset-0 rounded-full bg-white/10"
            style={{ animation: "pulse 2s ease-in-out infinite" }}
          />
        )}
      </button>

      {/* Minimal status indicator */}
      <div
        className={`absolute bottom-8 right-8 w-3 h-3 rounded-full transition-colors duration-300 ${
          aiStatus === "speaking"
            ? "bg-blue-400"
            : aiStatus === "listening"
              ? "bg-green-400"
              : aiStatus === "thinking"
                ? "bg-yellow-400"
                : "bg-gray-400"
        }`}
      />
    </div>
  )
}
