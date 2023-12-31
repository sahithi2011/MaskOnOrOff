prediction_1 ="";


Webcam.set({
    width:350,
    height:300,
    image_format : 'jpeg',
    jpeg_quality:90
});

camera = document.getElementById("camera");

Webcam.attach('#camera');

function take_snapshot(){
    Webcam.snap(function(data_uri){
document.getElementById("result").innerHTML= '<img id="captured_image" src="'+data_uri+'" />'
});

}


console.log('ml5 version:', ml5.version);
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/ktRK_iSFvR/model.json', modelLoaded);

function modelLoaded(){
    console.log('Model Loaded!!');
}

function speak(){
    var synth = window.speechSynthesis;
    speak_data_1 = "You Currently Have Your " + prediction_1;
    var utter_this =new SpeechSynthesisUtterance(speak_data_1);
    utter_this.rate = 1.0;
    synth.speak(utter_this);


}




function gotResult(error, results){
    if(error){
        console.error(error);
    }else{
        console.log(results);
        document.getElementById("status").innerHTML = results[0].label;
        prediction_1 = results[0].label;
        speak();
    
     //1st Prediction

     if(results[0].label == "Mask On"){
        document.getElementById("update_emoji").innerHTML = "&#x1F637;";
    }
    if(results[0].label == "Mask Off"){
        document.getElementById("update_emoji").innerHTML = "&#x26d4;";
    }
    
    
    }
    }





function modelLoaded(){
    console.log('Model Loaded!!');
}

function check(){
    img = document.getElementById('captured_image');
    classifier.classify(img, gotResult);
}

