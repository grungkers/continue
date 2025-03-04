import { v4 as uuidv4 } from "uuid";
import { IdeSettings } from "../..";
import { getControlPlaneEnv } from "../env";

export async function getAuthUrlForTokenPage(
  ideSettingsPromise: Promise<IdeSettings>,
  useOnboarding: boolean,
): Promise<string> {
  const env = await getControlPlaneEnv(ideSettingsPromise);
  const url = new URL("https://chatai.directory.internal/auth");
  const params = {
    response_type: "code",
    client_id: env.WORKOS_CLIENT_ID,
    redirect_uri: `${env.APP_URL}/oauth/oidc/callback`,
    // redirect_uri: "http://localhost:3000/tokens/callback",
    state: uuidv4(),
    provider: "Authentik",
  };
  Object.keys(params).forEach((key) =>
    url.searchParams.append(key, params[key as keyof typeof params]),
  );
  return url.toString();
}
