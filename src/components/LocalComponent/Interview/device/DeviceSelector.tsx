"use client";

import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type DeviceOption = {
  deviceId: string;
  label: string;
};

export default function DeviceSelector({
  onCameraChange,
  onMicChange,
}: {
  onCameraChange: (deviceId: string) => void;
  onMicChange: (deviceId: string) => void;
}) {
  const [videoDevices, setVideoDevices] = useState<DeviceOption[]>([]);
  const [audioDevices, setAudioDevices] = useState<DeviceOption[]>([]);
  const [selectedCam, setSelectedCam] = useState<string>("");
  const [selectedMic, setSelectedMic] = useState<string>("");

  const fetchDevices = async () => {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();

      const cams = devices.filter((d) => d.kind === "videoinput");
      const mics = devices.filter((d) => d.kind === "audioinput");

      setVideoDevices(cams);
      setAudioDevices(mics);

      // Laptop defaults
      let defaultCam =
        cams.find((d) => /integrated|built-in|default/i.test(d.label)) ||
        cams[0];
      let defaultMic =
        mics.find((d) => /integrated|built-in|default/i.test(d.label)) ||
        mics[0];

      if (defaultCam && !selectedCam) {
        setSelectedCam(defaultCam.deviceId);
        onCameraChange(defaultCam.deviceId);
      }
      if (defaultMic && !selectedMic) {
        setSelectedMic(defaultMic.deviceId);
        onMicChange(defaultMic.deviceId);
      }
    } catch (err) {
      console.error("Error fetching devices:", err);
    }
  };

  useEffect(() => {
    fetchDevices();

    navigator.mediaDevices.addEventListener("devicechange", fetchDevices);
    return () => {
      navigator.mediaDevices.removeEventListener("devicechange", fetchDevices);
    };
  }, []);

  return (
    <div className="flex gap-4 items-center bg-slate-800/30 px-4 py-2 rounded-lg shadow-md">
      {/* Camera Selector */}
      {videoDevices.length > 0 && (
        <Select
          value={selectedCam}
          onValueChange={(id) => {
            setSelectedCam(id);
            onCameraChange(id);
          }}
        >
          <SelectTrigger className="w-40 h-8 text-sm">
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

      {/* Mic Selector */}
      {audioDevices.length > 0 && (
        <Select
          value={selectedMic}
          onValueChange={(id) => {
            setSelectedMic(id);
            onMicChange(id);
          }}
        >
          <SelectTrigger className="w-40 h-8 text-sm">
            <SelectValue placeholder="Select Mic" />
          </SelectTrigger>
          <SelectContent>
            {audioDevices.map((device) => (
              <SelectItem key={device.deviceId} value={device.deviceId}>
                {device.label || "Unknown Mic"}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    </div>
  );
}
