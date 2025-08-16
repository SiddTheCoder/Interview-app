"use client";

import React, { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { useAppSelector } from "@/store/hooks";
import { Mic, MicOff, User, Camera } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function UserCamera() {
  const { data: session } = useSession();
  const user = session?.user;

  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  const [videoDevices, setVideoDevices] = useState<MediaDeviceInfo[]>([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState<string | null>(null);

  const { isCameraOn, isMicOn } = useAppSelector((state) => state.localState);

  // Fetch devices on mount
  useEffect(() => {
    const getDevices = async () => {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const cams = devices.filter((d) => d.kind === "videoinput");
        setVideoDevices(cams);

        // Default to laptop integrated
        let preferredDevice =
          cams.find((d) => /integrated|built-in|default/i.test(d.label)) ||
          cams[0];

        if (preferredDevice) {
          setSelectedDeviceId(preferredDevice.deviceId);
          await startStream(preferredDevice.deviceId);
        }
      } catch (err) {
        console.error("Error fetching devices:", err);
      }
    };

    getDevices();

    // Listen for device change (e.g. DroidCam connects later)
    navigator.mediaDevices.addEventListener("devicechange", getDevices);

    return () =>
      navigator.mediaDevices.removeEventListener("devicechange", getDevices);
  }, []);

  // Function to start camera stream for a given device
  const startStream = async (deviceId: string) => {
    try {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }

      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { deviceId: { exact: deviceId } },
        audio: false,
      });

      setStream(mediaStream);
      if (videoRef.current) videoRef.current.srcObject = mediaStream;
      setHasPermission(true);
    } catch (err) {
      console.error("Error accessing selected camera:", err);
      setHasPermission(false);

      // fallback to default laptop cam
      const fallback =
        videoDevices.find((d) =>
          /integrated|built-in|default/i.test(d.label)
        ) || videoDevices[0];

      if (fallback) {
        console.log("Falling back to default camera:", fallback.label);
        setSelectedDeviceId(fallback.deviceId);
        startStream(fallback.deviceId);
      }
    }
  };

  // Handle global camera toggle
  useEffect(() => {
    if (!stream) return;
    const videoTrack = stream.getVideoTracks()[0];
    if (videoTrack) videoTrack.enabled = isCameraOn;
  }, [isCameraOn, stream]);

  return (
    <div className="mt-auto pt-4 border-t border-slate-700">
      <div className="flex flex-col space-y-2 h-52 w-64 bg-black/40 rounded-md relative overflow-hidden">
        {hasPermission === false && (
          <div className="flex flex-col items-center justify-center w-full h-full text-red-500 text-sm">
            <span>Camera access denied</span>
          </div>
        )}

        {/* Video always mounted */}
        {hasPermission && (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className={`w-full h-full object-cover rounded-md transition-opacity duration-300 ${
              isCameraOn ? "opacity-100" : "opacity-0"
            }`}
          />
        )}

        {/* Overlay fallback when camera off */}
        {hasPermission && !isCameraOn && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-white bg-black/50">
            <User className="w-10 h-10 text-gray-400" />
            <span className="text-xs">Camera is off</span>
          </div>
        )}

        {/* Overlay status icons */}
        <div className="absolute bottom-0 right-0 flex flex-col items-end p-1 gap-1">
          <div className="flex items-center gap-1 bg-black/50 px-1 rounded">
            {isMicOn ? (
              <Mic className="w-4 h-4 text-green-500" />
            ) : (
              <MicOff className="w-4 h-4 text-red-500" />
            )}
            <span className="text-xs text-white">
              {isMicOn ? "Mic On" : "Mic Off"}
            </span>
          </div>
          <div className="flex items-center gap-1 bg-black/50 px-1 rounded">
            <div
              className={`w-3 h-3 rounded-full ${
                isCameraOn ? "bg-green-600" : "bg-red-600"
              }`}
            ></div>
            <span className="text-xs text-white">
              {isCameraOn ? "Camera On" : "Camera Off"}
            </span>
          </div>
        </div>

        {/* Footer with username + device dropdown */}
        <div className="absolute bottom-0 left-0 w-full bg-black/50 flex items-center justify-between px-2 py-1 text-xs text-white rounded-tr-md">
          <span>{user?.fullName || user?.name || "Profile User"}</span>
          {videoDevices.length > 1 && (
            <Select
              value={selectedDeviceId || ""}
              onValueChange={(deviceId: any) => {
                setSelectedDeviceId(deviceId);
                startStream(deviceId);
              }}
            >
              <SelectTrigger className="w-28 h-6 text-xs">
                <SelectValue placeholder="Select Camera" />
              </SelectTrigger>
              <SelectContent>
                {videoDevices.map((device) => (
                  <SelectItem key={device.deviceId} value={device.deviceId}>
                    {device.label || "Unknown Camera"}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserCamera;
