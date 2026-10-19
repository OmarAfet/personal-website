import { type NextRequest } from "next/server";
import { API_VERSION, index, notAllowed, notFound } from "@/lib/api";

// /api and /api/v1 list the resources; any other /api path is a JSON 404, so
// clients never get an HTML error page from the API.
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path?: string[] }> },
) {
  const { path = [] } = await params;
  if (path.length === 0 || (path.length === 1 && path[0] === API_VERSION))
    return index();
  return notFound(request.nextUrl.pathname);
}

export const POST = notAllowed;
export const PUT = notAllowed;
export const PATCH = notAllowed;
export const DELETE = notAllowed;
