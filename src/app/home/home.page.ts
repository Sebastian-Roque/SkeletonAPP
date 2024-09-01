import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  username: string = ''; 
  nombre: string = '';
  apellido: string = '';
  nivelEducacion: string = '';
  fechaSeleccionada: Date | null = null; // Variable para la fecha seleccionada

  constructor(private alertController: AlertController, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.username = params['username'] || 'Usuario por defecto';
    });
  }

  limpiarCampos() {
    this.nombre = '';
    this.apellido = '';
    this.nivelEducacion = '';
    this.fechaSeleccionada = null; // Limpiar el campo de fecha
  }

  async mostrarInformacion() {
    if (!this.nombre || !this.apellido || !this.nivelEducacion || !this.fechaSeleccionada) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Por favor, complete todos los campos.',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    const alert = await this.alertController.create({
      header: 'Usuario',
      message: `Su nombre es: ${this.nombre} ${this.apellido}
                Nivel de educación: ${this.nivelEducacion} 
                Fecha seleccionada: ${this.fechaSeleccionada.toLocaleDateString()}`,
      buttons: ['OK']
    });

    await alert.present();
  }
}
