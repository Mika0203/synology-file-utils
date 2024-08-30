import axios from "axios";
import { SynologyAPI } from "./api";
import { synologyContoller } from "./controller";
import type { APIResponse } from "./interfaces";

/**
 *
 * Availability: Since DSM 6.0
 *
 * Version: 2
 */
export async function download({
  path,
}: {
  path: string;
}): Promise<APIResponse> {
  try {
    const url = `${process.env.SYNOLOGY_URL}/webapi/entry.cgi`;
    const response = await axios.get(url, {
      params: {
        api: SynologyAPI.DOWNLOAD,
        version: 2,
        method: "download",
        session: "FileStation",
        format: "cookie",
        _sid: synologyContoller.getSessionId(),
        path: path,
        mode: "download",
      },
      responseType: "arraybuffer",
      headers: {
        "Content-Type": "application/octet-stream",
      },
    });

    return {
      success: true,
      data: response.data as Buffer,
    };
  } catch (error: any) {
    if (error.status === 404) {
      return {
        success: false,
        message: "File not found",
      };
    }

    return {
      success: false,
      message: error.message,
    };
  }
}
