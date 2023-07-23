import { Company } from "../../Types/Model.types";
import CompanyModel from "../Company.Model";
import { CompanyRepository } from "../Database/Repositories/Repository";
import { SchemaType } from "../Database/Repositories/repository.types";

// Mock the CompanyRepository and its findAll() method
jest.mock("../Database/Repositories/Repository", () => ({
  CompanyRepository: {
    findAll: jest.fn(),
  },
}));

describe("CompanyModel", () => {
  afterEach(() => {
    // Clear the mock calls after each test
    jest.clearAllMocks();
  });

  it("should return an empty array when no companies exist", async () => {
    // Mock the CompanyRepository.findAll() to return an empty array
    (CompanyRepository.findAll as any).mockResolvedValue([]);

    const companies = await CompanyModel.getAllCompanies();

    expect(companies).toEqual([]);
    expect(CompanyRepository.findAll).toHaveBeenCalledTimes(1);
  });

  it("should return an array of company names and IDs", async () => {
    // Mock the CompanyRepository.findAll() to return an array of companies
    const mockCompanies: SchemaType<Company>[] = [
      { id: 1, name: "Company A" },
      { id: 2, name: "Company B" },
    ];
    (CompanyRepository.findAll as any).mockResolvedValue(mockCompanies);

    const companies = await CompanyModel.getAllCompanies();

    expect(companies).toEqual([
      { name: "Company A", value: 1 },
      { name: "Company B", value: 2 },
    ]);
    expect(CompanyRepository.findAll).toHaveBeenCalledTimes(1);
  });
});
