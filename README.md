# voicecontrolled-smarthome
Simple voice controlled smart home stack with python and nodeJS

# Prerequirements
* **Some linux packages**
* **Python 2.7**
* **NodeJS**
* **Sphinxbase**
* **Pocketsphinx**
* **Dictionary and Languagemodel for Sphinx**

**Needed linux packages**

<pre>sudo apt-get install python-dev python-pyaudio libasound2-dev libtool autoconf python libpulse-dev swig bison</pre>

**Installation of Sphinxbase**
<pre>$ git clone https://github.com/cmusphinx/sphinxbase</pre>
<pre>$ cd sphinxbase</pre>
<pre>$ ./autogen.sh</pre>
<pre>$ ./configure</pre>
<pre>$ sudo make</pre>
<pre>$ sudo make check </pre> 
<pre>$ sudo make install</pre>

**Installation of Pocketsphinx**
<pre>$ git clone https://github.com/cmusphinx/pocketsphinx</pre>
<pre>$ cd pocketsphinx</pre>
<pre>$ ./autogen.sh</pre>
<pre>$ ./configure --enable-fixed</pre>
<pre>$ sudo make check</pre>
<pre>$ sudo make install</pre>

**Dictionary and Languagemodel for Sphinx**
Sphinx needs at least a dictionary (.dic) and a language model (.lm) file to validate your audio imput.
You can create those file <a href="http://www.speech.cs.cmu.edu/tools/lmtool-new.html">here</a>
If you have created your dictionary and language model, specify the location of those files in the <pre>pihome.conf</pre> file. Otherwise you will get the following error message after runnning the python script <pre>pihome.py</pre>:
* RuntimeError: new_Decoder returned -1

# Installation

First of all install all needed dependencies for Python and node:
* **Python dependencies**
<pre>sudo pip install -r requirements.txt</pre>
* **NodeJS dependencies**
<pre>cd backend</pre>
<pre>npm install</pre>

# Test
Now test if everything works fine by starting the pihome.py python script and the server.js nodeJS backend in seperate terminals

* **Python script**
<pre>python pihome.py</pre>
* **NodeJS backend**
<pre>node server.js</pre>
