import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WebServiceProvider } from '../../providers/web-service/web-service';
import { AlertController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { LoginResponse } from '../../model/LoginResponse';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [WebServiceProvider]
})
export class LoginPage {

  loginForm: FormGroup;

        constructor(public nav: NavController, public navParams: NavParams, public formBuilder: FormBuilder,
      public alertCtrl: AlertController, public servicio: WebServiceProvider,public loadingCtrl: LoadingController) {


                        let alert = this.alertCtrl.create({
                            title: 'IP del Servidor',
                            inputs: [
                              {
                                name: 'url',
                                placeholder: 'URL',
                                value: 'http://localhost/irapp/public',
                              }
                            ],
                            buttons: [
                              {
                                text: 'Cancelar',
                                role: 'cancel',
                                handler: data => {
                                  console.log('Cancel clicked');
                                  window.localStorage.setItem('url_server', "http://localhost/irapp/public");
                                }
                              },
                              {
                                text: 'Guardar',
                                handler: data => {
                                  window.localStorage.setItem('url_server', data.url);
                                }
                              }
                            ]
                          });
                          alert.present();
            this.loginForm = formBuilder.group({
                email: ['root@example.com', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])]
          ,password: ['root1234', Validators.compose([Validators.required])]
            });

        }


        onSubmit(value: any): void {
          let loading = this.loadingCtrl.create({
            spinner: 'bubbles',
            content: 'Por favor espere...',
            duration: 30000
          });
          try{  
            loading.present();
            this.servicio.getLogin(value.email,value.password)
            .then(data => {
              loading.dismiss();
              let response = new LoginResponse();
              response.setData(data[0],data[1],data[2]);
              console.log(response);
              if(response.status === 200) {
                window.localStorage.setItem('user-data', JSON.stringify(response.usuario));
                let alert = this.alertCtrl.create({
                  title: "Exito!",
                  subTitle: response.message,
                  buttons: ['OK']
                  });
                  alert.present();
                  this.nav.push(TabsPage);
              }else{
                let alert = this.alertCtrl.create({
              title: "Error!",
              subTitle: "El usuario o contraseña es incorrecto.",
              buttons: ['OK']
              });
              alert.present();
              }
          });

        }catch(ex){
          loading.dismiss();
          let alert = this.alertCtrl.create({
        title: "Error!",
        subTitle: ex,
        buttons: ['OK']
        });
        alert.present();

        }

        }


  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
