import Vue from 'vue';
import WebRTC from 'vue-webrtc';

Vue.use(WebRTC);

export default {
  name: 'Screenshots',
  data() {
    return {
      // viewName::String -> [Screenshot]
      screenshots: {},
      activeViewId: -1,
    };
  },
  computed: {
    atLeastOneScreenshot() {
      const names = Object.keys(this.screenshots);
      for (let i = 0; i < names.length; ++i) {
        const list = this.screenshots[names[i]];
        if (list && list.length) {
          return true;
        }
      }
      return false;
    },
    smallScreen() {
      // vuetify xs is 600px, but our buttons collide at around 700.
      return this.$vuetify.breakpoint.smAndDown;
    },
    activeView() {
      return this.$proxyManager.getProxyById(this.activeViewId);
    },
  },
  proxyManagerHooks: {
    onActiveViewChange(view) {
      this.activeViewId = view.getProxyId();
    },
  },
  mounted() {
    const activeView = this.$proxyManager.getActiveView();
    if (activeView) {
      this.activeViewId = activeView.getProxyId();
    }
    this.$refs.webrtc.join()
  },
};
