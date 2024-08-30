import axios from "axios";
import { SynologyAPI } from "./api";
import { synologyContoller } from "./controller";

interface LogoutResponse {
  data: {
    success: boolean;
  };
}

export function logout() {
  const url = `${process.env.SYNOLOGY_URL}/webapi/entry.cgi`;
  const sessionId = synologyContoller.getSessionId();

  if (!sessionId) {
    return {
      success: false,
      message: "Not logged in",
    };
  }

  axios
    .get<LogoutResponse>(url, {
      params: {
        api: SynologyAPI.AUTH,
        version: 6,
        method: "logout",
        session: "FileStation",
        format: "cookie",
      },
    })
    .then((response) => {
      if (response.data.data.success) {
        synologyContoller.logout();
      }
    })
    .catch((error) => {
      console.error(error);
    });
}
