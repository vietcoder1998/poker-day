import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      loading: false,
      isClosed: false,
      aInfo: {
        title: "",
        description: "",
        type: "",
      },
    };
  },
  methods: {
    setLoading(loading: boolean) {
      this.loading = loading;
    },
    openAlert(type: string, description: string, title: string) {
      this.isClosed = false;
      this.aInfo = {
        type,
        title: title,
        description: description,
      };
      setTimeout(() => {
        this.isClosed = true;
      }, 5000);
    },
    alertSuccess(description: string, title?: string) {
      this.openAlert("success", title ?? "success", description);
    },
    alertError(description: string, title?: string) {
      this.openAlert("error", title ?? "error", description);
    },
    alertWarning(description: string, title?: string) {
      this.openAlert("warning", title ?? "", description);
    },
    alertInfo(description: string, title?: string) {
      this.openAlert("info", title ?? "", description);
    },
    setAuthenticate(token: string, username: string) {
      localStorage.setItem("pd_token", token);
      localStorage.setItem("pd_username", username);
    },
  },
  computed: {
    token() {
      return localStorage.getItem("pd_token");
    },
    isAuthenticated() {
      const token = localStorage.getItem("pd_username");

      if (token) {
        return true;
      }

      return false;
    },
    authenticateHeader() {
      const token = localStorage.getItem("pd_token");
      const username = localStorage.getItem("pd_username");

      return {
        "x-token": token,
        "x-un": username,
      };
    },
  },
});
