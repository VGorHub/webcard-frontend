import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Проверка аутентификации для административных маршрутов
  // В реальном приложении здесь должна быть более надежная проверка токенов
  if (request.nextUrl.pathname.startsWith("/admin")) {
    // Для демонстрации мы не делаем проверку на сервере,
    // так как используем localStorage на клиенте
    // В реальном приложении здесь должна быть проверка сессии или JWT
    return NextResponse.next()
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*"],
}
