<?php
// Apaga um original que o post deixou de usar (imagem trocada, slide removido, post excluído).

require __DIR__ . '/common.php';

send_cors_headers();
if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    json_response(405, ['error' => 'Use POST']);
}
require_allowed_origin();

$path = file_path_from_id($_POST['f'] ?? '');
if ($path === null) {
    json_response(404, ['error' => 'Imagem não encontrada']);
}
@unlink($path);
@unlink($path . '.json');
json_response(200, ['deleted' => true]);
