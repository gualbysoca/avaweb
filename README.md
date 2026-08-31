# AVANCE BJJ Website

## Servidor Local (Desarrollo)

Para probar la página web en tu entorno local (incluyendo la funcionalidad web exportada del Timer), puedes levantar un servidor estático usando Python.

### Levantar el servidor
Abre una terminal en la raíz de este proyecto (`avaweb`) y ejecuta el siguiente comando:

```bash
python3 -m http.server 8082
```
Luego, abre tu navegador y visita: [http://localhost:8082](http://localhost:8082)

*(Nota: Para ver el Timer, asegúrate de acceder a `http://localhost:8082/timer/` después de haber exportado el proyecto desde `ava-timer` hacia la carpeta `timer` de esta web).*

### Detener el servidor
Para detener el servidor, ve a la terminal donde lo estás ejecutando y presiona:
`Ctrl + C`
