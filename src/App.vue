<template>
  <div id="app">
    <canvas ref="canvas" />
    <button @click="click" :disabled="!user">poyo</button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { QurageLinkFactory } from "@uniqys/qurage-link-lib";
import { QurageLink } from "@uniqys/qurage-link-lib/dist/link";

const INFURA_PROJECT_ID = "bd35010d62134981a9e82dff4708728b";

export default Vue.extend({
  name: "app",
  data: () => {
    type State = {
      qurageLink: QurageLink | undefined;
      user: any;
    };
    return {
      qurageLink: undefined,
      user: undefined
    } as State;
  },
  mounted() {
    console.log("poyo");
    const endpoint = `https://ropsten.infura.io/v3/${INFURA_PROJECT_ID}`;
    this.qurageLink = QurageLinkFactory.create({ endpoint });

    this.qurageLink
      .linkWithQRCode(this.$refs.canvas as HTMLCanvasElement, true)
      .then(result => {
        console.log(result, (window as any).web3);
        this.user = this.qurageLink!["backend"]["_user"];
      });

    chrome.runtime.onMessage.addListener((message, _, sendResponse) => {
      const { type, payload } = message;
      console.log(type, payload);
      if (type !== "SEND_PAYLOAD") {
        return;
      }

      const provider = this.getProvider();

      provider.send(payload, (err: Error, result: any) => {
        if (err) {
          console.log("get error", err);
          throw err;
        }
        console.log("result", result);
        sendResponse({ result });
      });
    });
  },
  methods: {
    click() {
      // eslint-disable-next-line
      console.log("poyo");
      if (!this.user) {
        // eslint-disable-next-line
        console.log("not init user");
        return;
      }
      chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
        // eslint-disable-next-line
        console.log(tabs);
        chrome.tabs.sendMessage(tabs[0].id!, {
          type: "CLICK_POPUP",
          user: this.user
        });
      });
    },
    getProvider() {
      return (window as any).ethereum.currentProvider;
    }
  }
});
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
