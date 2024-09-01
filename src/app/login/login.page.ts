import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  username: string = ''; 
  password: string = ''; 
  passwordType: string = 'password'; // Tipo de campo de entrada de la contraseña
  passwordIcon: string = 'eye-off';  // Icono por defecto

  constructor(private navCtrl: NavController) { }

  login() {
    if (this.validateInputs()) {
      this.navCtrl.navigateForward(['/home'], {
        queryParams: { username: this.username }
      });
    } else {
      alert('Por favor, ingresa credenciales válidas.');
    }
  }

  validateInputs(): boolean {
    const validUsername = /^[a-zA-Z0-9]{3,8}$/.test(this.username);
    const validPassword = /^[0-9]{4}$/.test(this.password);
    return validUsername && validPassword;
  }

  togglePasswordVisibility() {
    this.passwordType = this.passwordType === 'password' ? 'text' : 'password';
    this.passwordIcon = this.passwordType === 'password' ? 'eye-off' : 'eye';
  }
}
