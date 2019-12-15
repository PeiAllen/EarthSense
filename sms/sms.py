from twilio.rest import Client
from flask import Flask
app = Flask(__name__)

@app.route("/text/<message>")
def send_msg(message):
    # Your Account SID from twilio.com/console
	account_sid = "ACd98e76b09b01beda996abb6b8cf90c4c"
	# Your Auth Token from twilio.com/console
	auth_token  = "9ab4e5938a44e1bcca1943a6e8fbc718"

	client = Client("ACd98e76b09b01beda996abb6b8cf90c4c", "9ab4e5938a44e1bcca1943a6e8fbc718")
	
	newmessage = client.messages.create(
	    to="+16475155925", 
    	from_="+15163230533",
	    body=message)

	print(newmessage.sid)
	return(message)


if __name__ == "__main__":
	app.run(debug=True, host= '0.0.0.0')