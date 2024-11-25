echo "Cambiando a rama master"
git checkout master

echo "Construyendo app..."
npm run build

echo "Desplegando archivos al servidor"
scp -r dist/* enzo@192.168.0.11:/var/www/192.168.0.11/

echo "Listo!"