import { http } from "@/http-common";
import { Axios } from "axios";
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
      isAuthenticated: false,
      token: "",
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
    checkAuthenticated() {
      this.token = localStorage.getItem("pd_token") ?? "";
      if (this.token !== "") {
        if (this.$route.path.includes("/login")) {
          this.$router.push("/");
        }
        this.isAuthenticated = true;
      } else {
        this.isAuthenticated = false;
        this.$router.push("/login");
      }
    },
    logOut() {
      localStorage.clear();
      this.checkAuthenticated();
    },
    dispatch: async function (data) {
      if (data) {
        this.$notify({
          title: "Success",
          message: "Success on get data",
          type: "success",
        });
      } else {
        this.$notify({
          title: "Error",
          type: "error",
          message: "None result",
        });
      }
    },
  },
  computed: {
    httpRequest(): Axios | undefined {
      const token = localStorage.getItem("pd_token");
      const username = localStorage.getItem("pd_username");
      const httpRequest = token
        ? http({ "x-token": token, "x-un": username })
        : http();
      return httpRequest;
    },
  },
  mounted() {
    this.checkAuthenticated();
  },
});
