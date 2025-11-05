import { f as useState, n as navigateTo, i as useNuxtApp, l as useRequestEvent } from './server.mjs';
import { computed, readonly, ref } from 'vue';
import { N as destr, v as klona, O as parse, P as getRequestHeader, J as isEqual, s as setCookie, a as getCookie, Q as deleteCookie } from '../nitro/nitro.mjs';

const CookieDefaults = {
  path: "/",
  watch: true,
  decode: (val) => destr(decodeURIComponent(val)),
  encode: (val) => encodeURIComponent(typeof val === "string" ? val : JSON.stringify(val))
};
function useCookie(name, _opts) {
  var _a2, _b;
  var _a;
  const opts = { ...CookieDefaults, ..._opts };
  (_a2 = opts.filter) != null ? _a2 : opts.filter = (key) => key === name;
  const cookies = readRawCookies(opts) || {};
  let delay;
  if (opts.maxAge !== void 0) {
    delay = opts.maxAge * 1e3;
  } else if (opts.expires) {
    delay = opts.expires.getTime() - Date.now();
  }
  const hasExpired = delay !== void 0 && delay <= 0;
  const cookieValue = klona(hasExpired ? void 0 : (_b = cookies[name]) != null ? _b : (_a = opts.default) == null ? void 0 : _a.call(opts));
  const cookie = ref(cookieValue);
  {
    const nuxtApp = useNuxtApp();
    const writeFinalCookieValue = () => {
      if (opts.readonly || isEqual(cookie.value, cookies[name])) {
        return;
      }
      nuxtApp._cookies || (nuxtApp._cookies = {});
      if (name in nuxtApp._cookies) {
        if (isEqual(cookie.value, nuxtApp._cookies[name])) {
          return;
        }
      }
      nuxtApp._cookies[name] = cookie.value;
      writeServerCookie(useRequestEvent(nuxtApp), name, cookie.value, opts);
    };
    const unhook = nuxtApp.hooks.hookOnce("app:rendered", writeFinalCookieValue);
    nuxtApp.hooks.hookOnce("app:error", () => {
      unhook();
      return writeFinalCookieValue();
    });
  }
  return cookie;
}
function readRawCookies(opts = {}) {
  {
    return parse(getRequestHeader(useRequestEvent(), "cookie") || "", opts);
  }
}
function writeServerCookie(event, name, value, opts = {}) {
  if (event) {
    if (value !== null && value !== void 0) {
      return setCookie(event, name, value, opts);
    }
    if (getCookie(event, name) !== void 0) {
      return deleteCookie(event, name, opts);
    }
  }
}
const useAuth = () => {
  const user = useState("auth.user", () => null);
  const isLoggedIn = computed(() => !!user.value);
  const login = async (email2, password) => {
    var _a;
    try {
      const data = await $fetch("/api/auth/login", {
        method: "POST",
        body: { email: email2, password }
      });
      user.value = data.user;
      const tokenCookie = useCookie("auth-token", {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 60 * 60 * 24 * 7
        // 7 days
      });
      tokenCookie.value = data.token;
      await navigateTo("/dashboard");
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: ((_a = error.data) == null ? void 0 : _a.message) || "Erro ao fazer login"
      };
    }
  };
  const register = async (userData) => {
    var _a;
    try {
      const data = await $fetch("/api/auth/register", {
        method: "POST",
        body: userData
      });
      user.value = data.user;
      const tokenCookie = useCookie("auth-token");
      tokenCookie.value = data.token;
      await navigateTo("/dashboard");
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: ((_a = error.data) == null ? void 0 : _a.message) || "Erro ao criar conta"
      };
    }
  };
  const logout = async () => {
    user.value = null;
    const tokenCookie = useCookie("auth-token");
    tokenCookie.value = null;
    await navigateTo("/");
  };
  const fetchUser = async () => {
    try {
      const data = await $fetch("/api/auth/me");
      user.value = data;
    } catch (error) {
      user.value = null;
    }
  };
  const hasRole = (role) => {
    var _a;
    return ((_a = user.value) == null ? void 0 : _a.role) === role;
  };
  const isAdmin = computed(() => hasRole("ADMIN"));
  const isPriest = computed(() => hasRole("PRIEST"));
  const isOrganizer = computed(() => hasRole("ORGANIZER"));
  const isMember = computed(() => hasRole("MEMBER"));
  const forgotPassword = async (email2) => {
    var _a;
    try {
      await $fetch("/api/auth/forgot-password", {
        method: "POST",
        body: { email: email2 }
      });
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: ((_a = error.data) == null ? void 0 : _a.message) || "Erro ao processar solicita\xE7\xE3o"
      };
    }
  };
  const resetPassword = async (token, password, confirmPassword) => {
    var _a;
    try {
      await $fetch("/api/auth/reset-password", {
        method: "POST",
        body: { token, password, confirmPassword }
      });
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: ((_a = error.data) == null ? void 0 : _a.message) || "Erro ao redefinir senha"
      };
    }
  };
  return {
    user: readonly(user),
    isLoggedIn,
    isAdmin,
    isPriest,
    isOrganizer,
    isMember,
    login,
    register,
    logout,
    fetchUser,
    hasRole,
    forgotPassword,
    resetPassword
  };
};

export { useAuth as u };
//# sourceMappingURL=useAuth-CemiwPt3.mjs.map
