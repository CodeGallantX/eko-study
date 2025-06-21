// utils/supabase/server.ts
import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies as getCookies } from "next/headers";

export const createSupabaseServerClient = async () => {
  const cookieStore = await getCookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set?.({ name, value, ...options });
          } catch (error) {
            console.warn(`Supabase cookie set failed for "${name}":`, error);
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set?.({ name, value: "", ...options });
          } catch (error) {
            console.warn(`Supabase cookie remove failed for "${name}":`, error);
          }
        },
      },
    }
  );
};

export type SupabaseServerClient = Awaited<ReturnType<typeof createSupabaseServerClient>>;
