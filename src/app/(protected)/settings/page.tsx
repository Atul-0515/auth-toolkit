import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { signOut } from "@/auth";


export default async function SettingsPage() {
  const session = await auth();
  

  return <div className="m-5 flex flex-col justify-center items-center">
    <h1 className="text-2xl mb-12">Setting Page</h1>
    <p>
      {JSON.stringify(session)}
    </p>
    <form className="mt-8" action={async () => {
      "use server";
      await signOut();

    }}>
      <Button type="submit">Logout</Button>
    </form>
  </div >
}