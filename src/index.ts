/**
 * Set Slack Status and Emoji
 *
 * See https://api.slack.com/methods/users.profile.set
 */
import { getPreferenceValues, LaunchProps, showHUD } from "@raycast/api";
import { LogLevel, WebClient } from "@slack/web-api";

type StatusArgs = {
  message: string;
  emoji: string;
};

export default async function main(props: LaunchProps<{ arguments: StatusArgs }>) {
  const {
    arguments: {
      message,
      emoji
    }
  } = props;
  const { slackToken } = getPreferenceValues<Preferences>();
  const slack = new WebClient(slackToken, {
    logLevel: LogLevel.DEBUG,
  });
  slack.users.profile.set({
    profile: {
      status_text: message,
      status_emoji: `${emoji}`
    }
  });
  await showHUD("Done");
}
