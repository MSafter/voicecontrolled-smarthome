from pocketsphinx import *
import pyaudio
from time import sleep
import requests
import json
from configobj import ConfigObj
import os.path
import wave

#pyaudio needed to open a audio stream needed for 
pyAudio = pyaudio.PyAudio()
headers = {'Content-Type':'application/json'}
config = None
commandAudioFile = None

class CommandListener:
	def __init__(self):
		#config
		self.hmm = config['pocketsphinx']['hmm']
		self.lm = config['pocketsphinx']['lm']
		self.dict = config['pocketsphinx']['dict']
		self.log = config['pocketsphinx']['log']
		
		self.bitsize = int(config['bitsize'])		
		
		#set decoder configuration
		self.config = Decoder.default_config()
		self.config.set_string('-hmm',self.hmm)
		self.config.set_string('-lm',self.lm)
		self.config.set_string('-dict',self.dict)
		self.config.set_string('-logfn', self.log)
		self.config.set_boolean("-allphone_ci", True)
				
		self.decoder = Decoder(self.config)
		
		
	def fromAudio(self):		
				
		config = {
			'hmm':self.hmm,
			'lm': self.lm,
			'dict':self.dict
		}

		ps = Pocketsphinx(**config)

		ps.decode(
			audio_file= commandAudioFile,
			buffer_size= 2048,
			no_search= False,
			full_utt= False,
		)
		
		return ps.hypothesis()

	def listen(self):		
		# get stream from pyAudio
		# open stream 
		self.stream = pyAudio.open(format=pyaudio.paInt16, channels=2, rate=16000, input=True, frames_per_buffer=self.bitsize)
				
		utterance = False

		#start utterance
		self.decoder.start_utt()
	
		print("Listening...")
		# now we are starting to listen
		while True:
			
			#check if an external command is used by the user 
			if os.path.isfile(commandFile):
				#stop the utterance
				self.decoder.end_utt()
				print("external command detected - Processing...")
				
				#get the command from the audio file
				commandFromAudio = self.fromAudio()	

				#check if a command is detected 
				if not commandFromAudio:
					commandFromAudio = ""
					print("No command found in file!")
				
				#audio file not needed anymore
				os.remove(commandFile)

				print("external command processed - Deleting...")
				#return the command from the audio
				return commandFromAudio
		
			try:
				soundBite = self.stream.read(self.bitsize)
			except Exception as e:
				pass
			
			if soundBite:		
				
				self.decoder.process_raw(soundBite, False, False)

				inSpeech = self.decoder.get_in_speech()
				
				if inSpeech and not utterance:
					utterance = True
				
				if utterance:
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
							sleep(0.5)
						else:
							#stop the stream
							self.stream.stop_stream()
							self.stream.close()

							#return the bestGuess of the decoder
							return bestGuess

if __name__ == "__main__":
	config = ConfigObj('pihome.conf')
	commandAudioFile = config["command"]["audiofile"]
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
