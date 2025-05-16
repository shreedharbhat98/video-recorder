import {
  IStartAction,
  RecordAction,
  StartAction,
} from "../types/MediaRecorderTypes";

interface IMediaController {
  recording: boolean;
  videoURL: string | null;
  isPaused: boolean;
  handleStart: (action: StartAction, options: IStartAction) => void;
  handleAction: (action: RecordAction) => void;
}

export const MediaController = ({
  recording,
  videoURL,
  isPaused,
  handleStart,
  handleAction,
}: IMediaController) => {
  return (
    <footer className="btn-wrapper">
      {!recording ? (
        <>
          <button
            className="btn"
            onClick={() => handleStart("webcam", { audio: true, video: true })}
          >
            Record Webcam With Audio
          </button>
          <button
            className="btn"
            onClick={() => handleStart("webcam", { audio: true, video: false })}
          >
            Record Webcam Without Video
          </button>
          {/* <button className="btn" onClick={() => handleStart("screen")}>
            Record Screen
          </button> */}
          {videoURL ? (
            <a className="btn" href={videoURL} download="recording.webm">
              Download Recording
            </a>
          ) : null}
        </>
      ) : (
        <>
          <span className="recording-indicator">
            {" "}
            Recording {isPaused ? "paused" : "started"}{" "}
          </span>
          <button
            className="btn"
            onClick={() => {
              isPaused ? handleAction("resume") : handleAction("pause");
            }}
          >
            {isPaused ? "Resume" : "Pause"}
          </button>
          <button className="btn" onClick={() => handleAction("stop")}>
            Stop
          </button>
        </>
      )}
    </footer>
  );
};
