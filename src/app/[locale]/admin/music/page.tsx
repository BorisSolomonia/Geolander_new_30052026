import { getMusicGenres } from "@/lib/actions/music";
import { MusicManager } from "@/components/admin/music-manager";

export const dynamic = "force-dynamic";

export default async function AdminMusicPage() {
  const genres = await getMusicGenres();

  return <MusicManager genres={genres} />;
}
