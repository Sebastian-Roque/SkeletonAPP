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
}
