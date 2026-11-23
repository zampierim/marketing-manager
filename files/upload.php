<?php
// Recebe a imagem original de um criativo e guarda exatamente como veio.
// Responde com o id do arquivo, que o painel salva no post (imageFile / carouselFiles).

require __DIR__ . '/common.php';

send_cors_headers();
if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    json_response(405, ['error' => 'Use POST']);
}
require_allowed_origin();

$file = $_FILES['file'] ?? null;
if (!$file || ($file['error'] ?? UPLOAD_ERR_NO_FILE) !== UPLOAD_ERR_OK) {
    json_response(400, ['error' => 'Arquivo não recebido']);
}
if ($file['size'] > MAX_BYTES) {
    json_response(413, ['error' => 'Imagem maior que 40 MB']);
}

$type = (new finfo(FILEINFO_MIME_TYPE))->file($file['tmp_name']);
if (!isset(ALLOWED_TYPES[$type]) || @getimagesize($file['tmp_name']) === false) {
    json_response(415, ['error' => 'Envie uma imagem PNG, JPG, WEBP ou GIF']);
}

$id = date('Y/m') . '/' . bin2hex(random_bytes(12)) . '.' . ALLOWED_TYPES[$type];
$target = storage_dir() . '/' . $id;
if (!is_dir(dirname($target))) {
    mkdir(dirname($target), 0750, true);
}
if (!move_uploaded_file($file['tmp_name'], $target)) {
    json_response(500, ['error' => 'Não foi possível guardar a imagem']);
}

$name = clean_file_name($_POST['name'] ?? $file['name']);
file_put_contents($target . '.json', json_encode([
    'name' => $name,
    'type' => $type,
    'size' => $file['size'],
    'postId' => preg_replace('/[^0-9a-zA-Z_-]/', '', $_POST['postId'] ?? ''),
    'createdAt' => time(),
], JSON_UNESCAPED_UNICODE));

json_response(200, ['id' => $id, 'name' => $name, 'size' => $file['size']]);
