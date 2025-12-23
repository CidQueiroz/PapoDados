# PROJETO: PapoDados (SaaS)
**Versão:** 1.0 (MVP "Unicórnio")
**Autor:** Cidirclay Queiroz (Arquiteto de Soluções & Engenheiro de IA)
**Stack:** OCI Native | Django (Backend) | React (Frontend) | RAG Architecture

---

## 1. VISÃO GERAL E INTENÇÃO DO PRODUTO
O **PapoDados** é um SaaS B2B focado em democratizar a Business Intelligence (BI) para o mercado brasileiro (PMEs).
**A Promessa:** "Converse com seus dados". O usuário faz upload de planilhas (CSV/XLSX) e interage via chat em linguagem natural para obter insights, gráficos e relatórios, sem precisar saber SQL, Excel avançado ou Power BI.

**Diferencial Competitivo:**
1.  **Proatividade:** O sistema não espera perguntas; ele sugere insights ("Cards de Inteligência") assim que o upload é feito.
2.  **Agnóstico:** Aceita qualquer estrutura de dados tabular.
3.  **Segurança:** Execução blindada em ambiente Oracle Cloud (OCI).

---

## 2. ARQUITETURA TÉCNICA (HARD CONSTRAINTS)

### Infraestrutura (OCI - Oracle Cloud Infrastructure)
* **Compute:** VM Standard A1.Flex (ARM) hospedando o Docker/Podman.
* **Database:** Oracle Autonomous Database (ADW) para dados estruturados e vetoriais (Oracle AI Vector Search).
* **Storage:** OCI Object Storage (Buckets privados para raw files).
* **AI/LLM:** OCI Generative AI Service (ou fallback para Groq/Gemini API dependendo da cota).
* **Orquestração:** Nginx como Reverse Proxy + Gunicorn.

### Backend (Existente - Django REST Framework)
* **Linguagem:** Python 3.10+.
* **Framework:** Django 5.x + DRF.
* **Manipulação de Dados:** Pandas, NumPy, SQLAlchemy.
* **IA Logic:** LangChain ou implementação nativa de RAG.
* **Fluxo de Dados:**
    1.  Recebe Arquivo -> Salva no Object Storage.
    2.  Pandas lê -> Detecta Tipos -> Ingestão no Autonomous DB (Schema isolado por Tenant).
    3.  Gera Embeddings dos metadados (nomes de colunas) para o Vector DB.

### Frontend (A Construir - React)
* **Framework:** React.js (Vite).
* **Estilização:** Tailwind CSS (obrigatório para velocidade e padrão visual).
* **State Management:** Context API ou Zustand.
* **Visualização de Dados:** Recharts ou Chart.js.
* **HTTP Client:** Axios (com interceptors para JWT Auth).

---

## 3. ESPECIFICAÇÕES FUNCIONAIS DETALHADAS

### A. Módulo de Autenticação & Onboarding
* **Login/Cadastro:** JWT via Django backend.
* **Tenant Isolation:** O usuário só vê seus próprios arquivos.
* **Dashboard Inicial:** Visão geral dos "Datasets" (arquivos) carregados recentemente.

### B. Módulo de Ingestão (Upload Inteligente)
* **Interface:** Drag & Drop com barra de progresso real.
* **Validação Frontend:** Checar extensão (.csv, .xlsx) e tamanho máximo (ex: 50MB) antes de enviar.
* **Processamento (Feedback):** Enquanto o backend processa (Pandas -> Oracle), o frontend deve mostrar etapas: "Lendo arquivo...", "Entendendo colunas...", "Gerando insights iniciais...".
* **Preview:** Exibir as primeiras 5 linhas da tabela (DataGrid) para confirmação do usuário.

### C. O "Cérebro" (Chat Interface & RAG)
Esta é a funcionalidade core. Não é um chat de texto simples.
* **Input:** Caixa de texto para perguntas em linguagem natural.
* **Processamento (Backend):**
    1.  LLM traduz Pergunta -> SQL (Dialeto Oracle).
    2.  Backend valida e sanitiza o SQL (Security Layer).
    3.  Executa no Autonomous DB.
    4.  LLM recebe o resultado SQL e gera uma resposta textual humanizada.
* **Output (Frontend):** O Chat deve renderizar **Componentes Dinâmicos** baseados na resposta da API:
    * *Tipo Texto:* Resposta simples.
    * *Tipo Tabela:* Se o resultado for uma lista, renderizar uma mini-tabela.
    * *Tipo Gráfico:* Se a resposta contiver séries temporais ou categorias, renderizar um gráfico (Barra/Linha/Pizza) automaticamente usando Recharts.
    * *Tipo Erro:* Mensagem amigável se a IA não entender ("Não encontrei essa informação na coluna X").

### D. Análise Proativa (Os "Cards")
* Assim que o upload termina, o sistema deve gerar 3 perguntas sugeridas automaticamente.
    * *Exemplo:* "Qual o total de Vendas?", "Qual o Produto mais vendido?", "Tendência dos últimos 6 meses?".
* Esses cards devem ser clicáveis e disparar a consulta no chat.

---

## 4. DIRETRIZES DE UX/UI (Frontend)
* **Tema:** Clean, Profissional, "SaaS Moderno". Cores sóbrias (Azul/Cinza) com destaques sutis.
* **Responsividade:** Mobile-first (o empresário quer ver o número pelo celular).
* **Feedback Visual:** Spinners de carregamento são obrigatórios em todas as requisições de IA (que podem levar 3-10 segundos).
* **Tratamento de Erro:** Nunca mostrar "Error 500". Mostrar "O PapoDados está pensando muito forte, tente simplificar a pergunta".

---

## 5. ROTAS DA API (Contrato Backend -> Frontend)
*O Frontend deve consumir estritamente estas rotas:*

* `POST /api/token/`: Login.
* `POST /api/datasets/upload/`: Envio do arquivo (Multipart).
* `GET /api/datasets/`: Lista arquivos do usuário.
* `GET /api/datasets/{id}/preview/`: Retorna JSON com head() do arquivo.
* `POST /api/chat/ask/`:
    * *Body:* `{ "dataset_id": 1, "question": "Qual o faturamento?" }`
    * *Response:*
        ```json
        {
          "text_answer": "O faturamento total foi de R$ 50.000.",
          "sql_query": "SELECT sum(valor) ...",
          "data_points": [{"label": "Total", "value": 50000}],
          "visualization_type": "metric" // ou "bar_chart", "table", "text"
        }
        ```

---

## 6. INSTRUÇÕES PARA O DESENVOLVEDOR AI
1.  **Priorize a Segurança:** Nunca exponha dados de um tenant para outro.
2.  **Performance:** O Frontend não deve processar dados pesados. Toda agregação é feita no Backend (Pandas/Oracle SQL). O Frontend apenas renderiza.
3.  **Estabilidade:** Se a API da OCI falhar, o sistema deve degradar graciosamente (ex: avisar que a IA está dormindo, mas permitir download dos dados brutos).
4.  **Código Limpo:** Componentes React pequenos e reutilizáveis. Hooks customizados para lógica de API (`useChat`, `useDataset`).

---
**Fim das Especificações do PapoDados.**