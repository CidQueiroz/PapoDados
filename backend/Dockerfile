FROM oraclelinux:9-slim

# Install dependencies
RUN microdnf install -y python3 python3-pip wget unzip libaio libnsl iputils telnet && ls -l /usr/lib64/libnsl*

# Set up the Oracle Instant Client
WORKDIR /opt
RUN wget https://download.oracle.com/otn_software/linux/instantclient/1929000/instantclient-basic-linux.x64-19.29.0.0.0dbru.zip && \
    unzip instantclient-basic-linux.x64-19.29.0.0.0dbru.zip && \
    rm instantclient-basic-linux.x64-19.29.0.0.0dbru.zip

# Set up environment variables for the Oracle Instant Client
ENV LD_LIBRARY_PATH=/opt/instantclient_19_29:/usr/lib64
ENV TNS_ADMIN=/opt/oracle/wallet

# Create and copy the wallet files
RUN mkdir -p /opt/oracle/wallet
COPY wallet /opt/oracle/wallet

# Set up the application
WORKDIR /app
COPY requirements.txt .
RUN pip3 install --no-cache-dir -r requirements.txt
COPY . .

# Expose the port and run the application
EXPOSE 8000
CMD gunicorn --bind 0.0.0.0:8000 papo_dados_project.wsgi:application
