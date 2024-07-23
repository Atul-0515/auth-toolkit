import { TriangleAlert } from "lucide-react";
import { CardWrapper } from "./card-wrapper";



export function ErrorCard() {
  return <CardWrapper
    headerLabel="Oops! Something went wrong!"
    backButtonHref="/auth/login"
    backButtonLabel="Back to login"
  >
    <div className="flex justify-center">
      <TriangleAlert className="text-destructive w-12 h-12" />

    </div>
  </CardWrapper>
}