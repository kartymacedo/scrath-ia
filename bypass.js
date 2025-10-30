// Scratch AI Builder - Bookmarklet Script
// Compatible with Scratch 3.0 editor

(function() {
    'use strict';

    // Configuration
    const CONFIG = {
        dashboardUrl: 'https://SEU-USER.github.io/scrath-ia/', // Substitua pelo seu GitHub Pages URL
        version: '2.0.0'
    };

    // Check if already loaded
    if (window.SCRATCH_AI_LOADED) {
        console.log('Scratch AI já carregado!');
        return;
    }
    window.SCRATCH_AI_LOADED = true;

    // CSS Styles (Apple iOS inspired - Black & Red theme)
    const styles = `
        #scratch-ai-panel {
            position: fixed;
            top: 20px;
            right: 20px;
            width: 380px;
            max-height: 90vh;
            background: rgba(0, 0, 0, 0.95);
            border: 2px solid #ff0000;
            border-radius: 20px;
            box-shadow: 0 20px 60px rgba(255, 0, 0, 0.3), 0 0 100px rgba(255, 0, 0, 0.1);
            z-index: 999999;
            font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif;
            backdrop-filter: blur(20px);
            overflow: hidden;
            display: flex;
            flex-direction: column;
            animation: slideIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }

        #scratch-ai-header {
            background: linear-gradient(135deg, #ff0000, #cc0000);
            padding: 18px 20px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            cursor: move;
            user-select: none;
        }

        #scratch-ai-title {
            color: white;
            font-size: 18px;
            font-weight: 700;
            display: flex;
            align-items: center;
            gap: 10px;
        }

        #scratch-ai-close {
            width: 30px;
            height: 30px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.2);
            border: none;
            color: white;
            font-size: 20px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s;
        }

        #scratch-ai-close:hover {
            background: rgba(255, 255, 255, 0.3);
            transform: rotate(90deg);
        }

        #scratch-ai-content {
            padding: 20px;
            overflow-y: auto;
            flex: 1;
        }

        #scratch-ai-content::-webkit-scrollbar {
            width: 6px;
        }

        #scratch-ai-content::-webkit-scrollbar-track {
            background: rgba(255, 255, 255, 0.05);
        }

        #scratch-ai-content::-webkit-scrollbar-thumb {
            background: #ff0000;
            border-radius: 3px;
        }

        .ai-section {
            margin-bottom: 20px;
        }

        .ai-label {
            color: #ccc;
            font-size: 13px;
            font-weight: 600;
            margin-bottom: 8px;
            display: block;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        .ai-input {
            width: 100%;
            padding: 12px 14px;
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 0, 0, 0.3);
            border-radius: 10px;
            color: white;
            font-size: 14px;
            font-family: inherit;
            transition: all 0.3s;
        }

        .ai-input:focus {
            outline: none;
            border-color: #ff0000;
            background: rgba(255, 255, 255, 0.08);
            box-shadow: 0 0 0 3px rgba(255, 0, 0, 0.1);
        }

        .ai-textarea {
            min-height: 100px;
            resize: vertical;
            line-height: 1.5;
        }

        .ai-button {
            width: 100%;
            padding: 12px 20px;
            background: linear-gradient(135deg, #ff0000, #cc0000);
            border: none;
            border-radius: 10px;
            color: white;
            font-size: 15px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
        }

        .ai-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(255, 0, 0, 0.4);
        }

        .ai-button:active {
            transform: translateY(0);
        }

        .ai-button:disabled {
            opacity: 0.5;
            cursor: not-allowed;
            transform: none;
        }

        .ai-button-secondary {
            background: rgba(255, 255, 255, 0.1);
            margin-top: 10px;
        }

        .ai-status {
            padding: 10px 14px;
            border-radius: 8px;
            margin-top: 12px;
            font-size: 13px;
            font-weight: 500;
            display: none;
            animation: fadeIn 0.3s;
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-5px); }
            to { opacity: 1; transform: translateY(0); }
        }

        .ai-status.success {
            background: rgba(0, 255, 0, 0.1);
            border: 1px solid rgba(0, 255, 0, 0.3);
            color: #00ff00;
        }

        .ai-status.error {
            background: rgba(255, 0, 0, 0.1);
            border: 1px solid rgba(255, 0, 0, 0.3);
            color: #ff6666;
        }

        .ai-status.info {
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.2);
            color: #ccc;
        }

        .ai-connection {
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 10px 14px;
            background: rgba(255, 255, 255, 0.05);
            border-radius: 8px;
            margin-bottom: 15px;
            font-size: 12px;
            color: #ccc;
        }

        .ai-dot {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: #ff0000;
            animation: pulse 2s infinite;
        }

        .ai-dot.connected {
            background: #00ff00;
        }

        @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.4; }
        }

        .ai-examples {
            display: grid;
            gap: 8px;
            margin-top: 12px;
        }

        .ai-example {
            padding: 10px 12px;
            background: rgba(255, 0, 0, 0.1);
            border: 1px solid rgba(255, 0, 0, 0.2);
            border-radius: 8px;
            color: #fff;
            font-size: 12px;
            cursor: pointer;
            transition: all 0.3s;
            text-align: left;
        }

        .ai-example:hover {
            background: rgba(255, 0, 0, 0.2);
            border-color: #ff0000;
            transform: translateX(4px);
        }

        .ai-minimize {
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 60px;
            height: 60px;
            border-radius: 50%;
            background: linear-gradient(135deg, #ff0000, #cc0000);
            border: none;
            color: white;
            font-size: 28px;
            cursor: pointer;
            box-shadow: 0 8px 24px rgba(255, 0, 0, 0.4);
            transition: all 0.3s;
            z-index: 999998;
            display: none;
        }

        .ai-minimize:hover {
            transform: scale(1.1);
            box-shadow: 0 12px 32px rgba(255, 0, 0, 0.5);
        }
    `;

    // Create UI
    function createUI() {
        // Add styles
        if (!document.getElementById('scratch-ai-styles')) {
            const styleEl = document.createElement('style');
            styleEl.id = 'scratch-ai-styles';
            styleEl.textContent = styles;
            document.head.appendChild(styleEl);
        }

        // Create panel
        const panel = document.createElement('div');
        panel.id = 'scratch-ai-panel';
        panel.innerHTML = `
            <div id="scratch-ai-header">
                <div id="scratch-ai-title">
                    <span>🤖</span>
                    <span>Scratch AI</span>
                </div>
                <button id="scratch-ai-close">×</button>
            </div>
            <div id="scratch-ai-content">
                <div class="ai-connection">
                    <span class="ai-dot" id="connectionDot"></span>
                    <span id="connectionText">Conectando ao dashboard...</span>
                </div>

                <div class="ai-section">
                    <label class="ai-label">💭 Seu Projeto</label>
                    <textarea id="ai-prompt" class="ai-input ai-textarea" placeholder="Descreva o que você quer criar no Scratch..."></textarea>
                    
                    <div class="ai-examples">
                        <div class="ai-example" onclick="window.scratchAI.setPrompt('Criar jogo onde gato pula e evita obstáculos')">🎮 Jogo de Pulo</div>
                        <div class="ai-example" onclick="window.scratchAI.setPrompt('Sprite segue mouse e muda cor quando clicado')">🎨 Seguir Mouse</div>
                        <div class="ai-example" onclick="window.scratchAI.setPrompt('Sistema de pontuação com moedas')">💰 Pontuação</div>
                    </div>
                </div>

                <button id="generate-btn" class="ai-button">
                    <span>✨</span>
                    <span>Gerar com IA</span>
                </button>

                <button id="apply-btn" class="ai-button ai-button-secondary" style="display:none;">
                    <span>📦</span>
                    <span>Aplicar ao Scratch</span>
                </button>

                <button id="config-btn" class="ai-button ai-button-secondary">
                    <span>⚙️</span>
                    <span>Abrir Dashboard</span>
                </button>

                <div id="ai-status" class="ai-status"></div>
            </div>
        `;

        document.body.appendChild(panel);

        // Create minimize button
        const minimizeBtn = document.createElement('button');
        minimizeBtn.id = 'scratch-ai-minimize';
        minimizeBtn.className = 'ai-minimize';
        minimizeBtn.textContent = '🤖';
        document.body.appendChild(minimizeBtn);

        // Event listeners
        document.getElementById('scratch-ai-close').onclick = () => {
            panel.style.display = 'none';
            minimizeBtn.style.display = 'flex';
        };

        minimizeBtn.onclick = () => {
            panel.style.display = 'flex';
            minimizeBtn.style.display = 'none';
        };

        document.getElementById('generate-btn').onclick = generateCode;
        document.getElementById('apply-btn').onclick = applyToScratch;
        document.getElementById('config-btn').onclick = () => {
            window.open(CONFIG.dashboardUrl, '_blank', 'width=800,height=900');
        };

        // Make draggable
        makeDraggable(panel, document.getElementById('scratch-ai-header'));

        // Try to connect to dashboard
        connectToDashboard();
    }

    // Make element draggable
    function makeDraggable(element, handle) {
        let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
        
        handle.onmousedown = dragMouseDown;

        function dragMouseDown(e) {
            e.preventDefault();
            pos3 = e.clientX;
            pos4 = e.clientY;
            document.onmouseup = closeDragElement;
            document.onmousemove = elementDrag;
        }

        function elementDrag(e) {
            e.preventDefault();
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            element.style.top = (element.offsetTop - pos2) + "px";
            element.style.left = (element.offsetLeft - pos1) + "px";
            element.style.right = 'auto';
        }

        function closeDragElement() {
            document.onmouseup = null;
            document.onmousemove = null;
        }
    }

    // Connect to dashboard
    function connectToDashboard() {
        window.addEventListener('message', (event) => {
            if (event.data.type === 'SCRATCH_AI_CONFIG') {
                window.scratchAI.config = event.data.config;
                document.getElementById('connectionDot').classList.add('connected');
                document.getElementById('connectionText').textContent = 'Conectado ao dashboard!';
                showStatus('Dashboard conectado! Configure sua API key lá.', 'success');
            }
        });

        // Request config from dashboard
        window.postMessage({ type: 'SCRATCH_AI_REQUEST' }, '*');
    }

    // Show status
    function showStatus(message, type = 'info') {
        const status = document.getElementById('ai-status');
        status.textContent = message;
        status.className = `ai-status ${type}`;
        status.style.display = 'block';
        setTimeout(() => status.style.display = 'none', 5000);
    }

    // Set prompt
    function setPrompt(text) {
        document.getElementById('ai-prompt').value = text;
    }

    // Generate unique ID
    function generateId() {
        return Math.random().toString(36).substr(2, 9) + Math.random().toString(36).substr(2, 9);
    }

    // Generate code with AI
    async function generateCode() {
        const config = window.scratchAI.config;
        const prompt = document.getElementById('ai-prompt').value.trim();

        if (!config || !config.apiKey) {
            showStatus('Configure sua API key no dashboard primeiro!', 'error');
            document.getElementById('config-btn').click();
            return;
        }

        if (!prompt) {
            showStatus('Descreva o que você quer criar!', 'error');
            return;
        }

        const btn = document.getElementById('generate-btn');
        btn.disabled = true;
        btn.innerHTML = '<span>⏳</span><span>Gerando...</span>';

        showStatus('IA está pensando...', 'info');

        try {
            const systemPrompt = `Você é especialista em Scratch 3.0. Gere código JSON COMPLETO e FUNCIONAL no formato exato do Scratch.

ESTRUTURA OBRIGATÓRIA (project.json):
{
  "targets": [
    {
      "isStage": true,
      "name": "Stage",
      "variables": {},
      "lists": {},
      "broadcasts": {},
      "blocks": {},
      "comments": {},
      "currentCostume": 0,
      "costumes": [{"assetId": "cd21514d0531fdffb22204e0ec5ed84a", "name": "backdrop1", "md5ext": "cd21514d0531fdffb22204e0ec5ed84a.svg", "dataFormat": "svg", "rotationCenterX": 240, "rotationCenterY": 180}],
      "sounds": [],
      "volume": 100,
      "layerOrder": 0,
      "tempo": 60,
      "videoTransparency": 50,
      "videoState": "on"
    },
    {
      "isStage": false,
      "name": "Sprite1",
      "variables": {},
      "lists": {},
      "broadcasts": {},
      "blocks": {
        "id1": {
          "opcode": "event_whenflagclicked",
          "next": "id2",
          "parent": null,
          "inputs": {},
          "fields": {},
          "shadow": false,
          "topLevel": true,
          "x": 100,
          "y": 100
        }
      },
      "comments": {},
      "currentCostume": 0,
      "costumes": [{"assetId": "b7853f557e4426412e64bb3da6531a99", "name": "costume1", "md5ext": "b7853f557e4426412e64bb3da6531a99.svg", "dataFormat": "svg", "rotationCenterX": 48, "rotationCenterY": 50}],
      "sounds": [],
      "volume": 100,
      "visible": true,
      "x": 0,
      "y": 0,
      "size": 100,
      "direction": 90,
      "draggable": false,
      "rotationStyle": "all around"
    }
  ],
  "meta": {"semver": "3.0.0"}
}

OPCODES: event_whenflagclicked, motion_movesteps, motion_turnright, control_forever, control_repeat, control_if, looks_say, looks_think, sensing_keypressed, etc.

Responda APENAS JSON válido.`;

            const response = await fetch(config.apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${config.apiKey}`
                },
                body: JSON.stringify({
                    model: config.model,
                    messages: [
                        { role: 'system', content: systemPrompt },
                        { role: 'user', content: prompt }
                    ],
                    temperature: 0.7,
                    max_tokens: 4000
                })
            });

            if (!response.ok) {
                throw new Error(`API Error ${response.status}`);
            }

            const data = await response.json();
            const content = data.choices[0].message.content;

            const jsonMatch = content.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
                window.scratchAI.lastCode = JSON.parse(jsonMatch[0]);
                document.getElementById('apply-btn').style.display = 'block';
                showStatus('✅ Código gerado! Clique em "Aplicar ao Scratch"', 'success');
            } else {
                throw new Error('JSON inválido');
            }

        } catch (error) {
            showStatus(`❌ Erro: ${error.message}`, 'error');
        } finally {
            btn.disabled = false;
            btn.innerHTML = '<span>✨</span><span>Gerar com IA</span>';
        }
    }

    // Apply to Scratch
    function applyToScratch() {
        const code = window.scratchAI.lastCode;
        if (!code) {
            showStatus('Nenhum código para aplicar!', 'error');
            return;
        }

        try {
            // Try to access Scratch VM
            if (window.vm && window.vm.runtime) {
                showStatus('Aplicando blocos ao Scratch...', 'info');
                
                // This is where we would inject into Scratch VM
                // For now, we'll download as JSON
                const blob = new Blob([JSON.stringify(code, null, 2)], { type: 'application/json' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `scratch-ai-${Date.now()}.json`;
                a.click();
                URL.revokeObjectURL(url);
                
                showStatus('📥 Baixado! Importe no Scratch: Arquivo → Carregar do computador', 'success');
            } else {
                // Fallback: copy to clipboard
                navigator.clipboard.writeText(JSON.stringify(code, null, 2));
                showStatus('📋 Código copiado! Cole em um arquivo .json e importe no Scratch', 'success');
            }
        } catch (error) {
            showStatus(`❌ Erro: ${error.message}`, 'error');
        }
    }

    // Global API
    window.scratchAI = {
        config: null,
        lastCode: null,
        setPrompt,
        generate: generateCode,
        apply: applyToScratch,
        version: CONFIG.version
    };

    // Initialize
    createUI();
    console.log(`%c🚀 Scratch AI Builder ${CONFIG.version} Loaded!`, 'font-size: 16px; color: #ff0000; font-weight: bold');
    console.log('%cUse window.scratchAI para acessar a API', 'color: #ccc');

})();
