# port 5000 is used by MacOS ControlCenter
# It seems to create CORS error when python project is started in its default port 5000
# check it with command $ lsof -i :5000 and $ ps -p <PID> -f

# use port 5001 instead
export FLASK_APP=src/app.py
export FLASK_ENV=development
export FLASK_RUN_PORT=5001
flask run