import { reactive } from "vue";

export const state = reactive({
  stepNumber: 1,
  stepFullfilled: 0,
  selectedReport: null,
  selectedReportFile: null,
  texts: [
    "Start by choosing the report that you want to view or download.",
    "Choose the format in which you want to export the report.",
    "Your report is ready! Download it or preview it below.",
  ],
  reports: [
    { name: "Crypto Dashboard", file: "Crypto Report.trdx" },
    { name: "Conference Report", file: "Conference Report.trdx" },
    { name: "Dashboard", file: "Dashboard.trdx" },
    { name: "Crypto Currency Info", file: "CryptoCurrencyInfo.trdx" },
    { name: "Invoice", file: "Invoice.trdx" },
    { name: "Swiss QR Bill Report", file: "SwissQRBill.trdx" },
    { name: "Barcodes Report", file: "Barcodes Report.trdx" },
    { name: "Product Sales", file: "Product Sales.trdx" },
    { name: "Employee Sales", file: "Employee Sales Summary.trdx" },
    { name: "Product Line Sales", file: "Product Line Sales.trdx" },
    { name: "Sales Dashboard", file: "SalesByRegionDashboard.trdx" },
    { name: "Report Book", file: "ReportBook.trbp" },
    { name: "Crypto Currencies", file: "CryptoCurrencies.trdx" },
    { name: "List Bound Report", file: "ListBoundReport.trdx" },
    { name: "Product Catalog", file: "Product Catalog.trdx" },
    { name: "Product Tag Report", file: "Product Tag Report.trdx" },
    { name: "Olympic Medals Map", file: "OlympicMedalsByNationalTeams.trdx" },
    { name: "Population Density", file: "PopulationDensity.trdx" },
  ],
});

export const mutations = {
  nextStep() {
    if (state.stepNumber < 3 && state.stepFullfilled >= state.stepNumber) {
      state.stepNumber += 1;
    }
  },

  prevStep() {
    if (state.stepNumber > 1) {
      state.stepNumber -= 1;
      state.stepFullfilled = state.stepNumber;
    }
  },

  fullfillStep() {
    if (state.stepFullfilled < state.stepNumber) {
      state.stepFullfilled = state.stepNumber;
    }
  },
};
