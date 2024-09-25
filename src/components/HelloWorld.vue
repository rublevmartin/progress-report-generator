<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      For a guide and recipes on how to configure / customize this project,<br>
      check out the
      <a href="https://cli.vuejs.org" target="_blank" rel="noopener">vue-cli documentation</a>.
    </p>
    <h3>Installed CLI Plugins</h3>
    <ul>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-babel" target="_blank"
          rel="noopener">babel</a></li>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-eslint" target="_blank"
          rel="noopener">eslint</a></li>
    </ul>
    <h3>Essential Links</h3>
    <ul>
      <li><a href="https://vuejs.org" target="_blank" rel="noopener">Core Docs</a></li>
      <li><a href="https://forum.vuejs.org" target="_blank" rel="noopener">Forum</a></li>
      <li><a href="https://chat.vuejs.org" target="_blank" rel="noopener">Community Chat</a></li>
      <li><a href="https://twitter.com/vuejs" target="_blank" rel="noopener">Twitter</a></li>
      <li><a href="https://news.vuejs.org" target="_blank" rel="noopener">News</a></li>
    </ul>
    <h3>Ecosystem</h3>
    <ul>
      <li><a href="https://router.vuejs.org" target="_blank" rel="noopener">vue-router</a></li>
      <li><a href="https://vuex.vuejs.org" target="_blank" rel="noopener">vuex</a></li>
      <li><a href="https://github.com/vuejs/vue-devtools#vue-devtools" target="_blank" rel="noopener">vue-devtools</a>
      </li>
      <li><a href="https://vue-loader.vuejs.org" target="_blank" rel="noopener">vue-loader</a></li>
      <li><a href="https://github.com/vuejs/awesome-vue" target="_blank" rel="noopener">awesome-vue</a></li>
    </ul>
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
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      return response.json();
    },

    async registerClient() {
      const data = await this.fetchWithBody('https://demos.telerik.com/reporting/api/reports/clients', 'POST');
      this.clientId = data.clientId;
      console.log('Client ID:', this.clientId);
      return this.clientId;
    },

    async createReportInstance() {
      const data = await this.fetchWithBody(`https://demos.telerik.com/reporting/api/reports/clients/${this.clientId}/instances`, 'POST', {
        report: 'CryptoCurrencyInfo.trdx',
      });
      this.instanceId = data.instanceId;
      console.log('Instance ID:', this.instanceId);
      return this.instanceId;
    },

    async fetchDocuments() {
      const data = await this.fetchWithBody(`https://demos.telerik.com/reporting/api/reports/clients/${this.clientId}/instances/${this.instanceId}/documents`, 'POST', {
        format: 'HTML5',
        deviceInfo: {},
        useCache: true,
      });

      console.log('Documents Data:', data);

      this.documentId = data.documentId; // Assuming the response contains an array
      console.log('Document ID:', this.documentId);

      return this.documentId;
    },

    async fetchReportPage() {
      const response = await fetch(`https://demos.telerik.com/reporting/api/reports/clients/${this.clientId}/instances/${this.instanceId}/documents/${this.documentId}/pages/1`);
      const data = await response.json();
      console.log('Page Data:', data);
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
        console.error('Error in report flow:', error);
      }
    },
  },
  mounted() {
    this.fetchReports(); // Fetch reports when component is mounted
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
