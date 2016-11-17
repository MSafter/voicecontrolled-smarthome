from pocketsphinx import *
import pyaudio
from time import sleep
import requests
import json
from configobj import ConfigObj

#pyaudio needed to open a audio stream needed for 
pyAudio = pyaudio.PyAudio()
headers = {'Content-Type':'application/json'}
config = None

class CommandListener:
	def __init__(self):
		#config
		hmm = config['pocketsphinx']['hmm']
		lm = config['pocketsphinx']['lm']
		dict = config['pocketsphinx']['dict']
		log = config['pocketsphinx']['log']
		
		self.bitsize = int(config['bitsize'])		
		
		#set decoder configuration
		self.config = Decoder.default_config()
		self.config.set_string('-hmm',hmm)
		self.config.set_string('-lm',lm)
		self.config.set_string('-dict',dict)
		self.config.set_string('-logfn', log)
		self.config.set_boolean("-allphone_ci", True)
				
		self.decoder = Decoder(self.config)
		

	def listen(self):
		# get stream from pyAudio
		self.stream = pyAudio.open(format=pyaudio.paInt16, channels=1, rate=16000, input=True, frames_per_buffer=self.bitsize)
									   
		utterance = False

		#start utterance
		self.decoder.start_utt()
	
		print("Listening...")
		# now we are starting to listen
		while True:
	
			try:
				soundBite = self.stream.read(self.bitsize)
			except Exception as e:
				pass
			
			if soundBite:		
				
				self.decoder.process_raw(soundBite, False, False)

				inSpeech = self.decoder.get_in_speech()
				
				if inSpeech and not utterance:
					utterance = True
				
				if not inSpeech and utterance:
					#end utterance
					self.decoder.end_utt()					
					utterance = False
					#get hypothesis of from the decoder
					hypothesis = self.decoder.hyp()
					
					if hypothesis is not None:

						bestGuess = hypothesis.hypstr
						
						#check for empty command
						if not bestGuess.strip():
							#restart utterance
							self.decoder.start_utt()
						else:
							#stop the stream
							self.stream.stop_stream()
							self.stream.close()

							#return the bestGuess of the decoder
							return bestGuess

if __name__ == "__main__":
	config = ConfigObj('pihome.conf')
	#Listener for the commands the user is speaking out
	listener = CommandListener()

	while True:
		#listen for the next command of the user
		command = listener.listen()

		print("command:" + command)	
		#let the backend know what the user said
		try:
			res = requests.post("http://localhost:8080/api/cmd/validate", data=json.dumps({'command':command}), headers=headers);
		except Exception as ex:
			print(ex)
			pass

		#sleep a sec				
		sleep(1)