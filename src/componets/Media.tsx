import { useRef, useState } from "react";
import {
  IStartAction,
  RecordAction,
  StartAction,
} from "../types/MediaRecorderTypes";
import { checkCameraPermission } from "../utils";
import { MediaController } from "./MediaController";

export default function Media() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [recording, setRecording] = useState(false);
  const [videoURL, setVideoURL] = useState<string | null>(null);
  const [isPaused, setPaused] = useState(false);

  const handleStart = async (type: StartAction, options: IStartAction) => {
    try {
      const { audio, video } = options || {};
      const mediaStream =
        type === "screen"
          ? await navigator.mediaDevices.getDisplayMedia({
              video,
              audio,
            })
          : await navigator.mediaDevices.getUserMedia({
              video,
              audio,
            });

      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }

      const recorder = new MediaRecorder(mediaStream);
      mediaRecorderRef.current = recorder;
      const localChunks: Blob[] = [];

      recorder.ondataavailable = (e) => {
        if (e.data.size) {
          localChunks.push(e.data);
        }
      };

      recorder.onstop = () => {
        const blob = new Blob(localChunks, { type: "video/webm" });
        setVideoURL(URL.createObjectURL(blob));
      };

      recorder.start();
      setRecording(true);
    } catch (err) {
      await checkCameraPermission();
      console.error(err);
    }
  };

  const handleMediaAction = (action: RecordAction) => {
    switch (action) {
      case "pause":
        mediaRecorderRef.current?.pause();
        setPaused(true);
        break;
      case "resume":
        mediaRecorderRef.current?.resume();
        setPaused(false);
        break;
      case "stop":
        mediaRecorderRef.current?.stop();
        stream?.getTracks().forEach((track) => track.stop());
        setRecording(false);
        break;
    }
  };

  return (
    <div className="recorder-app">
      <video className="video-preview" ref={videoRef} autoPlay muted />
      <div className="video-controls">
        <MediaController
          recording={recording}
          isPaused={isPaused}
          videoURL={videoURL}
          handleStart={handleStart}
          handleAction={handleMediaAction}
        />
      </div>
    </div>
  );
}
