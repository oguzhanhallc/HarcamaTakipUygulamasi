import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {

  harcamaAdi: string = "";
  harcamaTutari: number | null = null;
  kategori: string = "";
  harcamalar: any[] = [];
  HarcamaToplam : number = 0;

  constructor() {}

  ngOnInit() {
  const veriler = localStorage.getItem('harcamalar');
  if (veriler) {
    this.harcamalar = JSON.parse(veriler);
    
    // Sayfa açılırken toplamı hemen hesapla ki 0 görünmesin!
    this.HarcamaToplam = 0;
    for (let h of this.harcamalar) {
      this.HarcamaToplam += Number(h.harcamaTutari);
    }
  }
}

  Kaydet() {
    if (!this.harcamaAdi || this.harcamaTutari === null || !this.kategori) {
      alert("Lütfen tüm alanları doldurun!");
      return;
    }
    console.log("Harcama Adı: " + this.harcamaAdi);
    console.log("Harcama Tutarı: " + this.harcamaTutari);
    console.log("Kategori: " + this.kategori);
    this.harcamalar.push({
      harcamaAdi: this.harcamaAdi,
      harcamaTutari: this.harcamaTutari,
      kategori: this.kategori
    });
    this.HarcamaToplamHesapla();
    localStorage.setItem('harcamalar', JSON.stringify(this.harcamalar));
    this.harcamaAdi = "";
    this.harcamaTutari = null;
    this.kategori = "";
  }

  HarcamaToplamHesapla() {
    let toplam = 0;
    for (let harcama of this.harcamalar) {
      toplam += harcama.harcamaTutari;
    }
    this.HarcamaToplam = toplam;
  }

  sil(harcama: any, slidingItem: any) {
  // 1. Önce kayan menüyü kapatıyoruz (arayüz hatasını önler)
  if (slidingItem) {
    slidingItem.close();
  }

  // 2. Sadece seçtiğin harcamayı listeden atıyoruz
  this.harcamalar = this.harcamalar.filter(h => h !== harcama);

  // 3. Toplamı güncelliyoruz
  this.HarcamaToplamHesapla();
  }

  SaveToLocalStorage() {
    localStorage.setItem('harcamalar', JSON.stringify(this.harcamalar));
  }
}
