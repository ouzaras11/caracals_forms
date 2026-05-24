# IZTECH Caracals — Form & Feedback Portal

IZTECH (İzmir Yüksek Teknoloji Enstitüsü) Amerikan Futbolu takımı için özel tasarımlı başvuru ve geri bildirim platformu. Google Forms yerine takıma özel branded bir deneyim sunar.

## Özellikler

- **Freshman Seçme Formu** — Yeni oyuncu başvurularını toplar (ad soyad, telefon, öğrenci no, boy/kilo, sınıf/bölüm)
- **Şikayet / Öneri Kutusu** — Anonim geri bildirim (şikayet, öneri veya diğer kategorisinde)
- **Admin Paneli** — Şifre korumalı; başvuruları ve geri bildirimleri tablo olarak görüntüle, CSV olarak dışa aktar

## Tech Stack

| Katman    | Teknoloji                     |
|----------|-------------------------------|
| Frontend | React 18 + Vite 5             |
| Backend  | Supabase (PostgreSQL + REST)  |
| Routing  | React Router v6               |
| Deploy   | Vercel / Netlify              |

## Kurulum

```bash
git clone https://github.com/ouzaras11/caracals_forms.git
cd caracals_forms
npm install
cp .env.example .env   # .env içindeki değerleri doldur
npm run dev
```

## Ortam Değişkenleri

| Değişken              | Açıklama                      |
|----------------------|-------------------------------|
| `VITE_SUPABASE_URL`  | Supabase proje URL'si         |
| `VITE_SUPABASE_ANON_KEY` | Supabase anon/public key  |
| `VITE_ADMIN_PASSWORD` | Admin paneli şifresi         |

## Supabase Tablo Şemaları

```sql
-- Seçme başvuruları
CREATE TABLE tryout_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  ad_soyad TEXT NOT NULL,
  telefon TEXT NOT NULL,
  ogrenci_no TEXT NOT NULL,
  boy TEXT NOT NULL,
  kilo TEXT NOT NULL,
  sinif_bolum TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Anonim geri bildirimler
CREATE TABLE feedback_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  kategori TEXT NOT NULL CHECK (kategori IN ('şikayet', 'öneri', 'diğer')),
  mesaj TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- RLS politikaları
ALTER TABLE tryout_submissions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "insert_public" ON tryout_submissions FOR INSERT WITH CHECK (true);
CREATE POLICY "select_auth"   ON tryout_submissions FOR SELECT USING (auth.role() = 'authenticated');

ALTER TABLE feedback_submissions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "insert_public" ON feedback_submissions FOR INSERT WITH CHECK (true);
CREATE POLICY "select_auth"   ON feedback_submissions FOR SELECT USING (auth.role() = 'authenticated');
```

## Deploy

```bash
npm run build   # dist/ klasörü oluşur
# Vercel:  vercel --prod
# Netlify: drag-drop dist/ ya da netlify deploy --prod --dir=dist
```

## Admin Paneli

`/admin` rotasına git → `.env`'deki `VITE_ADMIN_PASSWORD` şifresini gir → **Başvurular** ve **Geri Bildirimler** tablarını gör → her tab için ayrı CSV export butonu mevcuttur.
