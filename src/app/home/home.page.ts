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
  fechaNacimiento: string = ''; // Fecha confirmada
  fechaTemporal: string = ''; // Fecha seleccionada temporalmente
  mostrarCalendario: boolean = false;

  constructor(private alertController: AlertController, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.username = params['username'] || 'Usuario por defecto';
    });
  }

  abrirModalCalendario() {
    this.fechaTemporal = this.fechaNacimiento; // Inicializar la fecha temporal con la fecha actual
    this.mostrarCalendario = true;
  }

  cerrarModalCalendario() {
    this.mostrarCalendario = false;
  }

  confirmarFechaSeleccionada() {
    const [datePart] = this.fechaTemporal.split('T');  // Extraer solo la parte de la fecha (YYYY-MM-DD)
    const [year, month, day] = datePart.split('-');  // Descomponer la fecha en partes
    this.fechaNacimiento = `${day}/${month}/${year}`;  // Reordenar al formato DD/MM/YYYY
    this.cerrarModalCalendario(); // Cerrar el modal después de confirmar
  }

  limpiarCampos() {
    this.nombre = '';
    this.apellido = '';
    this.nivelEducacion = '';
    this.fechaNacimiento = '';
  }

  async mostrarInformacion() {
    if (!this.nombre || !this.apellido || !this.nivelEducacion || !this.fechaNacimiento) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Por favor, complete todos los campos.',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    const alert = await this.alertController.create({
      header: 'Información del Usuario',
      message: `Su nombre es: ${this.nombre} ${this.apellido}`,
      buttons: ['OK']
    });

    await alert.present();
  }
}
