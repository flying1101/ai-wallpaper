import { handleOrderSession } from "@/services/order";
import { redirect } from "next/navigation";
import { toast } from "sonner";

type Props = {
  session_id: string
}

export default async function ({ params }: { params: Promise<Props> }) {
  try {
    
    const { session_id }= await params;
    handleOrderSession(session_id);
  } catch (e) {
    console.log("handle order session failed: ", e);
    toast.error("handle order failed");
  }

  redirect("/");
}
