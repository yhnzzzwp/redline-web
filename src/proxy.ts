import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

/** Portal customer — tanpa penjagaan sesi admin/kasir. */
function buildCsp(isDev: boolean): string {
  const connectSrc = "'self'"
  return [
    "default-src 'self'",
    `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ''}`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: https:",
    "font-src 'self' data:",
    `connect-src ${connectSrc}`,
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    'upgrade-insecure-requests',
  ].join('; ')
}

export function proxy(request: NextRequest) {
  const isDev = process.env.NODE_ENV === 'development'
  const response = NextResponse.next()
  response.headers.set('Content-Security-Policy', buildCsp(isDev))
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  response.headers.set('X-XSS-Protection', '0')
  return response
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}