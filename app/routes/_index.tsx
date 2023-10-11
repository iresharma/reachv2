import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Instagram, Twitch, YoutubeIcon } from "lucide-react";
import {json, LoaderArgs, V2_MetaFunction} from "@remix-run/node";
import {getSession} from "~/session";
import {useLoaderData} from "react-router";
import {useEffect} from "react";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "Reach" },
    { name: "description", content: "Authentication forms built using the components." },
  ];
};

export const loader = async ({request}: LoaderArgs) => {
  const session = await getSession(request.headers.get("Cookie"));
  return json({
    session: session
  })
}

export default function DashboardPage() {
  const {session} = useLoaderData();
  useEffect(() => {
    Object.keys(session.data).map((val) => {
      localStorage.setItem(val, session.data[val]);
    })
  })
  return (
      <>
        <div className="flex-col flex">
          <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
              <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
              <div className="flex items-center space-x-2">
                <h2 className="text-xl font-bold tracking-tight">
                  Can add stuff here
                </h2>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 cursor-pointer">
                  <CardTitle className="text-sm font-medium">
                    Total Shop Revenue
                  </CardTitle>
                  <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                  >
                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$45,231.89</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-400">+20.1%</span>&nbsp; from last
                    month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 cursor-pointer">
                  <CardTitle className="text-sm font-medium">Youtube</CardTitle>
                  <YoutubeIcon className="h-4 w-4 text-muted-foreground text-red-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">2350</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-400">+20.1%</span>&nbsp; from last
                    month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Instagram</CardTitle>
                  <Instagram className="h-4 w-4 text-[#d6249f]" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12,234</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-red-400">-20.1%</span>&nbsp; from last
                    month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Twitch</CardTitle>
                  <Twitch className="text-[#9146FF] h-4 w-4" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">573</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-400">+20.1%</span>&nbsp; from last
                    month
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
          <code>
            <pre>
              {JSON.stringify(session, null, 4)}
            </pre>
          </code>
        </div>
      </>
  );
}
