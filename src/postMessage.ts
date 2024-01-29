/**
 * Post Slack message in a channel
 *
 * See https://api.slack.com/methods/chat.postMessage
 */
import { LaunchProps, showHUD } from "@raycast/api";
import { ErrorCode } from "@slack/web-api";
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
  try {
    const result = await slack.chat.postMessage({
      as_user: true,
      text: message,
      channel: channel
    });
    await showHUD(`Successfully sent message (${result.ts}) in ${channel}`);
  } catch(error: any) {
    if (ErrorCode.PlatformError === error?.code) {
      console.log('slack postMessage PlatformError');
      console.log(error?.data);
      await showHUD(`Failed to post message: ${error?.data?.error}`);
    } else if (ErrorCode.RateLimitedError === error?.code) {
      console.log('slack postMessage RateLimitedError');
      console.log(error?.data);
      await showHUD(`Failed to post message due to rate limiting. Will retry.`);
    } else {
      console.log('slack postMessage error');
      console.log(error);
      await showHUD(`Failed to post message. Error code: ${error?.code}. Error: ${error?.data?.error}`);
    }
  }
}
