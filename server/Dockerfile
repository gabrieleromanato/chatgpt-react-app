FROM python:3

WORKDIR /usr/src/app
ENV FLASK_RUN_HOST=0.0.0.0
ENV FLASK_APP=flaskr
ENV FLASK_DEBUG=1
COPY requirements.txt ./
RUN python -m venv venv
RUN . venv/bin/activate
RUN pip install --no-cache-dir -r requirements.txt
COPY . .

CMD ["flask", "run"]