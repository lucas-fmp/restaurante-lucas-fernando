param(
    [string]$command = "help"
)

function Down {
    Write-Host "🛑 Parando e removendo containers..." -ForegroundColor Yellow
    docker-compose down -v
    Write-Host "✅ Containers removidos!" -ForegroundColor Green
}

function Up {
    Write-Host "🚀 Iniciando containers..." -ForegroundColor Yellow
    docker-compose up
}

function Restart {
    Down
    Write-Host "🔨 Reconstruindo imagens..." -ForegroundColor Yellow
    docker-compose build
    Write-Host "🚀 Iniciando containers..." -ForegroundColor Yellow
    docker-compose up
}

function Help {
    Write-Host "
📦 Docker Compose Manager
Uso: .\docker-manage.ps1 <comando>

Comandos disponíveis:
  down     - Para containers e remove volumes
  up       - Sobe os containers
  restart  - Limpa, reconstrói e sobe (use isto para atualizar)
  help     - Mostra esta mensagem
    " -ForegroundColor Cyan
}

switch ($command.ToLower()) {
    "down" { Down }
    "up" { Up }
    "restart" { Restart }
    default { Help }
}
