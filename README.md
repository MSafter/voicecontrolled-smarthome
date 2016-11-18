# voicecontrolled-smarthome
Simple voice controlled smart home stack with python and nodeJS

# Prerequirements
* **Some linux packages**
* **Python 2.7**
* **NodeJS**
* **Sphinxbase**
* **Pocketsphinx**

**Needed linux packages**

<pre>sudo apt-get install python-dev python-pyaudio libasound2-dev libtool autoconf python libpulse-dev swig</pre>

**Installation of Sphinxbase**
<pre>$ git clone https://github.com/cmusphinx/sphinxbase</pre>
<pre>$ cd sphinxbase</pre>
<pre>$ ./autogen.sh</pre>
<pre>$ ./configure --enable-fixed</pre>
<pre>$ sudo make</pre>
<pre>$ sudo make check </pre> 
<pre>$ sudo make install</pre>

**Installation of Pocketsphinx**
<pre>$ git clone https://github.com/cmusphinx/pocketsphinx</pre>
<pre>$ cd pocketsphinx</pre>
<pre>$ ./autogen.sh</pre>
<pre>$ ./configure</pre>
<pre>$ make clean all</pre>
<pre>$ sudo make check</pre>
<pre>$ sudo make install</pre>


# Installation

First of all install all needed dependencies for Python and node:
* **Python dependencies**
<pre>sudo pip install -r requirements.txt</pre>
* **NodeJS dependencies**
goto the backend folder and run:
<pre>npm install</pre>

# Test
Now test if everything works fine by starting the pihome.py python script and the server.js nodeJS backend in seperate terminals

* **Python script**
<pre>python pihome.py</pre>
* **NodeJS backend**
<pre>node server.js</pre>
