param(
  [Parameter(Mandatory=$true)][string]$RepoUrl,
  [string]$ZipFolder = (Resolve-Path ".").Path,
  [string]$TargetFolder = (Join-Path (Get-Location) "davidportif-repo")
)

Write-Host "1) Clonando repo em: $TargetFolder"
git clone $RepoUrl $TargetFolder
if ($LASTEXITCODE -ne 0) { throw "Falha no git clone. Confira a URL e sua autenticação." }

Write-Host "2) Copiando arquivos do ZIP ($ZipFolder) para o clone (sem .git / node_modules)"
robocopy $ZipFolder $TargetFolder /E /XD ".git" "node_modules" | Out-Null

Set-Location $TargetFolder
Write-Host "3) Status:"
git status

Write-Host ""
Write-Host "Pronto. Agora faça:"
Write-Host "  git add ."
Write-Host "  git commit -m `"Atualização do site (sync do ZIP)`""
Write-Host "  git push"
