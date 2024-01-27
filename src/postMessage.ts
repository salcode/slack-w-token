/**
 * Post Slack message in a channel
 *
 * See https://api.slack.com/methods/chat.postMessage
 */
import { LaunchProps, showHUD } from "@raycast/api";
import getSlackWebClient from './utils/getSlackWebClient';

type StatusArgs = {
  message: string;
  channel: string;
};

export default async function main(props: LaunchProps<{ arguments: StatusArgs }>) {
  const {
    arguments: {
      message,
      channel
    }
  } = props;

  const slack = getSlackWebClient();
  slack.chat.postMessage({
    as_user: true,
    text: message,
    channel: channel
  });
  await showHUD("Done");
}
