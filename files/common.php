<?php
// Imagens originais dos criativos, guardadas na hospedagem da Hostinger.
// Os arquivos ficam numa pasta FORA do public_html (marketing-uploads, ao lado dele),
// então não dá para abrir nem listar pelo navegador: só saem pelo download.php.

const MAX_BYTES = 40 * 1024 * 1024; // 40 MB por imagem
const ALLOWED_TYPES = [
    'image/png' => 'png',
    'image/jpeg' => 'jpg',
    'image/webp' => 'webp',
    'image/gif' => 'gif',
];
// Endereços do painel que podem enviar e apagar imagens.
const ALLOWED_ORIGINS = [
    'https://marketing.saamauditoria.com.br',
    'https://marketing-manager-ashen.vercel.app',
    'http://127.0.0.1:5510',
];
// Formato do id de um arquivo: AAAA/MM/<24 caracteres>.<extensão>
const FILE_ID_PATTERN = '#^\d{4}/\d{2}/[a-f0-9]{24}\.(png|jpg|webp|gif)$#';

function storage_dir(): string
{
    // O subdomínio fica em public_html/marketing, dentro do site principal: sobe até o
    // public_html e guarda ao lado dele, fora de qualquer endereço público.
    $probe = __DIR__;
    while (basename($probe) !== 'public_html' && dirname($probe) !== $probe) {
        $probe = dirname($probe);
    }
    $root = basename($probe) === 'public_html' ? dirname($probe) : dirname(__DIR__, 2);
    $dir = $root . '/marketing-uploads';
    if (!is_dir($dir)) {
        mkdir($dir, 0750, true);
    }
    // Se a hospedagem deixar essa pasta dentro de uma área pública, o acesso direto fica bloqueado.
    if (!file_exists($dir . '/.htaccess')) {
        file_put_contents($dir . '/.htaccess', "Require all denied\nDeny from all\n");
    }
    return $dir;
}

function request_origin(): string
{
    return $_SERVER['HTTP_ORIGIN'] ?? '';
}

function send_cors_headers(): void
{
    $origin = request_origin();
    if (in_array($origin, ALLOWED_ORIGINS, true)) {
        header('Access-Control-Allow-Origin: ' . $origin);
        header('Vary: Origin');
        header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
        header('Access-Control-Allow-Headers: Content-Type');
    }
    if (($_SERVER['REQUEST_METHOD'] ?? '') === 'OPTIONS') {
        http_response_code(204);
        exit;
    }
}

// Envio e exclusão só a partir do próprio painel.
function require_allowed_origin(): void
{
    if (!in_array(request_origin(), ALLOWED_ORIGINS, true)) {
        json_response(403, ['error' => 'Origem não permitida']);
    }
}

function json_response(int $status, array $data): void
{
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    header('Cache-Control: no-store');
    echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

// Caminho do arquivo a partir do id, recusando qualquer coisa fora do formato esperado.
function file_path_from_id(string $id): ?string
{
    if (!preg_match(FILE_ID_PATTERN, $id)) {
        return null;
    }
    $path = storage_dir() . '/' . $id;
    return is_file($path) ? $path : null;
}

function clean_file_name(string $name): string
{
    $name = basename(str_replace('\\', '/', $name));
    $name = preg_replace('/[\x00-\x1F"\\\\\/:*?<>|]+/u', '-', $name);
    $name = trim($name, " .-");
    return $name !== '' ? mb_substr($name, 0, 120) : 'imagem';
}
