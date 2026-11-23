<?php
// Entrega a imagem original com o nome com que foi enviada.
// download.php?f=<id>            baixa o arquivo
// download.php?f=<id>&inline=1   mostra no navegador

require __DIR__ . '/common.php';

send_cors_headers();
$path = file_path_from_id($_GET['f'] ?? '');
if ($path === null) {
    http_response_code(404);
    exit('Imagem não encontrada');
}

$meta = json_decode((string) @file_get_contents($path . '.json'), true) ?: [];
$name = clean_file_name($meta['name'] ?? basename($path));
$type = $meta['type'] ?? 'application/octet-stream';
$disposition = isset($_GET['inline']) ? 'inline' : 'attachment';

header('Content-Type: ' . $type);
header('Content-Length: ' . filesize($path));
header("Content-Disposition: {$disposition}; filename=\"" . addcslashes($name, '"\\') . "\"; filename*=UTF-8''" . rawurlencode($name));
header('Cache-Control: private, max-age=31536000, immutable');
header('X-Content-Type-Options: nosniff');
readfile($path);
