### Next Word Prediction

This application was created with NextJs as a server side rendered React Application.

##### Text creation
In the folder "model_creaetion/data" is the dataset "sherlock.txt." and the preprocessing script "preprocessing.py" which creates the training and validation files.
The "train.py" creates the model.h5 and additionally the "stringToIndex.json" and "indexToString.json".

##### Web model
To convert the keras model to a web model use                 
<code>tensorflowjs_converter --input_format=keras model.h5 ./web_model</code>

Copy the output and both json files int the public folder of this application. 

##### Start
To start the application install all dependencies via <code>npm install </code> and start it with <code>npm start dev </code>
