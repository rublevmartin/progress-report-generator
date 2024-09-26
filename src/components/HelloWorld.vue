<template>
  <div class="wrapper">

  </div>
</template>

<script>
export default {
  data() {
    return {
      clientId: null,
      instanceId: null,
      documentId: null,
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
      console.log("Client ID:", this.clientId);
      return this.clientId;
    },

    async createReportInstance() {
      const data = await this.fetchWithBody(
        `https://demos.telerik.com/reporting/api/reports/clients/${this.clientId}/instances`,
        "POST",
        {
          report: "CryptoCurrencyInfo.trdx",
        }
      );
      this.instanceId = data.instanceId;
      console.log("Instance ID:", this.instanceId);
      return this.instanceId;
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

      console.log("Documents Data:", data);

      this.documentId = data.documentId;
      console.log("Document ID:", this.documentId);

      return this.documentId;
    },

    async fetchReportPage() {
      const response = await fetch(
        `https://demos.telerik.com/reporting/api/reports/clients/${this.clientId}/instances/${this.instanceId}/documents/${this.documentId}/pages/1`
      );
      const data = await response.json();
      console.log("Page Data:", data);
    },

    async fetchReports() {
      try {
        await this.registerClient();
        await this.createReportInstance();
        await this.fetchDocuments();
        if (this.documentId) {
          await this.fetchReportPage();
        }
      } catch (error) {
        console.error("Error in report flow:", error);
      }
    },
  },
  mounted() {
    this.fetchReports();
  },
};
</script>

<style scoped lang="scss">
body {
  overflow: hidden;
}
</style>
