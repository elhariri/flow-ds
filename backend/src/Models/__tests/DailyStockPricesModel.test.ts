import DailyStockPricesModel from "../DailyStockPrices.Model";
import {
  CompanyRepository,
  DailyStockPriceRepository,
} from "../Database/Repositories/Repository";
import Timer from "../../Application/Helpers/Timer/Timer";
import ProfitOptimizer from "../../Application/ProfitOptimizer/ProfitOptimizer";
import {
  DailyStockPricePayload,
  CompanyPayload,
} from "../../Types/Model.types";
import { ServerSuccessfullResponseBody, Transaction } from "../../index.types";

jest.mock("../Database/Repositories/Repository", () => ({
  __esModule: true,
  CompanyRepository: {
    findById: jest.fn(),
    findAll: jest.fn(),
  },
  DailyStockPriceRepository: {
    find: jest.fn(),
    findAll: jest.fn(),
  },
}));

jest.mock(
  "../../Application/Helpers/ApplicationError/ApplicationError",
  () => ({
    __esModule: true,
    default: jest.fn(),
  })
);

jest.mock("../../Application/Helpers/Timer/Timer", () => ({
  __esModule: true,
  default: jest.fn(() => ({
    start: jest.fn(),
    stop: jest.fn(),
    getElapsedTime: jest.fn(() => ({
      minutes: 0,
      seconds: 0,
      milliseconds: 0,
    })),
  })),
}));

jest.mock("../../Application/ProfitOptimizer/ProfitOptimizer", () => ({
  __esModule: true,
  default: {
    FindMaxProfit: jest.fn(() => ({ profit: 0, transactions: [] })),
  },
}));

describe("DailyStockPricesModel", () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  describe("getCompanyOptimalSolution", () => {
    it("should return the optimal profit solution for a specific company", async () => {
      // Mock daily stock prices for the company
      const companyId = 1;
      const companyPrices: DailyStockPricePayload[] = [
        {
          id: 1,
          date: 1641186000000, // Timestamp for 2022-01-03
          lowestPrice: 110,
          highestPrice: 120,
          company: "Company A",
        },
        {
          id: 2,
          date: 1641272400000, // Timestamp for 2022-01-04
          lowestPrice: 115,
          highestPrice: 130,
          company: "Company A",
        },
      ];

      (DailyStockPriceRepository.find as any).mockResolvedValue(companyPrices);

      // Mock CompanyRepository.findById() to return the mock company
      const mockCompany: CompanyPayload = {
        id: 1,
        name: "Company A",
        stockPrices: companyPrices,
      };
      (CompanyRepository.findById as any).mockResolvedValue(mockCompany);

      // Mock Timer to return a fake execution time
      (Timer as any).mockImplementation(() => ({
        start: jest.fn(),
        stop: jest.fn(),
        getElapsedTime: jest.fn(() => ({
          minutes: 1,
          seconds: 30,
          milliseconds: 0,
        })),
      }));

      // Mock ProfitOptimizer.FindMaxProfit() to return a fake optimal profit solution
      const mockTransactions: Transaction[] = [
        // Add mock data for transactions
      ];
      (ProfitOptimizer.FindMaxProfit as any).mockReturnValue({
        profit: 1000,
        transactions: mockTransactions,
      });

      // Call the method
      const result: ServerSuccessfullResponseBody =
        await DailyStockPricesModel.getCompanyOptimalSolution(companyId);

      // Assert the expected result
      expect(result.profit).toBe(1000);
      expect(result.transactions).toEqual(mockTransactions);
      expect(result.executionTime).toEqual({
        minutes: 1,
        seconds: 30,
        milliseconds: 0,
      });

      // Assert that the required methods were called
      expect(DailyStockPriceRepository.find).toHaveBeenCalledWith({
        where: { companyId },
        include: { company: true },
        orderBy: { date: "asc" },
      });
      expect(Timer).toHaveBeenCalledTimes(1);
      expect(ProfitOptimizer.FindMaxProfit).toHaveBeenCalledTimes(1);
    });
  });

  describe("getAllCompaniesOptimalSolution", () => {
    it("should return the overall optimal profit solution for all companies", async () => {
      // Mock daily stock prices for all companies
      const mockCompanyPrices: DailyStockPricePayload[] = [
        {
          id: 1,
          date: 1641186000000, // Timestamp for 2022-01-03
          lowestPrice: 110,
          highestPrice: 120,
          company: "Company A",
        },
        {
          id: 2,
          date: 1641272400000, // Timestamp for 2022-01-04
          lowestPrice: 115,
          highestPrice: 130,
          company: "Company A",
        },
        {
          id: 3,
          date: 1641186000000, // Timestamp for 2022-01-03
          lowestPrice: 90,
          highestPrice: 100,
          company: "Company B",
        },
        {
          id: 4,
          date: 1641586000000, // Timestamp for 2022-01-03
          lowestPrice: 90,
          highestPrice: 100,
          company: "Company B",
        },
        // Add more mock data for daily stock prices as needed...
      ];

      (DailyStockPriceRepository.findAll as any).mockResolvedValue(
        mockCompanyPrices
      );

      // Mock CompanyRepository.findAll() to return mock companies
      const mockCompanies: CompanyPayload[] = [
        {
          id: 1,
          name: "Company A",
          stockPrices: [mockCompanyPrices[0], mockCompanyPrices[1]],
        },
        {
          id: 2,
          name: "Company B",
          stockPrices: [mockCompanyPrices[2], mockCompanyPrices[3]],
        },
        // Add more mock data for companies as needed...
      ];
      (CompanyRepository.findAll as any).mockResolvedValue(mockCompanies);

      // Mock Timer to return a fake execution time
      (Timer as any).mockImplementation(() => ({
        start: jest.fn(),
        stop: jest.fn(),
        getElapsedTime: jest.fn(() => ({
          minutes: 2,
          seconds: 15,
          milliseconds: 500,
        })),
      }));

      // Mock ProfitOptimizer.FindMaxProfit() to return a fake optimal profit solution
      const mockTransactions: Transaction[] = [
        // Add mock data for transactions
      ];
      (ProfitOptimizer.FindMaxProfit as any).mockReturnValue({
        profit: 2000,
        transactions: mockTransactions,
      });

      // Call the method
      const result: ServerSuccessfullResponseBody =
        await DailyStockPricesModel.getAllCompaniesOptimalSolution();

      // Assert the expected result
      expect(result.profit).toBe(2000);
      expect(result.transactions).toEqual(mockTransactions);
      expect(result.executionTime).toEqual({
        minutes: 2,
        seconds: 15,
        milliseconds: 500,
      });

      // Assert that the required methods were called
      expect(DailyStockPriceRepository.findAll).toHaveBeenCalledWith({
        include: { company: true },
        orderBy: { date: "asc" },
      });
      expect(Timer).toHaveBeenCalledTimes(1);
    });
  });
});
