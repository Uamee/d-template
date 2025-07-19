import type { Configuration, PopupRequest } from "@azure/msal-browser";

export const msalConfig: Configuration = {
  auth: {
    clientId: import.meta.env.VITE_MICROSOFT_CLIENT_ID,
    authority: `https://login.microsoftonline.com/${
      import.meta.env.VITE_MICROSOFT_TENANT_ID
    }`,
    redirectUri:
      import.meta.env.VITE_MICROSOFT_REDIRECT_URI || window.location.origin,
  },
  cache: {
    cacheLocation: "localStorage",
    storeAuthStateInCookie: false,
  },
};

export const loginRequest: PopupRequest = {
  scopes: ["User.Read", "profile", "email", "openid"],
};

export const silentRequest = {
  scopes: ["User.Read"],
  account: undefined as any,
};
