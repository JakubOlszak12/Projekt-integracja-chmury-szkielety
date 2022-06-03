# Integration
source: https://www.nobelprize.org/about/developer-zone-2/

# Initialization

run XAMPP -> apache and mysql
IN SERVER DIRECTORY:
1. ```composer update```
2. ```cp .env.example .env```
3. ```php artisan key:generate```
   ```php artisan jwt:secret```
4. ```php artisan migrate:fresh -seed```
IN CLIENT DIRECTORY
1. ```npm install ka-table --force```
# START

1. In root directory run ```npm start```
