export type RecordAction = "pause" | "resume" | "stop";

export type StartAction = "webcam" | "screen";

export interface IStartAction {
    audio?: boolean;
    video?: boolean;
  }
  