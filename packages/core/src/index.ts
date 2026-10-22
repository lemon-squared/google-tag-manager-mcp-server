export const serverName = "google-tag-manager-mcp";

/** Supplies a Google access token. The CLI and a future hosted worker both implement this. */
export interface GtmAuthProvider {
  getAccessToken: () => Promise<string>;
}
