<div align="center">

# 📊 PapoDados
### Seu Analista de Dados Pessoal movido a IA Generativa

![OCI Native](https://img.shields.io/badge/OCI-Native-c74634?style=for-the-badge&logo=oracle)
![Python](https://img.shields.io/badge/Python-3.10+-3776AB?style=for-the-badge&logo=python&logoColor=white)
![Django](https://img.shields.io/badge/Django-5.0-092E20?style=for-the-badge&logo=django&logoColor=white)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Terraform](https://img.shields.io/badge/Terraform-IaC-7B42BC?style=for-the-badge&logo=terraform&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

[**Demo Online (Em Breve)**](https://papo.cdkteck.com.br) | [**Portfólio CDKTeck**](https://www.cdkteck.com.br) | [**LinkedIn**](https://linkedin.com/in/ciddy-queiroz/)

<br />
</div>

---

## 🚀 Visão Geral

**PapoDados** é uma plataforma SaaS B2B que democratiza o acesso à Business Intelligence (BI).

Esqueça SQL complexo ou curvas de aprendizado íngremes de ferramentas de BI. Com o PapoDados, o usuário faz upload de planilhas (CSV/Excel) e **conversa com seus dados** em linguagem natural.

O sistema utiliza **Arquitetura RAG (Retrieval-Augmented Generation)** hospedada na **Oracle Cloud Infrastructure (OCI)** para traduzir perguntas de negócio em consultas SQL seguras, gerando insights, gráficos e relatórios proativos em segundos.

---

## 🧠 Arquitetura & Tecnologias

Este projeto demonstra uma arquitetura **Cloud-Native** e **Scalable**, utilizando o estado da arte da OCI.

| Camada | Tecnologias | Descrição |
| :--- | :--- | :--- |
| **Frontend** | React.js, Tailwind CSS | Interface reativa, dashboards dinâmicos e chat interativo. |
| **Backend** | Python, Django Rest Framework | API Gateway, gestão de autenticação (JWT) e orquestração de IA. |
| **Data Science** | Pandas, NumPy, Scikit-learn | Processamento de dados tabulares e limpeza automatizada. |
| **Database** | **OCI Autonomous DB (ADW)** | Armazenamento de dados estruturados e **Vector Search** para RAG. |
| **AI Core** | **OCI Generative AI Service** | LLMs (Llama 3 / Cohere) para tradução NL-to-SQL e geração de insights. |
| **Infra** | **Terraform**, Docker, OCI Compute (ARM) | Infraestrutura como Código (IaC) e deploy containerizado. |

---

## ✨ Funcionalidades Chave

- 📤 **Upload Inteligente:** Ingestão automática de CSV/XLSX com detecção de tipagem via Pandas.
- 💬 **Chat com Dados (RAG):** O usuário pergunta *"Qual foi o produto mais vendido em SP?"* e recebe a resposta exata + gráfico.
- 💡 **Insights Proativos:** O sistema analisa os dados em background e sugere perguntas ("Cards de Inteligência") antes mesmo do usuário digitar.
- 🔒 **Segurança Multi-Tenant:** Isolamento lógico de dados por cliente dentro do Oracle Autonomous Database.
- 📊 **Visualização Dinâmica:** O Frontend decide automaticamente se exibe a resposta como Texto, Tabela ou Gráfico (Barras/Linhas/Pizza).
- 🧠 **RAG Inteligente:** Sistema de busca semântica com embeddings.
- 🚀 **Groq AI:** Respostas ultra-rápidas com Llama 3.
- 🌐 **Google AI:** Fallback automático com Gemini 1.5.
- 🔐 **Segurança:** Autenticação Firebase + dados protegidos.
- 🐳 **Containerizado:** Ambiente de desenvolvimento e produção 100% em Docker.
- 🤖 **Versionamento Automático:** Releases e changelogs automáticos com semantic-release.

---

## 🛠️ Como Executar Localmente

### Pré-requisitos
* Python 3.10+
* Node.js 18+
* Conta na Oracle Cloud (para API Keys)

### 1. Clone o repositório

git clone [https://github.com/CidQueiroz/PapoDados.git](https://github.com/CidQueiroz/PapoDados.git)

cd PapoDados

### 2. Configuração do Backend
cd backend
python -m venv venv
source venv/bin/activate  # Linux/Mac
.\venv\Scripts\activate # Windows

pip install -r requirements.txt

# Configure as variáveis de ambiente (.env)
OCI_CONFIG_PROFILE=DEFAULT
DATABASE_URL=...

python manage.py migrate
python manage.py runserver

## 3. Configuração do Frontend

cd frontend
npm install
npm run dev

## 🛣️ Roadmap

- [ ] Fase 1 (MVP): Upload de CSV + Chat SQL Simples + Deploy OCI.
- [ ] Fase 2 (Intelligence): Integração com OCI Vector Search para busca semântica em colunas de texto.
- [ ] Fase 3 (Scale): Suporte a arquivos múltiplos e cruzamento de dados (Join Inteligente).
- [ ] Fase 4 (SaaS): Integração com Stripe e planos de assinatura.#

👨‍💻 Autor

<img src="https://github.com/CidQueiroz.png" width="100px;" alt="Foto de Cidirclay"/>
Cidirclay Queiroz Solutions Architect AI | MLOps Engineer | OCI Specialist

Especialista em transformar problemas de negócio complexos em soluções escaláveis na nuvem. Focado em Arquitetura Multi-Cloud e Engenharia de IA Generativa.

---

<div align="center"> <sub>Built with ☕ and Oracle Cloud Infrastructure</sub> </div>