class Controller {
  private did: string = "";
  private sid: string = "";

  login({ did, sid }: { did: string; sid: string }) {
    this.did = did;
    this.sid = sid;
  }

  logout() {
    this.did = "";
    this.sid = "";
  }

  getSessionId() {
    return this.sid;
  }
}

export const synologyContoller = new Controller();
