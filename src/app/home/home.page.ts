import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { Browser } from '@capacitor/browser';
import { IonicModule } from '@ionic/angular'; // <--- Importa el módulo
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule,CommonModule], // <--- Solo esto
})
export class HomePage implements OnInit {
  latitude: number | null = null;
  longitude: number | null = null;

  async ngOnInit() {
    await Geolocation.requestPermissions();
    await this.getCurrentLocation(); // <-- Espera a que termine
  }

 async getCurrentLocation() {
  try {
    const coordinates = await Geolocation.getCurrentPosition();
    this.latitude = coordinates.coords.latitude;
    this.longitude = coordinates.coords.longitude;
    console.log('Ubicación:', this.latitude, this.longitude); // <-- Agrega esto
  } catch (error) {
    console.error('Error obteniendo ubicación:', error);
  }
}

  async openInGoogleMaps() {
    if (this.latitude !== null && this.longitude !== null) {
      const url = `https://www.google.com/maps?q=${this.latitude},${this.longitude}`;
      await Browser.open({ url });
    } else {
      alert('Ubicación no disponible');
    }
  }
}
