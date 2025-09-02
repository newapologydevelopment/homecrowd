import { getFileAsset } from "@sanity/asset-utils";
import { client } from "./sanity";

export function getSanityFileUrl(
  fileRef: string,
  projectId: string,
  dataset: string
): string {
  try {
    // Use the proper Sanity asset utils to get the correct URL
    const asset = getFileAsset(fileRef, client.config());
    return asset.url;
  } catch (error) {
    console.error("Error generating Sanity file URL:", error);
    // Fallback to manual URL construction if asset utils fails
    const fileId = fileRef.replace("file-", "");
    return `https://cdn.sanity.io/files/${projectId}/${dataset}/${fileId}`;
  }
}

export function videoAssetFor(source: any) {
  return getFileAsset(source, client.config());
}

export function isMuxVideo(
  video: any
): video is {
  _type: "mux.video";
  playbackId: string;
  aspectRatio: number;
  originalFilename: string;
} {
  return video._type === "mux.video" && "playbackId" in video;
}

export function isFileVideo(
  video: any
): video is { _type: "file"; asset: { _ref: string; _type: "reference" } } {
  return video._type === "file" && "asset" in video;
}
