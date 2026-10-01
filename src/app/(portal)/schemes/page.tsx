import { pageActor } from "@/server/auth";
import { listSchemes } from "@/server/queries";
import { Schemes } from "@/components/schemes";
import { FindScholarship } from "@/components/find-scholarship";

export default async function SchemePage({ searchParams }: { searchParams: { find?: string } }) {
  const actor = await pageActor();
  const schemes = await listSchemes();
  
  if (searchParams.find === "1") {
    return <FindScholarship schemes={schemes} />;
  }
  
  return <Schemes actor={actor} schemes={schemes} />;
}
