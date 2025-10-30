# 🤖 Scratch AI Builder Pro

![Version](https://img.shields.io/badge/version-2.0.0-red)
![License](https://img.shields.io/badge/license-MIT-black)
![Scratch](https://img.shields.io/badge/Scratch-3.0-orange)

> Crie projetos Scratch 3.0 completos usando Inteligência Artificial! Interface moderna inspirada no iOS com tema preto e vermelho.

## ✨ Recursos

- 🎨 **Interface Apple iOS** - Design moderno em preto e vermelho
- 🔐 **Cookies Persistentes** - Salva API key e configurações
- 🔄 **Comunicação Bidirecional** - Dashboard e Bookmarklet sincronizados
- 📦 **Geração Real de Blocos** - Cria código Scratch 3.0 funcional
- 🎯 **Estrutura JSON Correta** - Compatível com format oficial do Scratch
- 🚀 **GitHub Pages Ready** - Hospede gratuitamente

## 📋 Instalação

### 1️⃣ Configurar GitHub Pages

1. **Fork ou Clone este repositório**
```bash
git clone https://github.com/SEU-USER/scrath-ia.git
cd scrath-ia
```

2. **Adicione os arquivos:**
   - `index.html` - Dashboard principal
   - `bypass.js` - Script do bookmarklet
   - `README.md` - Este arquivo

3. **Ative GitHub Pages:**
   - Vá em Settings → Pages
   - Source: Deploy from branch (main)
   - Salve e aguarde o deploy
   - Seu site estará em: `https://SEU-USER.github.io/scrath-ia/`

4. **Atualize a URL no bypass.js:**
```javascript
const CONFIG = {
    dashboardUrl: 'https://SEU-USER.github.io/scrath-ia/',
    version: '2.0.0'
};
```

### 2️⃣ Instalar Bookmarklet

**Opção A: Arraste o link**
1. Abra `https://SEU-USER.github.io/scrath-ia/`
2. Arraste o botão "🔖 Scratch AI Builder" para sua barra de favoritos

**Opção B: Crie manualmente**
1. Crie um novo favorito
2. Cole este código na URL:
```javascript
javascript:(function(){document.body.appendChild(document.createElement('script')).src='https://SEU-USER.github.io/scrath-ia/bypass.js';})();
```
3. Dê um nome como "Scratch AI"

### 3️⃣ Obter API Key (Groq - Gratuito!)

1. **Acesse:** https://console.groq.com
2. **Crie conta gratuita**
3. **Gere API key** em "API Keys"
4. **Copie a key** (começa com `gsk_...`)

**Alternativas:**
- OpenAI: https://platform.openai.com
- Anthropic: https://console.anthropic.com

## 🎮 Como Usar

### Passo a Passo

1. **Configure sua API Key:**
   - Abra o dashboard: `https://SEU-USER.github.io/scrath-ia/`
   - Cole sua API key no campo "🔑 API Key"
   - Clique em "💾 Salvar Configurações"
   - ✅ A key fica salva em cookies!

2. **Abra o Scratch:**
   - Acesse https://scratch.mit.edu/projects/editor/
   - Clique no bookmarklet que você salvou
   - 🎉 O painel aparecerá no canto direito!

3. **Gere Código:**
   - Descreva seu projeto na caixa de texto
   - Clique em "✨ Gerar com IA"
   - Aguarde a IA processar (5-15 segundos)
   - Clique em "📦 Aplicar ao Scratch"

4. **Importe no Scratch:**
   - O arquivo JSON será baixado
   - No Scratch: Arquivo → Carregar do computador
   - Selecione o arquivo baixado
   - 🚀 Pronto! Seu projeto está carregado!

## 💡 Exemplos de Prompts

### 🎮 Jogos
```
Criar um jogo onde o gato pula quando pressiono espaço e evita obstáculos que vêm da direita. Adicionar pontuação que aumenta com o tempo.
```

### 🎨 Interativo
```
Fazer o sprite seguir o mouse. Quando clicado, mudar para uma cor aleatória e dizer "Olá!".
```

### 🏃 Movimento
```
Personagem que anda com as setas do teclado. Seta para cima pula. Se tocar nas bordas, volta ao centro.
```

### 💰 Sistema
```
Sistema de pontuação com moedas. Quando o sprite toca numa moeda, ela desaparece e os pontos aumentam. Mostrar "Game Over" em 30 segundos.
```

## 🔧 Estrutura dos Arquivos

```
scrath-ia/
│
├── index.html          # Dashboard principal (salva cookies)
├── bypass.js           # Bookmarklet script (comunicação)
├── README.md           # Instruções
└── .gitignore          # Ignora arquivos desnecessários
```

## 🎨 Personalização

### Mudar Cores

**No index.html**, altere as variáveis CSS:

```css
/* Gradiente principal */
background: linear-gradient(135deg, #000000 0%, #1a0000 50%, #000000 100%);

/* Cor de destaque */
color: #ff0000;

/* Botões */
background: linear-gradient(135deg, #ff0000, #cc0000);
```

### Mudar Modelo de IA

**No dashboard**, configure:
- **Groq (rápido e gratuito):** `llama-3.1-70b-versatile`
- **OpenAI:** `gpt-4` ou `gpt-3.5-turbo`
- **Anthropic:** `claude-3-opus-20240229`

## 📊 Estrutura JSON do Scratch 3.0

A IA gera código no formato oficial do Scratch:

```json
{
  "targets": [
    {
      "isStage": true,
      "name": "Stage",
      "blocks": {},
      "variables": {},
      ...
    },
    {
      "isStage": false,
      "name": "Sprite1",
      "blocks": {
        "block_id": {
          "opcode": "event_whenflagclicked",
          "next": "next_block_id",
          "inputs": {},
          "fields": {},
          ...
        }
      },
      ...
    }
  ],
  "meta": {"semver": "3.0.0"}
}
```

## 🔍 Opcodes Suportados

### Events (Eventos)
- `event_whenflagclicked` - Quando 🏴 clicado
- `event_whenkeypressed` - Quando tecla pressionada
- `event_whenthisspriteclicked` - Quando sprite clicado
- `event_broadcast` - Enviar mensagem
- `event_whenbroadcastreceived` - Quando receber

### Motion (Movimento)
- `motion_movesteps` - Mover X passos
- `motion_turnright` - Virar direita
- `motion_turnleft` - Virar esquerda
- `motion_gotoxy` - Ir para x: y:
- `motion_ifonedgebounce` - Se tocar na borda, voltar

### Looks (Aparência)
- `looks_say` - Dizer
- `looks_sayforsecs` - Dizer por X segundos
- `looks_show` - Mostrar
- `looks_hide` - Esconder
- `looks_switchcostumeto` - Mudar fantasia

### Control (Controle)
- `control_wait` - Espere X segundos
- `control_repeat` - Repita X vezes
- `control_forever` - Sempre
- `control_if` - Se <> então
- `control_if_else` - Se <> então senão

### Sensing (Sensores)
- `sensing_touchingobject` - Tocando em?
- `sensing_keypressed` - Tecla pressionada?
- `sensing_mousedown` - Mouse pressionado?
- `sensing_askandwait` - Pergunte e espere
- `sensing_answer` - Resposta

### Operators (Operadores)
- `operator_add` - X + Y
- `operator_subtract` - X - Y
- `operator_multiply` - X * Y
- `operator_divide` - X / Y
- `operator_random` - Número aleatório
- `operator_gt` - X > Y
- `operator_equals` - X = Y
- `operator_and` - <> e <>
- `operator_or` - <> ou <>

### Variables (Variáveis)
- `data_setvariableto` - Defina variável para
- `data_changevariableby` - Adicione à variável

## ⚠️ Solução de Problemas

### ❌ "Configure sua API key"
- Abra o dashboard
- Salve a API key novamente
- Recarregue o Scratch

### ❌ "Erro 401: Unauthorized"
- Sua API key está inválida
- Gere uma nova no Groq/OpenAI
- Salve novamente

### ❌ "Erro 429: Rate Limit"
- Você excedeu o limite gratuito
- Aguarde alguns minutos
- Ou faça upgrade do plano

### ❌ "JSON inválido"
- A IA retornou formato incorreto
- Tente reformular o prompt
- Seja mais específico na descrição

### ❌ Bookmarklet não carrega
- Verifique se o bypass.js está acessível
- Teste: `https://SEU-USER.github.io/scrath-ia/bypass.js`
- Limpe o cache do navegador

## 🚀 Recursos Avançados

### Comunicação Dashboard ↔ Bookmarklet

O sistema usa `postMessage` para sincronizar:

```javascript
// Dashboard envia configurações
window.postMessage({
  type: 'SCRATCH_AI_CONFIG',
  config: { apiKey, apiUrl, model }
}, '*');

// Bookmarklet recebe
window.addEventListener('message', (e) => {
  if (e.data.type === 'SCRATCH_AI_CONFIG') {
    // Usar configurações
  }
});
```

### Estatísticas

O dashboard rastreia:
- Total de códigos gerados
- Total de blocos criados
- Tempo médio de geração

Salvo em cookies: `generated_count`, `total_blocks`

## 📝 Changelog

### v2.0.0 (Atual)
- ✨ Interface Apple iOS (preto e vermelho)
- 🔐 Sistema de cookies persistentes
- 🔄 Comunicação bidirecional
- 📦 Geração de blocos Scratch 3.0 real
- 📊 Estatísticas e métricas
- 🎨 Design responsivo

### v1.0.0
- Versão inicial básica

## 🤝 Contribuindo

Contribuições são bem-vindas!

1. Fork o projeto
2. Crie sua feature branch (`git checkout -b feature/NovaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/NovaFeature`)
5. Abra um Pull Request

## 📄 Licença

MIT License - use livremente!

## 🙏 Créditos

- **Scratch** - MIT Media Lab
- **Groq** - API de IA gratuita
- **Apple** - Inspiração de design

## 📞 Suporte

- 🐛 Issues: [GitHub Issues](https://github.com/SEU-USER/scrath-ia/issues)
- 💬 Discussões: [GitHub Discussions](https://github.com/SEU-USER/scrath-ia/discussions)
- 📧 Email: seu-email@exemplo.com

---

<div align="center">

**Feito com ❤️ para a comunidade Scratch**

[⭐ Star no GitHub](https://github.com/SEU-USER/scrath-ia) • [🐛 Reportar Bug](https://github.com/SEU-USER/scrath-ia/issues) • [✨ Solicitar Feature](https://github.com/SEU-USER/scrath-ia/issues)

</div>README.md
