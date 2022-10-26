# NBAProjectAPICooperativo
## API sobre la NBA - Trabajo cooperativo


___
## **Introducción**

Este es un ejercicio práctico para el desarrollo web y manejo de APIs con **Angular**.

Se ha trabajado sobre la siguiente **documentación:**

* [NBA API](https://github.com/kshvmdn/nba.js/blob/master/docs/api/DATA.md)
* [FOTOS](https://medium.com/@avinash.sarguru/getting-nba-player-pictures-for-you-application-6106d5530943)
* [NBA.com OFICIAL](https://www.sportingnews.com/es/nba?gr=www)


También se ha prácticado el manejo de **PostMan** y de metodologías ágiles como **SCRUM** para el reparto de tareas a través de **GitHub**.

Se pueden realizar las siguientes funcionalidades: 
* Listado de jugadores 
* Listado de Equipos por año seleccionable desde 2017 
* Detallado de cada equipo 
* Detallado de los jugadores 
* Filtrado de búsqueda de un equipo 
* Funcionalidades básicas de navegación (toScroll Button, progress scrollbar, routing).


---

## **Tecnologías utilizadas** 

Para realizar este proyecto hemos utilizado:

1. [Angular CLI 14.2.6](https://angular.io/)
2. [Angular Material](https://material.angular.io/)
3. [Bootstrap 5.2.2](https://getbootstrap.com/)
4. [Postman](https://www.postman.com/)
5. [Toggl](https://toggl.com/)
6. [FlexLayout 14.0.0](https://github.com/angular/flex-layout)



### Código: 

Typescript:
```typescript
  getCoach(year: number) {
    this.coachService.getTeamCoach(year).subscribe(response =>{
      this.coachesList = response.league.standard;

      this.coachesList.forEach(coach => {
        if(coach.teamId == this.idTeamLink && !coach.isAssistant){
          this.coachSelected = coach;
        }
      });
    });
  }

```

HTML5:

```html
  <nav aria-label="breadcrumb">
    <ol class="breadcrumb fs-4">
      <li class="breadcrumb-item fw-bold text-uppercase"><a routerLink="/landing" class="text-decoration-none">H o m e</a></li>
      <li class="breadcrumb-item" aria-current="page"><a routerLink="/teams" class="text-decoration-none">T e a m s</a></li>
      <li class="breadcrumb-item active text-danger active" aria-current="page">D e t a i l s</li>
    </ol>
  </nav>
```

CSS3:

```css
.example-card:hover {
  transform: scale(1.035, 1.035);
  box-shadow: 0 0px 40px rgba(228, 227, 227, 0.788);
  background-image: linear-gradient(to right, #022f74, #3c19bb, #640093, #bf007f, #eb122f);
  transition: all 0.5s ease-in;
  color: whitesmoke
}  
```
Javascript:

```javascript
  onActivate(event: Event) {
    window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
     });
  }
```

---
## **Arranque**

Realiza un *git clone* de la siguiente dirección: 
*https://github.com/RogeMB/NBAProjectAPICooperativo.git*

```console
git clone https://github.com/RogeMB/NBAProjectAPICooperativo.git
```

Dirígete hasta la carpeta:

> cd ./nbaProjectAPI/

Instala el paquete de node:  

    npm install
    ---> 100% 

Instala Angular CLI:
    
    npm install -g @angular/cli


Ejecuta el comando:

    ng serve -o


Este comando abrirá el **index** en tu navegador predeterminado.
___
## **Autores**

Este proyecto ha sido realizado por: 

* [Rogelio Mohigefer Barrera - GITHUB](https://github.com/RogeMB)
* [David García María - GITHUB](https://github.com/davidgm26)

Ambos estudiantes de 2º Desarrollo de Aplicaciones Multiplataforma, grado 
superior de formación profesional en España.

### **Thump up :+1: if you like it, and start it! :star: :smiley:**

___
## **TODO**

Tareas realizadas y cosas por hacer.

[x] Player List Endpoint 
[x] Team List Endpoint
[x] Players Details Endpoint
[x] Teams Details Endpoint
[x] Landing page Endpoint
[x] Routing
[x] Page not found Endpoint
[ ] Fixing minor errors
___

## **Ejemplos**

![visual studio code logo](direction/visual.png "Capturas de pantalla")


 

