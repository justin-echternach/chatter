import { Form, useLoaderData } from "@remix-run/react";
import createServerSupabase from "utils/supabase.server"
import { ActionArgs, json, type LoaderArgs, type V2_MetaFunction } from "@remix-run/node";
import Login from "~/components/login";
import RealtimeMessages from "~/components/realtime-message";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

// eslint-disable-next-line no-empty-pattern
export const loader = async ({ request }: LoaderArgs) => {
  const response = new Response();
  const supabase = createServerSupabase({ request, response });
  const { data } = await supabase.from("messages").select();

  return json({ messages: data ?? [] }, { headers: response.headers });
}

export const action = async ({ request }: ActionArgs) => {
  const response = new Response();
  const supabase = createServerSupabase({ request, response });

  const { message } = Object.fromEntries(await request.formData());
  const { error } = await supabase.from("messages").insert({ content: String(message) });

  if (error) {
    console.log(error);
  }

  return json(null, { headers: response.headers });
}
export default function Index() {
  const { messages } = useLoaderData<typeof loader>();
  return (
    <div>
      <Login />
      <RealtimeMessages serverMessages={messages} />
      <Form method="post">
        <input type="text" name="message" placeholder="message" />
        <button type="submit">Submit</button>
      </Form>
    </div>
  );
}
