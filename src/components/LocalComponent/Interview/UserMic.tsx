"use client";

import React, { useEffect, useState } from "react";
import { useAppSelector } from "@/store/hooks";

export default function UserMic() {
  const { isMicOn } = useAppSelector((state) => state.localState);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  useEffect(() => {
    const getMicStream = async () => {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const audioDevices = devices.filter((d) => d.kind === "audioinput");

        if (audioDevices.length === 0) throw new Error("No microphone found");

        // Prefer internal/laptop mic first
        let preferredDevice = audioDevices.find((d) =>
          /integrated|built-in|default/i.test(d.label)
        );
        if (!preferredDevice) preferredDevice = audioDevices[0];

        const mediaStream = await navigator.mediaDevices.getUserMedia({
          audio: {
            deviceId: preferredDevice.deviceId
              ? { exact: preferredDevice.deviceId }
              : undefined,
          },
          video: false,
        });

        setStream(mediaStream);
        setHasPermission(true);
      } catch (err) {
        console.error("Mic access denied or no device:", err);
        setHasPermission(false);
      }
    };

    getMicStream();
  }, []);

  // Toggle mic track based on global state
  useEffect(() => {
    if (!stream) return;
    const audioTrack = stream.getAudioTracks()[0];
    if (audioTrack) audioTrack.enabled = isMicOn;
  }, [isMicOn, stream]);

  return null; // No UI here, just hardware access
}
