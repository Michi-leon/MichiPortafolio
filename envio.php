<?php
$host     = "localhost";
$user     = "root";
$password = "";
$db       = "portafolio";

$con = mysqli_connect($host, $user, $password, $db) or die("Problemas al Conectar");
mysqli_set_charset($con, "utf8mb4");

$nombres     = mysqli_real_escape_string($con, $_POST["nombres"] ?? "");
$direction   = mysqli_real_escape_string($con, $_POST["direction"] ?? "");
$correo      = mysqli_real_escape_string($con, $_POST["correo"] ?? "");
$comentarios = mysqli_real_escape_string($con, $_POST["comentarios"] ?? "");

$sql = "INSERT INTO datos_cliente_portafolio (nombres, direction, correo, comentarios) VALUES ('$nombres', '$direction', '$correo', '$comentarios')";
$ejecutarse = mysqli_query($con, $sql);

//Respuesta compatible con tu animación JS y con envío tradicional
if (!$ejecutarse) {
    http_response_code(500);
    echo "<script>alert('Problemas al Enviar'); window.location.href='index.html';</script>";
} else {
    echo "<script>alert('Datos enviados correctamente'); window.location.href='index.html';</script>";
}

mysqli_close($con);
?>