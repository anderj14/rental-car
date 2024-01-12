# rental-car
https://github.com/anderj14/rental-car

## Getting Started

These instructions will help you set up and run the project on your local machine for development and testing purposes.

### Prerequisites

Make sure you have the following installed on your machine:

- Node.js and npm - Node 20
- .NET Core SDK - .NET 7
- Angular CLI - Angular 17

### Installing

Run the following commands to install dependencies and set up the project:

```bash
# Install npm packages
npm install

# Install SQLite Extension in VS Code (to see the database press CTRL + p add > and then sqlite: Opendatabase, then the sqlite tab will appear in the explorer with the database it opens) 
# Instalar la extension de SQLite en VS Code (para ver la base de datos preciona CTRL + p agrega > y luego sqlite: Opendatabase, luego en el explorador aparecera la pestaña de sqlite con la base de datos que abrio)

# Run the API (in the API folder) - Correr la API, para esto tiene que estar en la carpeta API del proyecto
dotnet watch --no-hot-reload

# Run the client (in the Client folder) - Correr el cliente de la applicacion, para esto tiene que estar dentro de la carpeta Client
ng serve

# Login as Admin (Iniciar sesion como administrador) - email: admin@test.com password: Pa$$w0rd
# Login as Member User (Iniciar sesion como usuario miembro) - email: andder@test.com password: Pa$$w0rd

### In case you have problems with the application you can do the following
### En caso de que tenga problemas con la aplicacion puede hacer lo siguiente

# Delete Database - Eliminar las base de datos
dotnet ef database drop -p Infrastructure -s API -c StoreContext 
dotnet ef database drop -p Infrastructure -s API -c AppIdentityDbContex 

# Delete Migrations - Eliminar Migracion (Tambien puede eliminar directamente la carpeta migration del proyecto, las cuales se encuentra en el folder Infrastructure)
dotnet ef migrations remove -p Infrastructure -s API -c RentalContext
dotnet ef migrations remove -p Infrastructure -s API -c AppIdentityDbContex

# Create Migrations - Crear Migracion 
dotnet ef migrations add InitialEntity -p Infrastructure -s API -c RentalContext -o Data/Migrations

# Create Migrations for Identity - Crear Migracion para usuarios
dotnet ef migrations add IdentityInitial -p Infrastructure -s API -c AppIdentityDbContex

# Run the API (in the API folder) - Correr la API, para esto tiene que estar en la carpeta API del proyecto
dotnet watch --no-hot-reload

# When you run the API, test data will be passed to the SQLite database

# Run the client (in the Client folder) - Correr el cliente de la applicacion, para esto tiene que estar dentro de la carpeta Client
ng serve

# When the project is finished, the SQLite will be transferred to PostgreSQL, for the production pass and the deployment of the app on the web.

# Si tiene algun error o algun problema, puede escribirme al correo andersonfrias001@gmail.com
