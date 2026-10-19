import { type NextRequest } from "next/server";
import { get, notAllowed } from "@/lib/api";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ resource: string }> },
) {
  const { resource } = await params;
  return get(resource, request.nextUrl.searchParams);
}

export const POST = notAllowed;
export const PUT = notAllowed;
export const PATCH = notAllowed;
export const DELETE = notAllowed;
