import { Wallpaper } from "@/types/wallpaper";
import { getSupabaseClient } from "./db";

export async function insertAffiliate(wallpaper: Wallpaper) {
  const db = getSupabaseClient();
  const { data, error } = await db.from("wallpapers").insert(wallpaper);
  if (error) {
    throw error;
  } 
  return data;
}


export async function getWallpapers(
    page: number = 1,
    limit: number = 50
  ): Promise<Wallpaper[] | undefined> {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from("wallpapers")
      .select("*")
      .order("created_at", { ascending: false })
      .range((page - 1) * limit, page * limit);
  
    if (error) {
      console.error("Error fetching user invites:", error);
      return [];
    }
  
    if (!data || data.length === 0) {
      return undefined;
    }
  
    return data;
  }
  
