import { JsonRPCRequest, JsonRPCResponse, Callback } from "./types";

export class Provider {
  public send(method: string, params: any[]): Promise<any>;
  public send(
    payload: JsonRPCRequest,
    callback: Callback<JsonRPCResponse>
  ): void;

  public send(
    methodOrPayload: string | any,
    paramsOrCallback: any[] | Callback<JsonRPCResponse>
  ): Promise<any> | void {
    if (
      typeof methodOrPayload === "string" &&
      typeof paramsOrCallback === "object"
    ) {
      const method = methodOrPayload;
      const params = paramsOrCallback;
      const payload: JsonRPCRequest = {
        jsonrpc: "2.0",
        id: 0,
        method,
        params
      };
      return this.sendPayload(payload);
    } else if (
      typeof methodOrPayload === "object" &&
      typeof paramsOrCallback === "function"
    ) {
      const payload = methodOrPayload;
      const callback = paramsOrCallback;

      this.sendPayload(payload)
        .then(result => callback(null, result))
        .catch(err => callback(err));
    }
  }
  public sendPayload(payload: JsonRPCRequest): Promise<any> {
    return new Promise(resolve => {
      const message = {
        type: "SEND_PAYLOAD",
        payload
      };
      chrome.runtime.sendMessage(
        "hiojgfpfigmiaoeffcfmmdhjgakpmnpd",
        message,
        response => {
          console.log(response);
          resolve(response.result);
        }
      );
    });
  }
}
