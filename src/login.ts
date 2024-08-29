import axios from "axios";
import { synologyContoller } from "./controller";

interface ConnectResponse {
  data: Data;
  success: boolean;
  error: {
    code: number;
  };
}

interface Data {
  did: string;
  is_portal_port: boolean;
  sid: string;
}

export async function login({
  userName,
  password,
  otp,
}: {
  userName: string;
  password: string;
  otp?: string;
}) {
  const url = `${process.env.SYNOLOGY_URL}/webapi/entry.cgi`;
  const response = await axios.get<ConnectResponse>(url, {
    params: {
      api: "SYNO.API.Auth",
      version: 6,
      method: "login",
      //
      account: userName,
      passwd: password,
      session: "FileStation",
      format: "cookie",
      otp_code: otp,
    },
  });

  if (response.data.success) {
    synologyContoller.login({
      did: response.data.data.did,
      sid: response.data.data.sid,
    });
  }

  return response;
}
