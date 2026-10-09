# Website Undangan Pengajian Pemuda Muhammadiyah Tembok Luwung

Website statis responsif yang bisa dipublikasikan gratis menggunakan **GitHub Pages**. Tidak membutuhkan backend atau database.

## Fitur
- Landing page bernuansa hijau tua dan emas.
- Format surat undangan digital mengikuti contoh surat fisik.
- Nama penerima bisa diganti lewat tombol **Atur Undangan**.
- Tanggal, waktu, tempat, mubaligh, tema, nomor surat, dan tautan Maps dapat diubah.
- Bagikan undangan, kirim teks melalui WhatsApp, dan unduh file pengingat kalender.
- Tampilan responsif untuk HP.
- Gaya cetak untuk menyimpan surat undangan sebagai PDF melalui menu Print browser.

> Catatan: perubahan melalui panel **Atur Undangan** hanya berlaku pada sesi/browser saat itu. Untuk mengganti isi yang dilihat semua penerima secara permanen, edit objek `EVENT` di bagian paling atas `script.js`, lalu commit/push ke GitHub. Nama penerima bisa dipersonalisasi melalui parameter URL `?untuk=Nama%20Penerima`, misalnya `https://USERNAME.github.io/undangan-pengajian-prpm/?untuk=Ahmad%20Fauzi`.

## Cara publish ke GitHub Pages

1. Login atau buat akun di https://github.com
2. Klik **New repository**.
3. Isi nama repository, misalnya `undangan-pengajian-prpm`, pilih **Public**, lalu klik **Create repository**.
4. Ekstrak ZIP ini di komputer/HP.
5. Upload `index.html`, `style.css`, `script.js`, dan `README.md` ke halaman repository (bisa dengan **Add file → Upload files**).
6. Klik **Commit changes**.
7. Buka **Settings → Pages**.
8. Pada bagian **Build and deployment**, pilih **Deploy from a branch**.
9. Pilih branch **main** dan folder **/(root)**, lalu klik **Save**.
10. Tunggu proses publikasi. Alamatnya biasanya:
   `https://USERNAME.github.io/undangan-pengajian-prpm/`

Ganti `USERNAME` dengan username GitHub milik Anda. GitHub akan menampilkan URL Pages yang tepat di halaman Settings → Pages.

## Cara mengubah detail acara untuk semua orang

Buka `script.js`, cari bagian `const EVENT = { ... }`, lalu ubah nilai di dalam tanda kutip. Tanggal harus berformat `YYYY-MM-DD`, contoh `2026-10-23`. Simpan dan commit perubahan ke GitHub.

## Catatan nama penerima
Penerima dapat diedit lewat panel pengaturan, atau dipersonalisasi melalui link `?untuk=Nama%20Penerima`. Contoh: `https://USERNAME.github.io/undangan-pengajian-prpm/?untuk=Ahmad%20Fauzi`. Ganti spasi dengan `%20`. Nama dari parameter URL akan tampil otomatis saat link dibuka. Perubahan di panel hanya berlaku di browser saat itu, bukan otomatis tersimpan untuk semua pengunjung.
