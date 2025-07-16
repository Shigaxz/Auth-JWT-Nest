# API Auth JWT con NestJS

API REST construida utilizando NestJS, que sirve para registrar usuarios, verificación del correo, y la autenticación.
---
## Features

* **Registro de Usuarios:** Creación de usuarios y utilizacion de bcrypt para hashear contraseñas.
* **Verificación por Correo:** Usando Nodemailer se enviara el token para activar la cuenta.
* **Autenticación JWT:** Inicio de sesión que genera un JWT para autenticar solicitudes.
* **Rutas Protegidas:** Uso de Guards de Passport.js para proteger endpoints que requieren autenticación.
* **Base de Datos:** MySQL usando TypeORM.
---

## Documentación de la API

| Endpoint             | Método | Descripción                                              | Body                                                        | Requiere Token |
| -------------------- | ------ | -------------------------------------------------------- | ----------------------------------------------------------- | -------------- |
| `/users`             | `POST` | Registra un nuevo usuario.                               | `{"email": "...", "password": "..."}`                       | No             |
| `/users/verify`      | `POST` | Verifica y activa una cuenta con el código del correo.   | `{"email": "...", "token": "..."}`                          | No             |
| `/auth/login`        | `POST` | Inicia sesión y obtiene el token JWT.                    | `{"email": "...", "password": "..."}`                       | No             |
| `/auth/profile`      | `GET`  | Obtiene el perfil del usuario autenticado.               | N/A                                                         | **Sí** |

---

## Setup del proyecto

#### 1. Clonar el repositorio

```bash
git clone [https://github.com/Shigaxz/Auth-JWT-Nest](https://github.com/Shigaxz/Auth-JWT-Nest)
cd Auth-JWT-Nest
```
#### 2. Instalar dependencias
```bash
npm install
```
#### 3. Configurar variables de entorno
Crea un archivo `.env` en la raíz del proyecto, ejemplo de las variables utilizadas.

```ini
# Base de Datos
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=contraseña_bd
DB_DATABASE=nest_db

# JWT
JWT_SECRET=CLAVE_JWT

# Email (usando gmail)
EMAIL_USER=tu_correo@gmail.com
EMAIL_APP_PASSWORD=tu_contrasena
```
#### 4. Configurar la base de datos
Utilizando MySQL, crea una base de datos con el nombre utilizado en el archivo `.env`.
```sql
CREATE DATABASE nest_db;
```
#### 5. Ejecutar el proyecto
El proyecto usa `synchronize: true` de TypeORM para desarrollo, la tabla de Users se creara al iniciar el proyecto.
```bash
npm run start:dev
```
La API estará disponible en `http://localhost:3000`.
---