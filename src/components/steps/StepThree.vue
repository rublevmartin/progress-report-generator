<template>
  <div class="step">
    <div class="shell">
      <!-- Display the report HTML content above the download button -->
      <div v-if="htmlReportContent.length > 0" class="step__report">
        <div v-for="(page, index) in htmlReportContent" :key="index" v-html="page"></div>
      </div>

      <!-- Display the download button once the document is ready -->
      <div class="step__buttons">
        <button v-if="documentReady" @click="downloadDocument" class="btn btn--large">
          Download Report
        </button>

        <p class="step__loading" v-else>Loading...</p>
      </div>
    </div>
  </div>
</template>

<script>
import { state } from '../../store.js';

export default {
  data() {
    return {
      clientId: null,
      instanceId: null,
      documentId: null,
      documentReady: false,
      htmlReportContent: [],
      totalPages: 1,
    };
  },
  methods: {
    async fetchWithBody(url, method, body) {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      return response.json();
    },

    async registerClient() {
      const data = await this.fetchWithBody(
        "https://demos.telerik.com/reporting/api/reports/clients",
        "POST"
      );
      this.clientId = data.clientId;
      return this.clientId;
    },

    async createReportInstance() {
      const data = await this.fetchWithBody(
        `https://demos.telerik.com/reporting/api/reports/clients/${this.clientId}/instances`,
        "POST",
        {
          report: state.selectedReportFile,
        }
      );
      this.instanceId = data.instanceId;
      return this.instanceId;
    },

    async fetchDocumentInfo() {
      try {
        const response = await fetch(
          `https://demos.telerik.com/reporting/api/reports/clients/${this.clientId}/instances/${this.instanceId}/documents/${this.documentId}/info`
        );

        if (!response.ok) {
          console.error("Error fetching document info:", response.statusText);
          return;
        }

        const data = await response.json();

        if (data.pageCount !== undefined) {
          this.totalPages = data.pageCount;
        } else {
          console.error("PageCount not found in the response.");
        }

      } catch (error) {
        console.error("Error fetching document info:", error);
      }
    },

    async fetchDocuments() {
      const data = await this.fetchWithBody(
        `https://demos.telerik.com/reporting/api/reports/clients/${this.clientId}/instances/${this.instanceId}/documents`,
        "POST",
        {
          format: "HTML5",
          deviceInfo: {},
          useCache: true,
        }
      );

      this.documentId = data.documentId;
      this.documentReady = true;
    },

    async fetchHTMLReport(pageNumber) {
      const response = await fetch(
        `https://demos.telerik.com/reporting/api/reports/clients/${this.clientId}/instances/${this.instanceId}/documents/${this.documentId}/pages/${pageNumber}`
      );

      if (!response.ok) {
        console.error("Error fetching HTML report:", response.statusText);
        return;
      }

      const data = await response.json();
      this.htmlReportContent.push(data.pageContent);
    },

    async downloadDocument() {
      const response = await fetch(
        `https://demos.telerik.com/reporting/api/reports/clients/${this.clientId}/instances/${this.instanceId}/documents/${this.documentId}`
      );

      if (!response.ok) {
        console.error("Error downloading document:", response.statusText);
        return;
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        `${state.selectedReportFile}.${state.selectedFormatFile.toLowerCase()}`
      );
      document.body.appendChild(link);
      link.click();
      link.remove();
    },

    async fetchReportFlow() {
      try {
        await this.registerClient();
        await this.createReportInstance();
        await this.fetchDocuments();
        await this.fetchDocumentInfo();

        for (let i = 1; i <= this.totalPages; i++) {
          await this.fetchHTMLReport(i);
        }
      } catch (error) {
        console.error("Error in fetching report flow:", error);
      }
    },
  },
  mounted() {
    this.fetchReportFlow();
  },
};
</script>
