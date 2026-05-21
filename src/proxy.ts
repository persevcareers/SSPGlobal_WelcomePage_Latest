import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
  const url = request.nextUrl.clone()
  const hostname = request.headers.get('host') || ''

  // Skip static assets, images, next configs, and api routes
  if (
    url.pathname.startsWith('/_next') ||
    url.pathname.startsWith('/api') ||
    url.pathname.includes('.')
  ) {
    return NextResponse.next()
  }

  // Handle subdomain mapping
  // Works for both live subdomains and localhost subdomains
  if (hostname.startsWith('sti.')) {
    // If the path already has /sti, don't double rewrite
    if (!url.pathname.startsWith('/sti')) {
      url.pathname = `/sti${url.pathname === '/' ? '' : url.pathname}`
      return NextResponse.rewrite(url)
    }
  }

  if (hostname.startsWith('ss.')) {
    // If the path already has /ss, don't double rewrite
    if (!url.pathname.startsWith('/ss')) {
      url.pathname = `/ss${url.pathname === '/' ? '' : url.pathname}`
      return NextResponse.rewrite(url)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - manifest.webmanifest (web manifest)
     * - sitemap.xml, robots.txt, icons.svg
     */
    '/((?!api|_next/static|_next/image|favicon.ico|manifest.webmanifest|sitemap.xml|robots.txt|icons.svg).*)',
  ],
}
