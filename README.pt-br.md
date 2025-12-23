<div align="center">

# 📊 PapoDados - Seu Analista de Dados Pessoal com IA Generativa
### Pare de aprender ferramentas de BI. Comece a conversar com seus dados.

![OCI Native](https://img.shields.io/badge/OCI-Native-c74634?style=for-the-badge&logo=oracle)
![Python](https://img.shields.io/badge/Python-3.11+-3776AB?style=for-the-badge&logo=python&logoColor=white)
![Django](https://img.shields.io/badge/Django-5.0-092E20?style=for-the-badge&logo=django&logoColor=white)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![IaC](https://img.shields.io/badge/IaC-Terraform-7B42BC?style=for-the-badge&logo=terraform&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

</div>

---

## 🚀 Valor de Negócio & Visão

O **PapoDados** é uma plataforma SaaS B2B arquitetada para democratizar a Business Intelligence. Ele capacita Pequenas e Médias Empresas (PMEs) a extrair insights de seus próprios dados sem exigir conhecimento especializado em SQL, ferramentas complexas de BI ou ciência de dados.

**A Promessa:** Os usuários fazem upload de suas planilhas (CSV/XLSX) e iniciam uma conversa em linguagem natural para fazer perguntas, gerar gráficos e obter relatórios proativos. O sistema constrói a ponte entre dados brutos e inteligência de negócio acionável.

---

## 🏛️ Fluxo Arquitetural: Do Upload ao Insight

O sistema é construído sobre uma arquitetura sofisticada e orientada a eventos que utiliza a Oracle Cloud Infrastructure (OCI) para entregar uma experiência "NL-to-SQL" (Linguagem Natural para SQL) segura e transparente.

```mermaid
graph TD
    subgraph "Interação do Usuário (Frontend React)"
        A[1. Usuário faz upload de 'vendas.xlsx'] --> B{2. Usuário pergunta:<br/>"Quais foram os 3 produtos<br/>mais vendidos no último mês?"}
    end

    subgraph "Serviços de Backend (Django na VM da OCI)"
        C(API: /upload) --> D{Processamento de Dados<br/>(Pandas)}
        D --> E[Salva Arquivo Bruto<br/>OCI Object Storage]
        D --> F[Ingere Dados Tabulares<br/>OCI Autonomous DB]

        G(API: /ask) --> H{RAG - NL para SQL<br/>OCI GenAI}
        H -- Consulta SQL --> I[Executa Consulta<br/>Autonomous DB]
        I -- Resultado Bruto --> J{Geração de Resposta<br/>OCI GenAI}
        J --> K[Resposta Dinâmica<br/>(gráfico, tabela ou texto)]
    end

    B -- Chamada de API --> G
    A -- Chamada de API --> C
    K -- Resposta JSON --> B

    style F fill:#007BFF,stroke:#fff,stroke-width:2px,color:#fff
    style H fill:#34A853,stroke:#fff,stroke-width:2px,color:#fff
```

---

## ✨ Funcionalidades Centrais

-   📤 **Ingestão Inteligente:** Upload automatizado de arquivos CSV/XLSX com detecção de esquema e limpeza de dados via Pandas.
-   💬 **Converse com Seus Dados (RAG):** A funcionalidade principal. Um usuário pergunta, *"Qual foi nosso produto mais vendido em São Paulo?"* e recebe uma resposta precisa, frequentemente acompanhada de um gráfico dinâmico, sem escrever uma única linha de código.
-   💡 **Insights Proativos:** O sistema analisa os dados em segundo plano e sugere perguntas relevantes ("Cards de Inteligência") imediatamente após o upload, guiando o usuário em direção a insights valiosos.
-   🔒 **Segurança Multi-Tenant:** Isolamento lógico de dados por cliente dentro do Oracle Autonomous Database, garantindo a privacidade e segurança dos dados.
-   📊 **Visualização Dinâmica:** O frontend renderiza de forma inteligente a resposta da API como um texto, uma grade de dados ou um gráfico (Barras, Linhas, Pizza) com base no conjunto de resultados.
-   ☁️ **Nativo da Nuvem & Escalável:** Projetado desde o início para rodar na OCI, aproveitando serviços gerenciados para performance e confiabilidade.

---

## ⚙️ Stack de Tecnologias

| Camada | Tecnologia | Propósito |
| :--- | :--- | :--- |
| **Frontend** | React.js, Tailwind CSS, Recharts | Uma interface reativa e responsiva com visualização de dados dinâmica. |
| **Backend** | Python, Django Rest Framework | O Gateway de API central, gerenciando autenticação JWT e orquestração de IA. |
| **Processamento de Dados** | Pandas, NumPy, SQLAlchemy | Processamento, limpeza e ingestão automatizada de dados tabulares. |
| **Banco de Dados** | **OCI Autonomous DB (ADW)** | Armazena dados estruturados e habilita **Vector Search** para capacidades avançadas de RAG. |
| **Núcleo de IA** | **OCI Generative AI Service** | Utiliza LLMs (ex: Llama 3) para tradução de Linguagem Natural para SQL e geração de insights. |
| **Infraestrutura** | **Terraform**, Docker, OCI Compute (ARM) | Infraestrutura como Código (IaC) para ambientes reproduzíveis e implantação containerizada. |

---

## 🛠️ Começando: Desenvolvimento Local

### Pré-requisitos
* Python 3.10+
* Node.js 18+
* Uma conta na Oracle Cloud para credenciais do banco de dados e chaves dos serviços de IA.

### 1. Setup do Backend
```bash
# Navegue até o diretório do backend
cd backend

# Crie e ative um ambiente virtual
python -m venv venv
source venv/bin/activate  # No Linux/macOS
# .\venv\Scripts\activate no Windows

# Instale as dependências
pip install -r requirements.txt

# Configure suas variáveis de ambiente em um arquivo .env
# (ex: DATABASE_URL, OCI_CONFIG_PROFILE, SECRET_KEY)
cp .env.example .env
# nano .env

# Execute as migrações do banco de dados e inicie o servidor
python manage.py migrate
python manage.py runserver
```

### 2. Setup do Frontend
```bash
# Em um novo terminal, navegue até o diretório do frontend
cd frontend

# Instale as dependências
npm install

# Configure suas variáveis de ambiente
# (ex: VITE_API_BASE_URL)
cp .env.example .env
# nano .env

# Inicie o servidor de desenvolvimento
npm run dev
```

---

## 📜 Contrato de API (Alto Nível)

<details>
<summary>Clique para expandir os endpoints principais da API</summary>
<br/>

| Método | Endpoint | Descrição |
| :--- | :--- | :--- |
| `POST` | `/api/token/` | Autentica um usuário e retorna um JWT. |
| `POST` | `/api/datasets/upload/` | Gerencia o upload de novos datasets via multipart. |
| `GET` | `/api/datasets/` | Lista os datasets do usuário autenticado. |
| `GET` | `/api/datasets/{id}/preview/`| Retorna um preview em JSON (ex: 5 primeiras linhas) de um dataset. |
| `POST` | `/api/chat/ask/` | O endpoint principal do RAG. Envia uma pergunta e recebe um insight estruturado. |

**Exemplo de resposta do `/api/chat/ask/`:**
```json
{
  "text_answer": "A receita total foi de R$ 50.000.",
  "sql_query": "SELECT SUM(valor) FROM ...",
  "data_points": [{"label": "Total", "value": 50000}],
  "visualization_type": "metric"
}
```

</details>
