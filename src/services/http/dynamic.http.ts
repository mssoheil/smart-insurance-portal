import { HttpService } from "@root/services";

class DynamicOptionsHttpService extends HttpService {
  constructor() {
    super({ suffix: "", hasApiPrefix: false });
  }

  async dynamicFetch(
    endpoint: string,
    method: string,
    payload: Record<string, unknown>
  ) {
    return this.httpService.request({
      method,
      url: endpoint,
      ...(method === "GET" ? { params: payload } : { data: payload }),
    });
  }
}

const DynamicOptionsService = new DynamicOptionsHttpService();
export default DynamicOptionsService;
