import { useState } from 'react'
import { supabase } from '../lib/supabase'
import TryoutStats from '../components/TryoutStats'

const MOCK_TRYOUTS = [
  { id: '1', ad_soyad: 'Ahmet Yılmaz', telefon: '5321234567', ogrenci_no: '21070001', boy: '182', kilo: '78', sinif_bolum: '2. Sınıf - Bilgisayar Müh.', created_at: '2026-05-24T10:12:00Z' },
  { id: '2', ad_soyad: 'Mert Kaya', telefon: '5059876543', ogrenci_no: '22070045', boy: '175', kilo: '83', sinif_bolum: '1. Sınıf - Makine Müh.', created_at: '2026-05-24T11:30:00Z' },
  { id: '3', ad_soyad: 'Emre Demir', telefon: '5423456789', ogrenci_no: '23070112', boy: '188', kilo: '92', sinif_bolum: '3. Sınıf - Elektrik-Elektronik Müh.', created_at: '2026-05-24T13:45:00Z' },
  { id: '4', ad_soyad: 'Burak Şahin', telefon: '5067654321', ogrenci_no: '21070088', boy: '179', kilo: '74', sinif_bolum: '2. Sınıf - Endüstri Müh.', created_at: '2026-05-25T09:05:00Z' },
  { id: '5', ad_soyad: 'Kerem Arslan', telefon: '5552223344', ogrenci_no: '24070003', boy: '185', kilo: '88', sinif_bolum: '1. Sınıf - Kimya Müh.', created_at: '2026-05-25T10:20:00Z' },
]

const MOCK_FEEDBACKS = [
  { id: '1', kategori: 'öneri', mesaj: 'Antrenman saatleri daha erken başlayabilir, derslere yetişmek zorlaşıyor.', created_at: '2026-05-24T12:00:00Z' },
  { id: '2', kategori: 'şikayet', mesaj: 'Ekipmanların bakımı düzenli yapılmıyor, bazı koruyucular hasar görmüş durumda.', created_at: '2026-05-24T15:30:00Z' },
  { id: '3', kategori: 'diğer', mesaj: 'Sosyal medya hesapları daha aktif kullanılsa takımın tanınırlığı artar.', created_at: '2026-05-25T08:45:00Z' },
]

export default function Admin() {
  const [password, setPassword] = useState('')
  const [authed, setAuthed] = useState(false)
  const [authError, setAuthError] = useState('')
  const [activeTab, setActiveTab] = useState('tryout')
  const [tryouts, setTryouts] = useState(null)
  const [feedbacks, setFeedbacks] = useState(null)
  const [loading, setLoading] = useState(false)

  async function handleLogin(e) {
    e.preventDefault()
    if (password !== import.meta.env.VITE_ADMIN_PASSWORD) {
      setAuthError('Hatalı şifre.')
      return
    }
    setAuthed(true)
    fetchData()
  }

  async function fetchData() {
    if (!supabase) {
      setTryouts(MOCK_TRYOUTS)
      setFeedbacks(MOCK_FEEDBACKS)
      return
    }
    setLoading(true)
    const [{ data: t }, { data: f }] = await Promise.all([
      supabase.from('tryout_submissions').select('*').order('created_at', { ascending: false }),
      supabase.from('feedback_submissions').select('*').order('created_at', { ascending: false }),
    ])
    setTryouts(t || [])
    setFeedbacks(f || [])
    setLoading(false)
  }

  const TRYOUT_HEADERS = {
    id: 'ID', ad_soyad: 'Ad Soyad', telefon: 'Telefon',
    ogrenci_no: 'Öğrenci No', boy: 'Boy (cm)', kilo: 'Kilo (kg)',
    sinif_bolum: 'Sınıf / Bölüm', created_at: 'Tarih',
  }
  const FEEDBACK_HEADERS = {
    id: 'ID', kategori: 'Kategori', mesaj: 'Mesaj', created_at: 'Tarih',
  }

  function exportCSV(data, filename, headerMap) {
    if (!data?.length) return
    const SEP = ';'
    const keys = Object.keys(headerMap)
    const headerRow = keys.map(k => headerMap[k]).join(SEP)
    const rows = data.map(row =>
      keys.map(k => `"${String(row[k] ?? '').replace(/"/g, '""')}"`).join(SEP)
    )
    const csv = [headerRow, ...rows].join('\r\n')
    const blob = new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url; a.download = filename; a.click()
    URL.revokeObjectURL(url)
  }

  if (!authed) {
    return (
      <div className="page">
        <div style={{ maxWidth: '400px', width: '100%' }}>
          <div style={{ marginBottom: '36px', animation: 'slideUp 0.4s ease' }}>
            <span style={eyebrow}>Gizli</span>
            <h2 style={{ fontSize: '2.4rem', color: '#e0e0e0', letterSpacing: '4px', marginBottom: 0 }}>
              Admin Paneli
            </h2>
            <div style={{ width: '40px', height: '3px', background: '#CC2222', marginTop: '12px' }} />
          </div>
          <div className="card" style={{ maxWidth: 'none', animationDelay: '0.1s', animationFillMode: 'both' }}>
            <form onSubmit={handleLogin}>
              <div className="form-group">
                <label htmlFor="pw">Şifre</label>
                <input id="pw" type="password" value={password}
                  onChange={e => setPassword(e.target.value)} placeholder="••••••••"
                  onKeyDown={e => e.key === 'Enter' && handleLogin(e)} />
              </div>
              {authError && <p className="error-msg">{authError}</p>}
              <button className="btn btn-primary" type="submit" style={{ marginTop: '8px' }}>
                Giriş Yap
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }

  const current = activeTab === 'tryout' ? tryouts : feedbacks

  return (
    <div className="page" style={{ alignItems: 'flex-start' }}>
      <div className="card" style={{ maxWidth: '960px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h2 style={{ margin: 0, color: '#e0e0e0' }}>Admin Paneli</h2>
          <button className="btn btn-secondary" style={{ fontSize: '0.85rem', padding: '8px 16px', letterSpacing: '2px' }}
            onClick={() => setAuthed(false)}>
            Çıkış
          </button>
        </div>

        {activeTab === 'tryout' && <TryoutStats data={tryouts} />}

        <div className="tabs">
          <button className={`tab ${activeTab === 'tryout' ? 'active' : ''}`}
            onClick={() => setActiveTab('tryout')}>
            Başvurular {tryouts ? `(${tryouts.length})` : ''}
          </button>
          <button className={`tab ${activeTab === 'feedback' ? 'active' : ''}`}
            onClick={() => setActiveTab('feedback')}>
            Geri Bildirimler {feedbacks ? `(${feedbacks.length})` : ''}
          </button>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '12px' }}>
          <button className="btn btn-secondary"
            style={{ fontSize: '0.85rem', padding: '8px 16px', letterSpacing: '2px' }}
            onClick={() => exportCSV(current, `${activeTab}_${Date.now()}.csv`, activeTab === 'tryout' ? TRYOUT_HEADERS : FEEDBACK_HEADERS)}>
            CSV İndir ↓
          </button>
        </div>

        {loading && <p style={{ color: '#555', fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: '2px' }}>Yükleniyor...</p>}

        {!loading && current?.length === 0 && (
          <p style={{ color: '#555', fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: '1px' }}>Henüz kayıt yok.</p>
        )}

        {!loading && current?.length > 0 && (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  {Object.keys(current[0]).map(k => (
                    <th key={k}>{k}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {current.map(row => (
                  <tr key={row.id}>
                    {Object.values(row).map((v, i) => (
                      <td key={i}>{String(v)}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

const eyebrow = {
  fontFamily: "'Barlow Condensed', sans-serif",
  fontSize: '11px',
  letterSpacing: '4px',
  color: '#CC2222',
  fontWeight: 600,
  textTransform: 'uppercase',
  display: 'block',
  marginBottom: '8px',
}
