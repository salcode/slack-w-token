/**
 * Set Slack Status and Emoji
 *
 * See https://api.slack.com/methods/users.profile.set
 */
import { LaunchProps, showHUD } from "@raycast/api";
import getSlackWebClient from './utils/getSlackWebClient';

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

  const slack = getSlackWebClient();
  slack.users.profile.set({
    profile: {
      status_text: message,
      status_emoji: `${emoji}`
    }
  });
  await showHUD("Done");
}
