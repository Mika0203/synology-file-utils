import axios from "axios";
import { synologyContoller } from "./controller";

interface ListReponse {
  data: {
    offset: number;
    shares: Share[];
    total: number;
  };
  success: boolean;
}

interface Share {
  isdir: boolean;
  name: string;
  path: string;
}

export async function list() {
  const url = `${process.env.SYNOLOGY_URL}/webapi/entry.cgi`;
  const response = await axios.get<ListReponse>(url, {
    params: {
      api: "SYNO.FileStation.List",
      version: 2,
      method: "list_share",
      session: "FileStation",
      format: "cookie",
      _sid: synologyContoller.getSessionId(),
    },
  });

  return response;
}
