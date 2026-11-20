# Deploy — Portal customer (Vercel)

Project terpisah dari **redline-frontend** (staff/kasir).

| Env | Nilai |
|-----|--------|
| `API_BASE_URL` | `https://<render-api>.onrender.com/api/v1` |
| `NEXT_PUBLIC_WA_PHONE` | nomor WA |

**Satu MongoDB** dengan staff — hanya Flask yang pegang `MONGODB_URI`.

Tanpa foto di DB; promo & katalog teks/sku saja.