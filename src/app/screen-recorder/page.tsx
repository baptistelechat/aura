"use client";
import { Button } from "@/components/ui/button";
import { Download, Play, Square } from "lucide-react";
import { useRef, useState } from "react";

const ScreenRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [videoURL, setVideoURL] = useState(""); // URL of the recorded video
  const mediaRecorderRef = useRef<MediaRecorder | null>(null); // Reference to the MediaRecorder instance
  const videoRef = useRef<HTMLVideoElement | null>(null); // Reference to the video element
  const chunks = useRef<Blob[]>([]); // Array to store recorded video chunks
  const downloadLinkRef = useRef<HTMLAnchorElement | null>(null); // Reference to download anchor

  // Function to start recording the screen
  const startRecording = async () => {
    try {
      // Request to capture the screen
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: true,
      });

      if (videoRef.current) {
        // Display the captured stream in the video element
        videoRef.current.srcObject = stream;

        // Listen for the 'inactive' event to handle external stop actions
        stream.getVideoTracks()[0].addEventListener("ended", () => {
          if (
            mediaRecorderRef.current &&
            mediaRecorderRef.current.state !== "inactive"
          ) {
            mediaRecorderRef.current.stop();
          }
          setIsRecording(false);
        });

        // Create a new MediaRecorder to record the stream
        mediaRecorderRef.current = new MediaRecorder(stream, {
          mimeType: "video/webm; codecs=vp9",
        });

        // Store each chunk of recorded data
        mediaRecorderRef.current.ondataavailable = (event) => {
          if (event.data.size > 0) {
            chunks.current.push(event.data);
          }
        };

        // Once recording stops, create a video URL from the recorded chunks
        mediaRecorderRef.current.onstop = () => {
          const blob = new Blob(chunks.current, { type: "video/webm" });
          const url = URL.createObjectURL(blob);
          setVideoURL(url); // Set the video URL to preview the recording
          chunks.current = []; // Clear the chunks for future recordings

          // Set the video element to play the recorded video
          if (videoRef.current) {
            videoRef.current.srcObject = null; // Clear the stream
            videoRef.current.src = url; // Set the recorded video as the source
          }
        };

        // Start the recording
        mediaRecorderRef.current.start();
        setIsRecording(true); // Update the state to indicate recording has started
      }
    } catch (err) {
      console.error("Error accessing display media.", err);
    }
  };

  // Function to stop recording the screen
  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop(); // Stop the recording

      // Stop all tracks to release the screen
      const tracks =
        videoRef.current?.srcObject instanceof MediaStream
          ? videoRef.current.srcObject.getTracks()
          : [];

      tracks.forEach((track) => track.stop());

      setIsRecording(false); // Update the state to indicate recording has stopped
    }
  };

  const handleDownload = () => {
    if (downloadLinkRef.current) {
      downloadLinkRef.current.click(); // Trigger the download
    }
  };

  return (
    <div className="flex flex-col items-center p-8">
      <h1 className="text-2xl font-bold mb-4">🎥 Screen Recorder</h1>
      {/* Video element to display the screen or the recorded video */}
      <video
        ref={videoRef}
        controls
        autoPlay
        className="w-full max-w-2xl mb-4"
      ></video>
      {/* Buttons to start/stop recording */}
      <div>
        {!isRecording ? (
          <Button onClick={startRecording}>
            <Play className="mr-2 h-4 w-4" /> Start Recording
          </Button>
        ) : (
          <Button onClick={stopRecording}>
            <Square className="mr-2 h-4 w-4" /> Stop Recording
          </Button>
        )}
      </div>
      {/* Link to download the recorded video */}
      {videoURL && (
        <>
          <Button variant="link" onClick={handleDownload}>
            <Download className="mr-2 h-4 w-4" />
            Download Recording
          </Button>
          <a
            href={videoURL}
            download="recording.webm"
            className="hidden"
            ref={downloadLinkRef}
          ></a>
        </>
      )}
    </div>
  );
}

export default ScreenRecorder
