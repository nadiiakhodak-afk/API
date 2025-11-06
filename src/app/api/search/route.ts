// Це потрібно для output: 'export' — маршрут має бути повністю статичним
export const dynamic = 'force-static';
export const revalidate = 0;

export async function GET() {
    return Response.json({ hits: [] });
}