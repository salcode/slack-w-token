import { getPreferenceValues } from "@raycast/api";
import { LogLevel, WebClient } from "@slack/web-api";

export default function getSlackWebClient() {
  const { slackToken } = getPreferenceValues<Preferences>();
  return new WebClient(slackToken, {
    logLevel: LogLevel.DEBUG,
  });
}
