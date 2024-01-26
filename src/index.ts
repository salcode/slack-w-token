import { getPreferenceValues, showHUD } from "@raycast/api";
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
  await showHUD("Done");
}
