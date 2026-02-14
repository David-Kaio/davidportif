# Conectar este projeto ZIP ao repositório já existente no GitHub (Objetivo 1)

Este ZIP **não contém** a pasta `.git` (isso é normal em arquivos ZIP).  
Para voltar a ter Git funcionando e apontando para o **mesmo repositório** do GitHub, o caminho mais seguro é:

## ✅ Passo a passo (recomendado)

### 1) Clone o repositório original do GitHub
No GitHub, abra o repo correto e copie o **Clone URL** (HTTPS ou SSH).

No PowerShell:

```powershell
cd D:\
git clone <COLE_AQUI_A_URL_DO_REPO> davidportif-repo
cd davidportif-repo
```

> Isso cria a pasta `.git` certinha, com o histórico e o remoto correto.

### 2) Copie os arquivos deste ZIP *por cima* do clone
- Extraia este ZIP em alguma pasta, por exemplo: `D:\davidportif-zip`
- Depois rode (PowerShell):

```powershell
robocopy "D:\davidportif-zip" "D:\davidportif-repo" /E /XD ".git" "node_modules"
```

### 3) Commit + Push
Dentro do `davidportif-repo`:

```powershell
git status
git add .
git commit -m "Atualização do site (sync do ZIP)"
git push
```

## 🔎 Se o push reclamar de autenticação
No VS Code:
- Clique no ícone de conta (👤) → Sign Out → Sign In with GitHub
ou use:
`Ctrl+Shift+P` → `GitHub: Sign In`

## ℹ️ Observação importante
Eu removi `node_modules` do ZIP para ficar leve (você recria com `npm i` / `bun i`).

Boa prática:
```powershell
npm install
npm run dev
```
