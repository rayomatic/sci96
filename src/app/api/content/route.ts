import { get, put, BlobNotFoundError, BlobStoreNotFoundError } from "@vercel/blob";

const PATHNAME = "ticketing-mockup-content.json";
const EDIT_PASSWORD = process.env.EDIT_PASSWORD ?? "Sci96!";

export const dynamic = "force-dynamic";

async function readContent(): Promise<unknown> {
  try {
    const result = await get(PATHNAME, { access: "public" });
    if (!result || result.statusCode !== 200) return {};
    const text = await new Response(result.stream).text();
    return text ? JSON.parse(text) : {};
  } catch (err) {
    // Blob not yet uploaded / store not provisioned → fall back to defaults on the client.
    if (err instanceof BlobNotFoundError) return {};
    if (err instanceof BlobStoreNotFoundError) return {};
    if (err instanceof Error && /not.*found/i.test(err.message)) return {};
    throw err;
  }
}

export async function GET() {
  try {
    const data = await readContent();
    return Response.json(data, {
      headers: {
        "Cache-Control": "no-store, must-revalidate",
      },
    });
  } catch (err) {
    return Response.json(
      { error: err instanceof Error ? err.message : "Unknown error" },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  const password = req.headers.get("x-edit-password") ?? "";
  if (password !== EDIT_PASSWORD) {
    return Response.json({ error: "Invalid password" }, { status: 401 });
  }
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Body must be JSON" }, { status: 400 });
  }
  try {
    await put(PATHNAME, JSON.stringify(body), {
      access: "public",
      addRandomSuffix: false,
      allowOverwrite: true,
      contentType: "application/json",
    });
    return Response.json({ ok: true });
  } catch (err) {
    return Response.json(
      { error: err instanceof Error ? err.message : "Write failed" },
      { status: 500 },
    );
  }
}
