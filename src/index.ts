import { getPreferenceValues, showHUD, Clipboard } from "@raycast/api";
import { LogLevel, WebClient } from "@slack/web-api";

export default async function main() {
  const { slackToken } = getPreferenceValues<Preferences>();
  const slack = new WebClient(slackToken, {
    logLevel: LogLevel.DEBUG,
  });
  slack.users.profile.set({
    profile: {
      status_text: 'hello world'
    }
  });
  const now = new Date();
  await Clipboard.copy(now.toLocaleDateString());
  await showHUD("Copied date to clipboard");
}
