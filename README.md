<div align="center">

# 📊 PapoDados - Your Personal Generative AI Data Analyst
### Stop learning BI tools. Start talking to your data.

![OCI Native](https://img.shields.io/badge/OCI-Native-c74634?style=for-the-badge&logo=oracle)
![Python](https://img.shields.io/badge/Python-3.11+-3776AB?style=for-the-badge&logo=python&logoColor=white)
![Django](https://img.shields.io/badge/Django-5.0-092E20?style=for-the-badge&logo=django&logoColor=white)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![IaC](https://img.shields.io/badge/IaC-Terraform-7B42BC?style=for-the-badge&logo=terraform&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

</div>

---

## 🚀 Business Value & Vision

**PapoDados** (DataChat) is a B2B SaaS platform architected to democratize Business Intelligence. It empowers Small and Medium-sized Enterprises (SMEs) to unlock insights from their own data without requiring specialized knowledge of SQL, complex BI tools, or data science.

**The Promise:** Users upload their spreadsheets (CSV/XLSX) and engage in a natural language conversation to ask questions, generate charts, and get proactive reports. The system bridges the gap between raw data and actionable business intelligence.

---

## 🏛️ Architectural Workflow: From Upload to Insight

The system is built on a sophisticated, event-driven architecture that leverages Oracle Cloud Infrastructure (OCI) to deliver a seamless and secure "NL-to-SQL" experience.

```mermaid
graph TD
    subgraph "User Interaction (React Frontend)"
        A[1. User uploads 'sales.xlsx'] --> B{2. User asks:<br/>"What were the top 3 products<br/>last month?"}
    end

    subgraph "Backend Services (Django on OCI VM)"
        C(API: /upload) --> D{Data Processing<br/>(Pandas)}
        D --> E[Save Raw File<br/>OCI Object Storage]
        D --> F[Ingest Tabular Data<br/>OCI Autonomous DB]

        G(API: /ask) --> H{RAG - NL to SQL<br/>OCI GenAI}
        H -- SQL Query --> I[Execute Query<br/>Autonomous DB]
        I -- Raw Result --> J{Response Generation<br/>OCI GenAI}
        J --> K[Dynamic Response<br/>(chart, table, or text)]
    end

    B -- API Call --> G
    A -- API Call --> C
    K -- JSON Response --> B

    style F fill:#007BFF,stroke:#fff,stroke-width:2px,color:#fff
    style H fill:#34A853,stroke:#fff,stroke-width:2px,color:#fff
```

---

## ✨ Core Features

- 📤 **Intelligent Ingestion:** Automated upload of CSV/XLSX files with schema detection and data cleansing powered by Pandas.
- 💬 **Chat with Your Data (RAG):** The core feature. A user asks, *"What was our best-selling product in São Paulo?"* and receives a precise answer, often accompanied by a dynamic chart, without writing a single line of code.
- 💡 **Proactive Insights:** The system analyzes data in the background and suggests relevant questions ("Intelligence Cards") immediately after upload, guiding the user toward valuable insights.
- 🔒 **Multi-Tenant Security:** Logical data isolation per client within the Oracle Autonomous Database, ensuring data privacy and security.
- 📊 **Dynamic Visualization:** The frontend intelligently renders the API's response as a text answer, a data grid, or a chart (Bar, Line, Pie) based on the result set.
- ☁️ **Cloud-Native & Scalable:** Designed from the ground up to run on OCI, leveraging managed services for performance and reliability.

---

## ⚙️ Technology Stack

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Frontend** | React.js, Tailwind CSS, Recharts | A reactive and responsive interface with dynamic data visualization. |
| **Backend** | Python, Django Rest Framework | The central API Gateway, managing JWT authentication and AI orchestration. |
| **Data Processing** | Pandas, NumPy, SQLAlchemy | Automated processing, cleansing, and ingestion of tabular data. |
| **Database** | **OCI Autonomous DB (ADW)** | Stores structured data and enables **Vector Search** for advanced RAG capabilities. |
| **AI Core** | **OCI Generative AI Service** | Leverages LLMs (e.g., Llama 3) for Natural Language-to-SQL translation and insight generation. |
| **Infrastructure** | **Terraform**, Docker, OCI Compute (ARM) | Infrastructure as Code (IaC) for reproducible environments and containerized deployment. |

---

## 🛠️ Getting Started: Local Development

### Prerequisites
* Python 3.10+
* Node.js 18+
* An Oracle Cloud account for database credentials and AI service keys.

### 1. Backend Setup
```bash
# Navigate to the backend directory
cd backend

# Create and activate a virtual environment
python -m venv venv
source venv/bin/activate  # On Linux/macOS
# .\venv\Scripts\activate on Windows

# Install dependencies
pip install -r requirements.txt

# Configure your environment variables in a .env file
# (e.g., DATABASE_URL, OCI_CONFIG_PROFILE, SECRET_KEY)
cp .env.example .env
# nano .env

# Run database migrations and start the server
python manage.py migrate
python manage.py runserver
```

### 2. Frontend Setup
```bash
# In a new terminal, navigate to the frontend directory
cd frontend

# Install dependencies
npm install

# Configure your environment variables
# (e.g., VITE_API_BASE_URL)
cp .env.example .env
# nano .env

# Start the development server
npm run dev
```

---

## 📜 API Contract (High-Level)

<details>
<summary>Click to expand the core API endpoints</summary>
<br/>

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/token/` | Authenticates a user and returns a JWT. |
| `POST` | `/api/datasets/upload/` | Handles multipart file upload for new datasets. |
| `GET` | `/api/datasets/` | Lists the datasets owned by the authenticated user. |
| `GET` | `/api/datasets/{id}/preview/`| Returns a JSON preview (e.g., top 5 rows) of a dataset. |
| `POST` | `/api/chat/ask/` | The core RAG endpoint. Sends a question and receives a structured insight. |

**Example `/api/chat/ask/` response:**
```json
{
  "text_answer": "The total revenue was $50,000.",
  "sql_query": "SELECT SUM(value) FROM ...",
  "data_points": [{"label": "Total", "value": 50000}],
  "visualization_type": "metric"
}
```

</details>
