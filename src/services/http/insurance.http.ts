import { HttpService } from ".";
// Types
import type {
  InsuranceGetSubmissionsResponseDto,
  InsuranceGetFormStructureResponseDto,
  InsuranceFormStructureSubmitResponseDto,
} from "@root/types/insurance.type";

class InsuranceHttpService extends HttpService {
  constructor() {
    super({
      suffix: "insurance",
    });
  }

  async getFormStructure(): Promise<InsuranceGetFormStructureResponseDto[]> {
    const response = await this.httpService.get("forms");
    return response?.data;
  }

  async getSubmissions(): Promise<InsuranceGetSubmissionsResponseDto> {
    const response = await this.httpService.get("forms/submissions");
    return response?.data;
  }

  async submitFormData(): Promise<InsuranceFormStructureSubmitResponseDto> {
    const response = await this.httpService.post("forms/submit");
    return response?.data;
  }
}

const InsuranceService = new InsuranceHttpService();
export default InsuranceService;
